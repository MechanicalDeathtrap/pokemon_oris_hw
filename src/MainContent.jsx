import style from './MainContainer.module.sass'
import Abilities from "./Abilities.jsx";
import {useEffect} from "react";
import {usePokemonStore} from "./PokemonsStateStore.jsx"
import {useSearchedPokemonStore} from "./SearchedStateStore.js";

function MainContent() {

    const {pokemonsList, setPokemonsList, refreshPokemonsList} = usePokemonStore();
    const {searchedPokemonsList, setSearchedList} = useSearchedPokemonStore();

    const getPokemons = async () => {
        await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=100`)
            .then(response => response.json())
            .then(data =>
                data.results.forEach(async (item) => {

                    const fetchData = await fetch(item.url);
                    const json = await fetchData.json();
                    setPokemonsList(json);
                })
            )

    }
    useEffect(() => {
        if (pokemonsList.length > 0) {
            refreshPokemonsList();
        }
        getPokemons();
    }, []);

    useEffect(() =>{
        setSearchedList(pokemonsList)
    }, [pokemonsList])

    if (searchedPokemonsList.length > 0) {
        return (
            <div className={style.mainContainer}>
                {searchedPokemonsList.map(pokemon => (
                    <ul key={pokemon.pokemon.id} className={style.element}>
                        <div className={style.info}>
                            <span className={style.name}>{pokemon.pokemon.name}</span>
                            <span>#{pokemon.pokemon.id}</span>
                        </div>
                        <img src={pokemon.pokemon.sprites.front_default} alt="pokemon" className={style.image}/>
                        <li className={style.abilitiesList}>
                            <Abilities property={pokemon.pokemon.types}/>
                        </li>
                    </ul>)
                )
                }
            </div>
        )
    }
    else {
        return (
            <div className={style.emptySearchContainer}>
                <h1>Oops! Try again.</h1>
                <span>The Pokemon you're looking for is a unicorn. It doesn't exist in this list.</span>
                <img src="src/assets/pikachy.png" alt="pikachu" className={style.emptySearchImage}/>
            </div>
        )
    }
}

export default MainContent