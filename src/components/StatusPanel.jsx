export function LoadingPanel({ message = "Loading..." }) {
  return (
    <div className="glass rounded-3xl p-8 text-center">
      <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-accent-500" />
      <p className="text-sm text-white/70">{message}</p>
    </div>
  );
}

export function EmptyPanel({ title, description, action }) {
  return (
    <div className="glass rounded-3xl p-8 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-white/70">{description}</p>
      {action}
    </div>
  );
}
