import { TableCell, TableRow } from "@/components/ui/table"

interface TableEmptyProps {
  colSpan: number
  message?: string
}

export function TableEmpty({ colSpan, message = "No results." }: TableEmptyProps) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="h-24 text-center">
        {message}
      </TableCell>
    </TableRow>
  )
}
