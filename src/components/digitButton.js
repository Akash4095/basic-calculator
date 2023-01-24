import React from 'react'
import { ACTIONS } from './action'

const DigitButton = ({ digit, dispatch }) => {
    console.log(digit,'-digit')
    return (
        <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
        >{digit}
        </button>
    )
}

export default DigitButton