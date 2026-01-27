import type { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'

interface PaginationProps<T> {
  table: Table<T>
}

export function Pagination<T>({ table }: PaginationProps<T>) {
  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <Button
        variant="outline"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        className="cursor-pointer"
      >
        Previous
      </Button>
      <span className="text-sm text-muted-foreground">
        Page {table.getState().pagination.pageIndex + 1} of{' '}
        {table.getPageCount()}
      </span>
      <Button
        variant="outline"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        className="cursor-pointer"
      >
        Next
      </Button>
    </div>
  )
}
