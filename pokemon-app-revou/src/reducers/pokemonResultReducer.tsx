import { Reducer } from "react";

interface PokemonResult {
    name: string;
    url: string;
}

interface PokemonResultAction {
    type: string;
    payload: PokemonResult;
    pokemonResults: PokemonResult[];
}

const initialState: PokemonResult[] = [];

export const pokemonReducer: Reducer<PokemonResult[], PokemonResultAction> = (state = initialState, action) => {
    // disini kita mengakses tipe dari actionnya. diambil dari object action
    const actionType = action.type; //fetch
    if (actionType == "add") {
        return [...state, action.payload];
    } else if (actionType == "remove") {
        const removedPokemonResult = state.filter((pokemon) => {
            if (pokemon.name !== action.payload.name) {
                return pokemon;
            }
        });
        return removedPokemonResult;
    } else if (actionType == "fetch") {
        return action.pokemonResults;
    } else {
        return state;
    }
};
