import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import type { PaginationState, ColumnDef } from '@tanstack/react-table'
import { usePokemonPage } from '@/hooks/usePokemonPage'
import { usePagination } from '@/hooks/usePagination'
import { PokemonCard } from '@/components/PokemonCard'
import { Pagination } from '@/components/Pagination'
import { PokemonEntry } from '@/types/PokemonTypes'
import { buildSpriteUrl, extractIdFromUrl } from '@/lib/utils'

export const Route = createFileRoute('/pokemons/')({
  component: RouteComponent,
})

const PAGE_SIZE = 20

const columns: ColumnDef<PokemonEntry>[] = [
  { accessorKey: 'name' },
  { accessorKey: 'url' },
]

function RouteComponent() {
  const navigate = useNavigate()

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  })

  const offset = pagination.pageIndex * pagination.pageSize
  const { data, isLoading, isError, isPlaceholderData } = usePokemonPage(PAGE_SIZE, offset)

  const table = usePagination<PokemonEntry>({
    data: data?.results ?? [],
    columns,
    totalCount: data?.count ?? 0,
    pagination,
    onPaginationChange: setPagination,
  })
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-lg text-muted-foreground">Loading Pokemon...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-lg text-destructive">
          Failed to load Pokemon. Please try again.
        </p>
      </div>
    )
  }

  const pokemonList = data?.results ?? []

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Pokemon</h1>

      <div
        className={`grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 ${isPlaceholderData ? 'opacity-60' : ''}`}
      >
        {pokemonList.map((entry) => {
          const id = extractIdFromUrl(entry.url)
          return (
            <PokemonCard
              key={entry.name}
              size="md"
              pokemon={{
                id,
                name: entry.name,
                url: buildSpriteUrl(id),
              }}
              onAction={() =>
                navigate({ to: '/pokemons/$id', params: { id: String(id) } })
              }
            />
          )
        })}
      </div>

      <Pagination table={table} />
    </div>
  )
}
