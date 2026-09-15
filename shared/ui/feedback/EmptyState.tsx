import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="text-center py-16 space-y-3">
      <h3 className="text-c-white font-bold text-h3">{title}</h3>
      {description ? <p className="text-c-foreground text-body">{description}</p> : null}
      {action}
    </div>
  );
}
