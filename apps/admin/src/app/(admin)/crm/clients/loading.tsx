import { TableLoading } from "@/components/table/loading"

export default function ClientsLoading() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-9 w-48 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-5 w-64 animate-pulse rounded bg-muted" />
      </div>
      <div className="overflow-hidden rounded-lg border">
        <table className="w-full">
          <thead>
            <tr>
              {Array.from({ length: 8 }).map((_, i) => (
                <th key={i} className="h-12 border-b px-4">
                  <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                </th>
              ))}
            </tr>
          </thead>
          <TableLoading colCount={8} rowCount={10} />
        </table>
      </div>
    </div>
  )
}

