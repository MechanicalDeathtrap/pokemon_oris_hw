import './Abilities.sass'
function Abilities({property}){
    const abilityList = []
if (property !== undefined){
    property.map((item) => {

        const style = item.type.name;
        abilityList.push(
            <li className={`${style} button`}>
                <span className='text'>{style}</span>
            </li>
        )
    })
}
    return abilityList;
}
export default Abilities