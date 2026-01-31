"use client";

import { trackEvent } from "@/lib/analytics/actions";

type TrackedButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  /** クリック時に呼ばれるコールバック（trackEvent の後に実行） */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

/**
 * クリック時に trackEvent('clicks') を送信してから、本来の onClick を実行するボタン。
 * 標準 button をラップ。重要 CTA に使用して PDCA 用のクリックデータを蓄積する。
 */
export function TrackedButton({
  onClick,
  children,
  ...rest
}: TrackedButtonProps) {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    void trackEvent("clicks");
    onClick?.(e);
  };

  return (
    <button type="button" onClick={handleClick} {...rest}>
      {children}
    </button>
  );
}
