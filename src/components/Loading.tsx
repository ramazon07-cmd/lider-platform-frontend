export function Loading({ label = 'Yuklanmoqda...' }: { label?: string }) {
  return <div className="loading-state"><span className="spinner" /><p>{label}</p></div>;
}
