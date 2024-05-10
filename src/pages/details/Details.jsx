import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import style from "./Details.module.sass"
import Abilities from "../../components/Abilities/Abilities.jsx";
import {MoveTypes} from "../../utils/MoveTypes/MoveTypes.js";

function PokemonDetailsPage() {
//useParams
    const [pokemonPageInfo, setPokemonPageInfo] = useState({});
    const [pokemonStats, setPokemonStats] = useState([]);
    const [moves, setMoves] = useState([])
    const [abilities, setAbilities] = useState([])

    const {name} = useParams();

    const getPokemons = async () => {
        await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(response => response.json())
            .then(data => {
                setPokemonPageInfo(data);
                setPokemonStats(data.stats)

                const moveTypes = []
                const fetchMoves = data.moves.slice(0, 6).map(async move => {
                    const response = await fetch(move.move.url);
                    const responseData = await response.json();
                    moveTypes.push({
                        name: move.move.name,
                        image: MoveTypes[responseData.type.name],
                        color: responseData.type.name
                    });

                    Promise.all(fetchMoves).then(() => {
                        setMoves(moveTypes)
                    });
                    setAbilities(data.abilities)
                })
            })
    }

        useEffect(() => {
            getPokemons()
        }, [])


        return (
            <div className={style.container}>
                <Link to={"/pokemon"}>
                    <header className={style.header}>
                        <img src="/src/assets/arrow-sm-left-svgrepo-com.svg" alt="arrow" className={style.arrow}/>
                        <img src="/src/assets/pokeball.png" alt="poke-ball" className={style.image}/>
                    </header>
                </Link>
                <div className={style.pageContainer}>
                    <div className={style.centralContainer}>
                        <div className={style.mainInfoContainer}>
                            <div className={style.smallMainInfo}>
                                <div className={style.pokemonsNameContainer}>
                                    <span className={style.pokemonsId}>#{
                                        (pokemonPageInfo.id < 10) ? ('00' + pokemonPageInfo.id) :
                                            (pokemonPageInfo.id < 100) ?
                                                ('0' + pokemonPageInfo.id) : pokemonPageInfo.id
                                    }</span>
                                    <span className={style.pokemonsName}>{name}</span>
                                </div>
                                <Abilities property={pokemonPageInfo.types}></Abilities>
                            </div>
                            <div className={style.statsContainer}>
                                {(pokemonStats.length > 0) ?
                                    (
                                        <>
                                            <div className={style.stats}>
                                                <div className={style.statsItem}>
                                                    <span>HP</span>
                                                    <div className={`${style.progressBar} ${style.HPProgressBar}`}>
                                                        <div className={style.HPProgress}
                                                             style={{width: `${pokemonStats[0].base_stat}%`}}></div>
                                                    </div>
                                                </div>
                                                <div className={style.statsItem}>
                                                    <span>Attack</span>
                                                    <div className={`${style.progressBar} ${style.AttackProgressBar}`}>
                                                        <div className={style.AttackProgress}
                                                             style={{width: `${pokemonStats[1].base_stat}%`}}></div>
                                                    </div>
                                                </div>
                                                <div className={style.statsItem}>
                                                    <span>Defence</span>
                                                    <div className={`${style.progressBar} ${style.defenceProgressBar}`}>
                                                        <div className={style.defenceProgress}
                                                             style={{width: `${pokemonStats[2].base_stat}%`}}></div>
                                                    </div>
                                                </div>
                                                <div className={style.statsItem}>
                                                    <span>Speed</span>
                                                    <div className={`${style.progressBar} ${style.speedProgressBar}`}>
                                                        <div className={style.speedProgress}
                                                             style={{width: `${pokemonStats[3].base_stat}%`}}></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <img src={pokemonPageInfo.sprites.other.home.front_default} alt={name}
                                                 className={style.pokemonImage}/>
                                        </>
                                    ) :
                                    (<></>)
                                }
                            </div>
                        </div>

                        <div className={`${style.breedingContainer} ${style.mainInfoContainer}`}>
                            <h1 className={style.title}>Breeding</h1>
                            <div className={style.breedingInformation}>
                                <div className={style.height}>
                                    <span className={style.breedingTitle}>Height</span>
                                    <div className={style.heightStats}>
                                        <span
                                            className={style.footsHeight}>{Math.round(pokemonPageInfo.height * 3.2808)}`</span>
                                        <span className={style.metersHeight}>{pokemonPageInfo.height / 10}m</span>
                                    </div>
                                </div>
                                <div className={style.weight}>
                                    <span className={style.breedingTitle}>Weight</span>
                                    <div className={style.weightStats}>
                                        <span
                                            className={style.ibsWeight}>{Math.round(pokemonPageInfo.weight * 2.2046)} lbs</span>
                                        <span className={style.kgWeight}>{pokemonPageInfo.weight / 10}kg</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={` ${style.mainInfoContainer}`}>
                            <h1 className={style.title}>Moves</h1>
                            <ul className={style.movesList}>
                                {
                                    moves.map((move, index) => {
                                        const backgroundColor = move.color
                                        return (
                                            <li key={index} className={`${style.move} ${backgroundColor}`}>
                                                <img src={move.image} alt="move-image" style={{width: '55px'}}/>
                                                <span className={style.moveName}>{move.name.replace('-', ' ')}</span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>

                        {
                            (abilities.length > 0) ?
                                <div className={` ${style.mainInfoContainer}`}>
                                    <h1 className={style.title}>Abilities</h1>
                                    <ul className={style.abilitiesList}>
                                        <li className={style.ability}>
                                            <span className={style.firstLetterLogo}>{abilities[0].ability.name.slice(0,1)}</span>
                                            <span className={style.abilityTitle}>{abilities[0].ability.name.replace('-', ' ')}</span>
                                        </li>
                                        <li className={`${style.ability} ${style.secondAbility}`}>
                                            <span className={`${style.firstLetterLogo} ${style.secondAbilityLogo}`}>{abilities[1].ability.name.slice(0,1)}</span>
                                            <span className={style.abilityTitle}>{abilities[1].ability.name.replace('-', ' ')}</span>
                                        </li>
                                    </ul>
                                </div> :
                                <></>
                        }

                    </div>
                </div>

            </div>
        )

    }


export default PokemonDetailsPage