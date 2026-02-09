export function LoadingPanel({ message = "Loading..." }) {
  return (
    <div className="glass rounded-3xl p-8 text-center">
      <div className="mx-auto mb-4 app-spinner" />
      <p className="text-sm text-ink-700">{message}</p>
    </div>
  );
}

export function EmptyPanel({ title, description, action }) {
  return (
    <div className="glass rounded-3xl p-8 text-center">
      <h3 className="text-lg font-semibold text-ink-900">{title}</h3>
      <p className="mt-2 text-sm text-ink-700">{description}</p>
      {action}
    </div>
  );
}
