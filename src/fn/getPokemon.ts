import { baseUrl } from "@/lib/utils"
import { createServerFn } from "@tanstack/react-start"

export const getPokemon = createServerFn({ method: 'GET' })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const response = await fetch(`${baseUrl}/pokemon/${data.id}`)
    if (!response.ok) throw new Error('Pokemon not found')
    const pokemon = await response.json()
    return {
      name: pokemon.name,
      id: pokemon.id,
      sprites: pokemon.sprites.other
    }
  })