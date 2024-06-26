import styles from './Header.module.sass'
import {useEffect, useState} from "react";
import {usePokemonStore} from "../../PokemonsStateStore.jsx"
import {useSearchedPokemonStore} from "../../SearchedStateStore.jsx";
import {Link, Outlet} from "react-router-dom";
import pokeball from "/src/assets/pokeball.png"

function Header(){

    const [searchInput, setSearchInput] = useState('');
    const [searchResult, setResult] = useState([]);
    const {pokemonsList} = usePokemonStore();
    const {setSearchedList } = useSearchedPokemonStore()

    useEffect(() => {
        if (searchInput.length !== 0) {
            const filiteredPokemons = pokemonsList.filter((item) => {
                return (item.pokemon.name).toLowerCase().includes(searchInput.toLowerCase())
            });
            console.log(filiteredPokemons);
            setResult(filiteredPokemons);
        }
        else{
            setResult(pokemonsList);
        }
    }, [searchInput])

    useEffect(() =>{
        setSearchedList(searchResult);
    }, [searchResult])

    const searchPokemons = (value) =>{
        setSearchInput(value)
    }

    return(
        <>
            <header className={styles.header} >
                <div className={styles.headerContainer}>
                    <img src={pokeball} alt="poke-ball" className={styles.image}/>
                    <h1 className={styles.title}>Who are you looking for?</h1>
                    <div className={styles.inputBox}>
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
                            <path d="M8.57621 16.99C10.4275 16.99 12.1561 16.3935 13.5613 15.3993L18.8476 20.6355C19.0929 20.8785 19.4164 21 19.7509 21C20.4758 21 21 20.4477 21 19.7407C21 19.4093 20.8885 19.0999 20.6431 18.8569L15.3903 13.6428C16.4944 12.2067 17.1524 10.4282 17.1524 8.495C17.1524 3.8222 13.2937 0 8.57621 0C3.84758 0 0 3.8222 0 8.495C0 13.1678 3.84758 16.99 8.57621 16.99ZM8.57621 15.1562C4.88476 15.1562 1.8513 12.1405 1.8513 8.495C1.8513 4.84955 4.88476 1.83377 8.57621 1.83377C12.2565 1.83377 15.3011 4.84955 15.3011 8.495C15.3011 12.1405 12.2565 15.1562 8.57621 15.1562Z" fill="grey"/>
                        </svg>
                        <input type="search" placeholder={"E.g. Pikachu"} value={searchInput} className={styles.input} onChange={(e) => searchPokemons(e.target.value)}/>
                        <button type='button' className={styles.button}>GO</button>
                    </div>
                </div>
            </header>

        <Outlet/>
        </>
    );
}

export default Header