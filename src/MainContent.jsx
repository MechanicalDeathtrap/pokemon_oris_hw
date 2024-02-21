import {create} from 'zustand'
import style from './MainContainer.module.sass'
import Abilities from "./Abilities.jsx";
import {useEffect, useState} from "react";



function MainContent(){

    const [pokemons, setPokemons] = useState([]);
/*
    const pokemonsProps = () =>{
        return pokemons
    }
*/
    const useStore = create((set)=> ({
        pokemonList: [],
        setPokemonsList: (pokemons) => set(() => ({pokemonList: pokemons})
        )
    }));

    const addPokemon = useStore((state) => state.setPokemonsList)
    const getPokemons = async () => {
        await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=2`)
            .then(response => response.json())
            .then(data =>
                data.results.forEach(async (item) => {

                    const fetchData = await fetch(item.url);
                    const json = await fetchData.json();
                    setPokemons((list) => [...list, json])
                })
            )
        addPokemon(pokemons)

    }
    useEffect(() => {
        getPokemons();
    }, []);


    if (pokemons.length > 0){

    return(
        <div className={style.mainContainer}>
            { pokemons.map(pokemon  =>(
                <ul key={pokemon.id} className={style.element}>
                    <div className={style.info}>
                        <span className={style.name}>{pokemon.name}</span>
                        <span>#{pokemon.id}</span>
                    </div>
                    <img src={pokemon.sprites.front_default} alt="pokemon" className={style.image}/>
                    <li className={style.abilitiesList}>
                        <Abilities property={pokemon.types}/>
                    </li>
                </ul>)
            )
        }
        </div>
    )}
}


export default MainContent