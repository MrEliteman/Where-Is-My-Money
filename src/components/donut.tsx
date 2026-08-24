import { useMemo } from "react";

export interface Slice {
  id: string;
  value: number;
  color: string;
}

export function Donut({
  slices,
  size = 148,
  stroke = 22,
}: {
  slices: Slice[];
  size?: number;
  stroke?: number;
}) {
  const { paths, total } = useMemo(() => {
    const total = slices.reduce((s, x) => s + x.value, 0);
    const r = (size - stroke) / 2;
    const c = 2 * Math.PI * r;
    let offset = 0;
    const paths = slices
      .filter((s) => s.value > 0)
      .map((s) => {
        const len = total > 0 ? (s.value / total) * c : 0;
        const item = { ...s, dash: `${len} ${c - len}`, offset };
        offset -= len;
        return item;
      });
    return { paths, total };
  }, [slices, size, stroke]);

  const r = (size - stroke) / 2;
  const cx = size / 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="shrink-0 -rotate-90"
      aria-hidden
    >
      <circle
        cx={cx}
        cy={cx}
        r={r}
        fill="none"
        stroke="var(--color-surface-2)"
        strokeWidth={stroke}
      />
      {total > 0 &&
        paths.map((p) => (
          <circle
            key={p.id}
            cx={cx}
            cy={cx}
            r={r}
            fill="none"
            stroke={p.color}
            strokeWidth={stroke}
            strokeDasharray={p.dash}
            strokeDashoffset={p.offset}
            strokeLinecap="butt"
            style={{
              transition:
                "stroke-dasharray 400ms cubic-bezier(0.22, 1, 0.36, 1), stroke-dashoffset 400ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        ))}
    </svg>
  );
}
