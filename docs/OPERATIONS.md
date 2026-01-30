# Operations Manual

## New Service Provisioning

このテンプレートから新しいサービスを立ち上げる際の手順書です。

### 1. Repository Setup

1. このテンプレートリポジトリ (`auto-projects-template`) をフォークするか、テンプレートとして使用して新しいリポジトリを作成します。
2. ローカルにクローンし、依存関係をインストールします。

### 2. Firebase Setup (Firestore)

新しいサービス用のデータベースを作成します。

1. Firebase Console にアクセスし、対象のプロジェクトを開きます。
2. **Firestore Database** セクションに移動します。
3. データベース一覧上部のメニュー（または「データベースの追加」）から、**新しいデータベースを作成** します。
   - **Database ID**: サービス名など、識別しやすい名前を付けます (例: `my-new-saas-db`)。
   - **Location**: 適切なリージョンを選択します (`asia-east1` 推奨)。
   - **Rules**: 適切なセキュリティルールを適用します。

### 3. Environment Configuration

新しいサービス用の環境変数を設定します。

1. **Local Development**:
   `.env.local` の `NEXT_PUBLIC_FIREBASE_DATABASE_ID` を、手順2で作成した Database ID に変更します。

   ```env
   NEXT_PUBLIC_FIREBASE_DATABASE_ID=my-new-saas-db
   ```

2. **Production (App Hosting)**:
   - `apphosting.yaml` の環境変数設定セクションにて、`NEXT_PUBLIC_FIREBASE_DATABASE_ID` を設定します（シークレット管理を使用する場合は Secret Manager に登録して参照）。
   - 注意: App Hosting のバックエンド環境変数として設定することで、ビルド時およびランタイムに適用されます。

### 4. Stripe Setup (Optional)

サービスごとに異なる Stripe アカウントまたは商品を使用する場合：

1. Stripe Dashboard で新しい Product を作成します。
2. 環境変数 `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY` を必要に応じて更新します。
3. Webhook のエンドポイント (`/api/webhook`) を Stripe に登録し、Signing Secret を `STRIPE_WEBHOOK_SECRET` に設定します。

### 5. Deploy

1. 通常通り GitHub へプッシュします。
2. Firebase App Hosting がリポジトリの変更を検知し、デプロイを開始します。
