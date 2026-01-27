
import { getPokemon } from '@/fn/pokemon';
import { PokemonCard } from '@/components/PokemonCard';
import { usePokemon } from '@/hooks/usePokemon'
import { createFileRoute, useNavigate } from '@tanstack/react-router'


export const Route = createFileRoute('/pokemons/$id/')({
    loader: async ({ params }) => {
        return getPokemon({
            data: {id: params.id}
        })
    },
    component: RouteComponent
})

function RouteComponent() {
    const { id } = Route.useParams()
    const loaderData = Route.useLoaderData();
    const { data: pokemon, isLoading, isError } = usePokemon(id, loaderData)
    const navigate = useNavigate()

    if (isLoading) return <div>Loading...</div>
    if (isError || !pokemon) return <div>Error loading pokemon</div>

    return (
        <div>
            <PokemonCard
                pokemon={{
                    id: pokemon.id,
                    name: pokemon.name,
                    url: pokemon.sprites?.dream_world?.front_default ?? '',
                }}
                onAction={() => navigate({ to: '/pokemons' })}
            />
        </div>
    )
}
