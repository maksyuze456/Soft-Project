import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

type PokemonCardProps = {
    pokemon: {
        id: number,
        name: string,
        url: string,
    }
    onAction: () => void
    size?: "default" | "md"
}
export function PokemonCard({
    pokemon, onAction, size = "default"
}: PokemonCardProps) {
    const displayName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
    const paddedId = String(pokemon.id).padStart(3, '0')
    const isMd = size === "md"

    return (
        <Card className="group relative mx-auto w-full max-w-sm overflow-hidden pt-0 transition-shadow duration-300 hover:shadow-lg">
            <CardContent className={`relative flex items-center justify-center bg-gradient-to-br from-sky-100 to-indigo-200 dark:from-sky-900 dark:to-indigo-950 ${isMd ? "p-4" : "p-6"}`}>
                <Badge variant="secondary" className="absolute top-3 right-3 text-xs font-bold tracking-wider">
                    #{paddedId}
                </Badge>
                <img
                    src={pokemon.url}
                    alt={displayName}
                    className={`object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-110 ${isMd ? "h-32 w-32" : "h-48 w-48"}`}
                />
            </CardContent>
            <CardHeader className="pb-0">
                <CardTitle className={isMd ? "text-base tracking-tight" : "text-xl tracking-tight"}>{displayName}</CardTitle>
            </CardHeader>
            <CardFooter>
                <Button onClick={onAction} className="w-full cursor-pointer">
                    View Pokemon
                </Button>
            </CardFooter>
        </Card>
    )
}