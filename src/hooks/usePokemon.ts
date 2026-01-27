import { getPokemon } from '@/fn/getPokemon';
import { useQuery } from '@tanstack/react-query';

export function usePokemon(id: string, initialData?:any) {
    return useQuery({
        queryKey: ['pokemon', id],
        queryFn: () => getPokemon({ data: { id } }),
        initialData
    })
}