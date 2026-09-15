type FormErrorProps = {
  id?: string;
  children?: string;
};

export function FormError({ id, children }: FormErrorProps) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="text-red-400 text-caption">
      {children}
    </p>
  );
}
