"use client";

import SkeletonLib, { SkeletonTheme } from "react-loading-skeleton";

const defaultBaseColor = "var(--skeleton-base, #e5e5e5)";
const defaultHighlightColor = "var(--skeleton-highlight, #f5f5f5)";

type SkeletonProps = React.ComponentProps<typeof SkeletonLib> & {
  /** テーマの baseColor（未指定時は globals.css の --skeleton-base） */
  baseColor?: string;
  /** テーマの highlightColor（未指定時は --skeleton-highlight） */
  highlightColor?: string;
};

/**
 * テンプレート用スケルトン。
 * react-loading-skeleton をラップし、プロジェクトの CSS 変数（--skeleton-base, --skeleton-highlight）で見た目を統一。
 */
export function Skeleton({
  baseColor = defaultBaseColor,
  highlightColor = defaultHighlightColor,
  ...props
}: SkeletonProps) {
  return (
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
      <SkeletonLib {...props} />
    </SkeletonTheme>
  );
}

/** テキスト行用（複数行） */
export function SkeletonText({
  lines = 3,
  className,
  ...rest
}: { lines?: number; className?: string } & Omit<SkeletonProps, "count">) {
  return (
    <Skeleton count={lines} height={16} className={className} {...rest} />
  );
}

/** カード風ブロック用 */
export function SkeletonCard({
  className,
  ...rest
}: { className?: string } & Omit<SkeletonProps, "height" | "borderRadius">) {
  return (
    <Skeleton
      height={120}
      borderRadius={8}
      className={className}
      {...rest}
    />
  );
}

/** リスト 1 行用 */
export function SkeletonRow({
  className,
  ...rest
}: { className?: string } & Omit<SkeletonProps, "height">) {
  return <Skeleton height={48} className={className} {...rest} />;
}

/** アバター／円形用 */
export function SkeletonAvatar({
  size = 40,
  className,
  ...rest
}: { size?: number; className?: string } & Omit<SkeletonProps, "circle" | "width" | "height">) {
  return (
    <Skeleton
      circle
      width={size}
      height={size}
      className={className}
      {...rest}
    />
  );
}
