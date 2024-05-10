import style from './MainContent.module.sass'
import Abilities from "../Abilities/Abilities.jsx";
import {useEffect} from "react";
import {usePokemonStore} from "../../PokemonsStateStore.jsx"
import {useSearchedPokemonStore} from "../../SearchedStateStore.jsx";
import { Link } from "react-router-dom";
import notFoundImage from "../../assets/pikachy.png"

function MainContent() {

    const {pokemonsList, setPokemonsList, refreshPokemonsList} = usePokemonStore();

    const {searchedPokemonsList, setSearchedList} = useSearchedPokemonStore();

    const getPokemons = async () => {
        await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=300`) //totalCount - скок всего
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
                <div className={style.mainContainer } >
                    {searchedPokemonsList.map(pokemon => (
                        <Link to={`/details/${pokemon.pokemon.name}`} key={pokemon.pokemon.id} className={style.element}>
                            <div className={style.info}>
                                <span className={style.name}>{pokemon.pokemon.name}</span>
                                <span className={style.id}>#{
                                    (pokemon.pokemon.id < 10)? ('00' + pokemon.pokemon.id):
                                        (pokemon.pokemon.id <100)?
                                            ('0' + pokemon.pokemon.id): pokemon.pokemon.id
                                }</span>
                            </div>
                            <img src={pokemon.pokemon.sprites.other.home.front_default} alt="pokemon" className={style.image}/>
                            <ul className={style.abilitiesList}>
                                <Abilities property={pokemon.pokemon.types}/>
                            </ul>
                        </Link>)
                    )}
                </div>
        )

    }
    else {
        return (
            <div className={style.emptySearchContainer}>
                <h1>Oops! Try again.</h1>
                <span>The Pokemon you're looking for is a unicorn. It doesn't exist in this list.</span>
                <img src={notFoundImage} alt="pikachu" className={style.emptySearchImage}/>
            </div>
        )
    }
}

export default MainContent