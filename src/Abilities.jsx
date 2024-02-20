import './Abilities.sass'
function Abilities({property}){
    const abilityList = []

    console.log("fullfilling abilities");
    property.forEach((item) => {

        const style = item.type.name;
        abilityList.push(
        <ul className={`${style} button`}>
            <span className='text'>{style}</span>
        </ul>
        )
    })

    return abilityList;
}
export default Abilities