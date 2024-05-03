import { SetStateAction, useContext, useEffect, useReducer, useState } from "react";
import { PokemonResultContext } from "../providers/PokemonResultProvider";
import { pokemonReducer } from "../reducers/pokemonResultReducer";
import { Navigate, useNavigate } from "react-router-dom";

interface PokemonDashboardProps {
    isLoading: boolean;
    setIsLoading: React.Dispatch<SetStateAction<boolean>>;
}

interface PokemonResult {
    name: string;
    url: string;
}
interface PokemonResultWithImage {
    name: string;
    url: string;
    imageUrl: string;
}

// function PokemonDashboard({ isLoading, setIsLoading }: PokemonDashboardProps) {
function PokemonDashboard() {
    // const { pokemonResults, setPokemonResults } = useContext(PokemonResultContext);
    // const [pokemonResults, dispatchPokemon] = useReducer(pokemonReducer, []);
    const [pokemonResults, setPokemonResults] = useState<PokemonResultWithImage[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchPokemons() {
            try {
                const url = "https://pokeapi.co/api/v2/pokemon";
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error("Failed to fetch pokemon data!");
                }
                const data = await response.json();
                console.log(data);

                const imageUrlArray = data.results.map((pokemon: PokemonResult) => ({
                    name: pokemon.name,
                    url: pokemon.url,
                    imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                        pokemon.url.split("/")[6]
                    }.png`,
                }));

                setPokemonResults(imageUrlArray);
                setIsLoading(false);
                // dispatchPokemon({
                //     type: "fetch",
                //     pokemonResults: data.results,
                //     payload: { name: "", url: "" },
                // });
            } catch (error) {
                alert(error);
            }
        }
        fetchPokemons();
    }, []);

    function handleNavigate(pokemon: PokemonResultWithImage) {
        // console.log("masuuk");
        navigate(`/${pokemon.name}`, { state: pokemon });
        // <Navigate to={`/${pokemon.name}`} state={{ pokemon }} />;
    }

    return (
        <>
            {isLoading == true && <h1>Loading ....</h1>}
            {isLoading == false &&
                pokemonResults.length > 0 &&
                pokemonResults.map((result) => {
                    return (
                        <div onClick={() => handleNavigate(result)}>
                            <img src={result.imageUrl} />
                            <h1>{result.name}</h1>
                        </div>
                    );
                })}
        </>
    );
}

export default PokemonDashboard;
