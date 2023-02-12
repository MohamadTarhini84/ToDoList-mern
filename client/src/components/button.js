function button(props){
    return (
        <button className={`bg-${props.colour || "white"} px-3 mx-2 rounded-sm 
            shadow-lg hover:scale-110 hover:opacity-80 transition-all ease-in`}
            onClick={props.onClick}>
            {props.value}
        </button>
    )
}

export default button