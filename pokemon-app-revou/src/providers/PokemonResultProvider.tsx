import React, { ReactNode, SetStateAction, createContext, useState } from "react";

interface PokemonResult {
    name: string;
    url: string;
}

interface PokemonResultContextInterface {
    pokemonResults: PokemonResult[];
    setPokemonResults: React.Dispatch<SetStateAction<PokemonResult[]>>;
}

export const PokemonResultContext = createContext<PokemonResultContextInterface>({
    pokemonResults: [],
    setPokemonResults: () => {},
});

export const PokemonResultProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [pokemonResults, setPokemonResults] = useState<PokemonResult[]>([]);
    return (
        <PokemonResultContext.Provider
            value={{
                pokemonResults: pokemonResults,
                setPokemonResults: setPokemonResults,
            }}
        >
            {children}
        </PokemonResultContext.Provider>
    );
};
