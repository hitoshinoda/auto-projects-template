# タスクリスト: Master Template の作成

## ステップ 1: 初期化
- [ ] `create-next-app` によるプロジェクト初期化 (`auto-projects-template`)
- [ ] 依存関係のインストール (`firebase`, `firebase-admin`, `lucide-react`, `clsx`, `tailwind-merge`, `zod`)
- [ ] 開発用依存関係のインストール (`@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`)

## ステップ 2: 規約の強制 (ESLint / TSConfig)
- [ ] `.eslintrc.json` の設定（any 禁止、JSX内関数定義禁止、non-null assertion 禁止）
- [ ] `tsconfig.json` の設定（最大レベルの厳格な型チェック）
- [ ] `apphosting.yaml` の作成

## ステップ 3: ディレクトリ構造とボイラープレート
- [ ] `components/canvas/` ディレクトリ作成
- [ ] `lib/firebase/` (config.ts, client.ts, admin.ts) の作成
- [ ] `types/` ディレクトリ作成
- [ ] 各ディレクトリへの README.md 設置

## ステップ 4: CI/CD 設定
- [ ] `.github/workflows/deploy.yml` の作成

## 最終確認
- [ ] `npx tsc --noEmit` による型チェック
- [ ] ESLint による `any` 検知の確認
