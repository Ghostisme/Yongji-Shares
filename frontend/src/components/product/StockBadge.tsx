interface StockBadgeProps {
  stock: number;
}

export function StockBadge({ stock }: StockBadgeProps) {
  if (stock === 0) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-red-50 text-red-600">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
        暂时缺货
      </span>
    );
  }

  if (stock <= 5) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-amber-50 text-amber-600">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        仅剩 {stock} 件
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-50 text-emerald-600">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
      有货
    </span>
  );
}
