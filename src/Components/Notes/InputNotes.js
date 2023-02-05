import React from 'react'

const InputNotes = () => {

    return (
        <div>
            <label htmlFor="Title"></label>
            <input type="text" value="" placeholder='Title' onFocus={titleFocusHandler} onBlur={titleBlurHandler}></input>
        </div>
    )
}

export default InputNotes