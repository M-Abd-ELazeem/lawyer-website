import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Button, type ButtonVariant } from "../Button";
import { Spinner } from "../feedback/Spinner";

type SubmitButtonProps = {
  pending?: boolean;
  pendingLabel?: string;
  variant?: ButtonVariant;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

/** Submit button that shows a spinner and blocks double submits. */
export function SubmitButton({
  pending = false,
  pendingLabel = "جارٍ الإرسال…",
  variant = "gold",
  children,
  disabled,
  ...props
}: SubmitButtonProps) {
  return (
    <Button type="submit" variant={variant} disabled={pending || disabled} aria-busy={pending} {...props}>
      {pending ? (
        <>
          <Spinner />
          <span>{pendingLabel}</span>
        </>
      ) : (
        children
      )}
    </Button>
  );
}
