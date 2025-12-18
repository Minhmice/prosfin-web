import { Skeleton } from "@/components/ui/skeleton"
import { TableBody, TableCell, TableRow } from "@/components/ui/table"

interface TableLoadingProps {
  colCount: number
  rowCount?: number
}

export function TableLoading({ colCount, rowCount = 5 }: TableLoadingProps) {
  return (
    <TableBody>
      {Array.from({ length: rowCount }).map((_, i) => (
        <TableRow key={i}>
          {Array.from({ length: colCount }).map((_, j) => (
            <TableCell key={j}>
              <Skeleton className="h-4 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  )
}
