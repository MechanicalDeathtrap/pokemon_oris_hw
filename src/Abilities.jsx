import './Abilities.sass'
function Abilities({property}){
    const abilityList = []

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