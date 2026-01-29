# 実装計画: Master Template (Next.js + Firebase)

## 概要
自律型ビジネス量産システムのための「Master Template」を構築します。Next.js (App Router) をベースに、厳格な型定義と規約、Firebase App Hosting へのデプロイパイプラインを含みます。

## 技術スタック
- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS, lucide-react, clsx, tailwind-merge
- **Backend/Infrastructure**: Firebase (Auth, Firestore, App Hosting), Firebase Admin SDK
- **Validation**: Zod
- **Linting**: ESLint (custom strict rules)

## 実装詳細

### 1. プロジェクト初期化
`npx create-next-app@latest` を使用し、以下のオプションで初期化します。
- TypeScript, ESLint, Tailwind CSS, App Router, Import Alias (@/*) を有効化。
- `src/` ディレクトリは使用しない。

### 2. 厳格なルールの適用
- **TSConfig**: `noImplicitAny`, `strict`, `noUnusedLocals`, `noUnusedParameters` 等を全て true に設定。
- **ESLint**: `@typescript-eslint/no-explicit-any`, `react/jsx-no-bind` などのルールをエラーとして設定。

### 3. Firebase ボイラープレート
- `lib/firebase/client.ts`: クライアントサイド SDK の初期化。シングルトンパターン。
- `lib/firebase/admin.ts`: サーバーサイド Admin SDK の初期化。環境変数 `FIREBASE_SERVICE_ACCOUNT` を想定。
- `lib/firebase/config.ts`: クライアント用設定オブジェクトの定義。

### 4. CI/CD
- GitHub Actions を使用し、`main` ブランチへの push 時に Firebase App Hosting へデプロイするワークフローを定義。

## 成功基準
- `npm run build` がエラーなく完了する。
- `any` 型の使用が ESLint でブロックされる。
- 型定義なしでのコーディングが困難なほど厳格な環境が構築されている。
