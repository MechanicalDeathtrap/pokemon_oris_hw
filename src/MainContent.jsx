
import Collection from "./Collection.jsx";
import style from './MainContainer.module.sass'

function MainContent(){

        const pokemons = []

        fetch(`https://pokeapi.co/api/v2/pokemon/?limit=100`)
            .then(response => response.json())
            .then(data =>
                data.results.forEach((item) => {
                    fetch(item.url)
                        .then((response) => response.json())
                        .then((pokemon) =>
                        {pokemons.push({name: pokemon.name, id: pokemon.id, sprites: pokemon.sprites, types: pokemon.types }) });
                    console.log("collect data from api");
                })
            )
    console.log("collected data");
    return(
        <div className={style.mainContainer}>
            <Collection property={pokemons}/>
        </div>
    )
}
export default MainContent