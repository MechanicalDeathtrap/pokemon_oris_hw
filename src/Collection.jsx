import Abilities from "./Abilities.jsx";
import style from './Collection.module.sass'
function Collection({property}){

    const pokemonList =[];
    console.log("creating card");
    property.forEach((item) =>{
        pokemonList.push(
            <ul key={item.id} className={style.element}>
                <div className={style.info}>
                    <span className={style.name}>{item.name}</span>
                    <span>#{item.id}</span>
                </div>
                <img src={item.sprites.front_default} alt="pokemon" className={style.image}/>
                <li>
                    <Abilities property={item.types}/>
                </li>
            </ul>
        )
    })
    console.log("done with cards");
    return pokemonList
}

export default Collection