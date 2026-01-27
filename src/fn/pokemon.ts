import { createServerFn } from "@tanstack/react-start"

export function extractIdFromUrl(url: string): number {
  const segments = url.replace(/\/$/, '').split('/')
  return Number(segments[segments.length - 1])
}

export function buildSpriteUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
}



export const getPokemon = createServerFn({ method: 'GET' })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const baseUrl = process.env.POKEAPI_BASE_URL
    const response = await fetch(`${baseUrl}/pokemon/${data.id}`)
    if (!response.ok) throw new Error('Pokemon not found')
    const pokemon = await response.json()
    return {
      name: pokemon.name,
      id: pokemon.id,
      sprites: pokemon.sprites.other
    }
  })

export const getPokemonPage = createServerFn({ method: 'GET' })
  .inputValidator((data: { limit?: number; offset?: number }) => data)
  .handler(async ({ data }) => {
    const baseUrl = process.env.POKEAPI_BASE_URL

    const limit = data.limit ?? 20
    const offset = data.offset ?? 0

    const response = await fetch(
      `${baseUrl}/pokemon?limit=${limit}&offset=${offset}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch Pokémon page')
    }

    return response.json() as Promise<{
      count: number
      next: string | null
      previous: string | null
      results: { name: string; url: string }[]
    }>
  })

