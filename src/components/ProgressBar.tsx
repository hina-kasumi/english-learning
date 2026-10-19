export function ProgressBar({
  value,
  label = "Tiến độ",
}: {
  value: number;
  label?: string;
}) {
  const percent = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div
      className="progress-track"
      role="progressbar"
      aria-label={label}
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div style={{ width: `${percent}%` }} />
    </div>
  );
}
