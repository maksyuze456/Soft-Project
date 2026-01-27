import { useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  type PaginationState,
  type ColumnDef,
  type OnChangeFn,
} from '@tanstack/react-table'

interface UsePaginationOptions<T> {
  data: T[]
  columns: ColumnDef<T>[]
  totalCount: number
  pagination: PaginationState
  onPaginationChange: OnChangeFn<PaginationState>
}

export function usePagination<T>({
  data,
  columns,
  totalCount,
  pagination,
  onPaginationChange,
}: UsePaginationOptions<T>) {
  const pageCount = useMemo(
    () =>
      totalCount > 0
        ? Math.ceil(totalCount / pagination.pageSize)
        : -1,
    [totalCount, pagination.pageSize],
  )

  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: { pagination },
    onPaginationChange,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  })

  return table
}
