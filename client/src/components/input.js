function input(props){
    let ph=props.placeholder || null
    let label=props.label || null

    function storeData(event){
        props.func(event.target.value)
    }
    
    return (
        <div className="mx-2 relative">
            <label className="text-white absolute -top-6">{label}</label>
            <input type={props.type} placeholder={ph} onChange={storeData || null} 
                    className="px-1 text-black focus:outline-none"/>
        </div>
    )
}

export default input