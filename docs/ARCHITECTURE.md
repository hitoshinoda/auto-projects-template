# Architecture & Design

## Multi-tenant Strategy

本システムは「コードベースと認証基盤は共有しつつ、データとデプロイメントは分離する」戦略を採用しています。これにより、管理コストを抑えながら、各サービスの独立性とセキュリティを担保します。

### 構成図

```mermaid
graph TD
    subgraph "Google Cloud Project"
        Auth[Firebase Authentication] -- Shared Users --> S1_App
        Auth -- Shared Users --> S2_App

        subgraph "Service A (repo-a)"
            S1_App[App Hosting (Service A)]
            S1_DB[(Firestore: service-a-db)]
            S1_App -- Uses DATABASE_ID --> S1_DB
        end

        subgraph "Service B (repo-b)"
            S2_App[App Hosting (Service B)]
            S2_DB[(Firestore: service-b-db)]
            S2_App -- Uses DATABASE_ID --> S2_DB
        end
    end
```

- **Authentication**: 全サービスで単一の Firebase プロジェクトの Auth を共有します。ユーザーは一度のアカウント作成で、(理論上は) 複数のサービスを利用可能ですが、サービスごとのデータは完全に分離されます。
- **Firestore**: `NEXT_PUBLIC_FIREBASE_DATABASE_ID` 環境変数により、サービスごとに異なる Firestore データベースインスタンスに接続します。これにより物理的なデータの混在を防ぎます。
- **Messaging/Storage**: 現時点では共有設定ですが、必要に応じてバケット分離などが可能です。

## Authentication Flow

ユーザー登録から、各サービス専用のデータベースへのユーザー作成までのフローです。

1. **Signup** (`/signup`)
   - ユーザーが Email/Password または Google でサインアップ。
   - Firebase Auth にユーザーが作成される。
   - **ActionCodeSettings** を使用して検証メールを送信。`url` には `window.location.origin` (各サービスのURL) が設定されるため、リンククリック時には**そのサービス**に戻ってくる。

2. **Verify Email & Redirect**
   - ユーザーがメール内のリンクをクリック。
   - Firebase のハンドラを経て、元のサービスの `/verify-email` へリダイレクト（または自動遷移）。

3. **User Document Creation** (`AuthContext`)
   - 認証完了後、アプリにログイン。
   - `AuthContext` がログインを検知。
   - 指定された `NEXT_PUBLIC_FIREBASE_DATABASE_ID` の Firestore (`users/{uid}`) を参照。
   - ドキュメントが存在しない場合（初回ログイン）、初期ユーザーデータを作成。
   - **ここが重要**: ユーザーのデータは「現在接続しているデータベース」にのみ作成されます。

```text
User -> [Signup Page] -> Firebase Auth (Create User)
       |
       v
   [Send Email Verification] (URL = Service Origin)
       |
       v
User -> [Click Email Link] -> [Service Verify Page]
       |
       v
    [Login] -> AuthContext Checks Firestore (Service DB)
       |
       +-> Exists? -> Load AppUser
       +-> Not Exists? -> Create AppUser in Service DB
```
