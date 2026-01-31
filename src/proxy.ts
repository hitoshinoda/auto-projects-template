import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Next.js 16 Proxy (旧 Middleware).
 * リクエストごとに実行され、必要に応じてリダイレクト・リライト・ヘッダー変更が可能。
 */
export function proxy(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * 以下を除外: api, _next/static, _next/image, 静的ファイル
     */
    "/((?!api|_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
