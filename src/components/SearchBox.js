import React from "react"
import "./SearchBox.css"

const SearchBox = ({onSeachValue, onEnterButton}) => {

    const handleChange  = (e) => {
        console.log(e.target.value)
        onSeachValue(e.target.value)
    }

    const handleEnterButton = (e) => {
        if (e.key === 'Enter') {
            // Handle the Enter key press
            onEnterButton()
        }
    }

    return (
        <div className="d-flex justify-content-center montserrat-normal" style={{width:"360px"}}>
            <input
                className="input_search" 
                type="text" 
                placeholder="  Search" 
                onChange={(e) => handleChange(e)}
                onKeyDown={(e) => handleEnterButton(e)}    
                ></input>
        </div>
    )
}

export default SearchBox;