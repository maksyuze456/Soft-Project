import { baseUrl } from "@/lib/utils";
import { createServerFn } from "@tanstack/react-start"


export const getPokemonPage = createServerFn({ method: 'GET' })
  .inputValidator((data: { limit?: number; offset?: number }) => data)
  .handler(async ({ data }) => {

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

