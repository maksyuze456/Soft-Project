import { getPokemonPage } from '@/fn/getPokemonPage'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export function usePokemonPage(limit: number, offset: number) {
  return useQuery({
    queryKey: ['pokemonPage', limit, offset],
    queryFn: () => getPokemonPage({ data: { limit, offset } }),
    placeholderData: keepPreviousData,
  })
}
