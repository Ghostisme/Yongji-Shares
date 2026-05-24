export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-gray-200 ${className}`}
    />
  );
}

export function ProductSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <Skeleton className="aspect-square w-full rounded-2xl" />
        <div className="flex flex-col gap-5">
          <Skeleton className="h-9 w-3/4" />
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-6 w-1/4" />
          <div className="flex gap-3 mt-2">
            <Skeleton className="h-10 w-24 rounded-full" />
            <Skeleton className="h-10 w-24 rounded-full" />
            <Skeleton className="h-10 w-24 rounded-full" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-10 w-20 rounded-full" />
            <Skeleton className="h-10 w-20 rounded-full" />
          </div>
          <Skeleton className="h-20 w-full mt-4" />
          <div className="flex gap-4 mt-4">
            <Skeleton className="h-12 w-36 rounded-xl" />
            <Skeleton className="h-12 w-44 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
