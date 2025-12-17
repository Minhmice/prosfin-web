import { AdminSkeleton } from "@prosfin/ui";

export default function Loading() {
  return (
    <div className="space-y-4">
      <AdminSkeleton variant="rectangular" className="h-10 w-full" />
      {Array.from({ length: 5 }).map((_, i) => (
        <AdminSkeleton key={i} variant="rectangular" className="h-16 w-full" />
      ))}
    </div>
  );
}

