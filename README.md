# Auto-Projects SaaS Template

このテンプレートは、自動化されたビジネス量産システムのための「マスターテンプレート」です。
Next.js, Firebase (App Hosting, Firestore, Auth), Stripe を統合し、スケーラブルでマルチテナント対応な SaaS 基盤を提供します。

## Features

- **Authentication**: Firebase Authentication を利用した堅牢な認証システム (Email/Password, Google Auth)。
- **Stripe Integration**: Stripe Checkout を統合したサブスクリプション決済フロー。
- **Multi-tenant Firestore**: 環境変数による接続先データベースの切り替えにより、単一のコードベースで複数のサービス（データ分離）をサポート。
- **Firebase App Hosting**: Next.js アプリケーションのシームレスなデプロイとスケーリング。
- **Modern UI**: Tailwind CSS と Lucide React を使用したモダンでレスポンシブなデザイン。

## Environment Variables

アプリケーションの動作には以下の環境変数が必要です。`.env.example` をコピーして `.env.local` を作成してください。

| 変数名                                     | 説明                                                                                                                                                  | 必須                      |
| :----------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------ |
| `NEXT_PUBLIC_FIREBASE_API_KEY`             | Firebase API Key                                                                                                                                      | Yes                       |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`         | Firebase Auth Domain                                                                                                                                  | Yes                       |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID`          | Firebase Project ID                                                                                                                                   | Yes                       |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`      | Firebase Storage Bucket                                                                                                                               | Yes                       |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging Sender ID                                                                                                                          | Yes                       |
| `NEXT_PUBLIC_FIREBASE_APP_ID`              | Firebase App ID                                                                                                                                       | Yes                       |
| `NEXT_PUBLIC_FIREBASE_DATABASE_ID`         | **重要**: 接続する Firestore データベース ID。デフォルトの `(default)` 以外を使用する場合に指定します。これによりサービス間のデータ分離を実現します。 | No (Default: `(default)`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`       | Stripe 公開鍵                                                                                                                                         | Yes                       |
| `STRIPE_SECRET_KEY`                        | Stripe シークレットキー (サーバーサイドのみ)                                                                                                          | Yes                       |
| `STRIPE_WEBHOOK_SECRET`                    | Stripe Webhook シークレット (サーバーサイドのみ)                                                                                                      | Yes                       |
| `NEXT_PUBLIC_BASE_URL`                     | アプリケーションのベース URL (例: `http://localhost:3000`)                                                                                            | Yes                       |

## Getting Started

ローカル開発環境のセットアップ手順です。

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Environment Setup**
   `.env.local` ファイルを作成し、必要な環境変数を設定してください。

3. **Run Development Server**

   ```bash
   npm run dev
   ```

   ブラウザで `http://localhost:3000` を開いて確認してください。

4. **Build**
   ```bash
   npm run build
   ```
