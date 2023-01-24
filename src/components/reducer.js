
import { ACTIONS } from "./action";


const evaluate = ({ currentOperand, previousOperand, operation }) => {
    const prev = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)
    if (isNaN(prev) || isNaN(current)) return ""
    let computation = ""
    switch (operation) {
        case "*":
            computation = prev * current
            break
        case "-":
            computation = prev - current
            break
        case "+":
            computation = prev + current
            break
        case "/":
            computation = prev / current
            break
    }
    return computation.toString()
}

//                (state , action)
export function reducer(state, { type, payload }) {
    switch (type) {
        // on digit click
        case ACTIONS.ADD_DIGIT:
            if (state.overwrite) {
                return {
                    ...state,
                    currentOperand: payload.digit,
                    overwrite: false,
                }
            }
            if (payload.digit === "0" && state.currentOperand === "0") {
                return state
            }
            if(state.currentOperand){
                if (payload.digit === "." && state.currentOperand.includes(".")) {
                    return state
                }
            }
           
            console.log(state.currentOperand, '-------state')
            return {
                ...state,
                currentOperand: `${state.currentOperand || ""}${payload.digit}`,
            }

        // operations button click
        case ACTIONS.CHOOSE_OPERATION:
            if (state.currentOperand == null && state.previousOperand == null) {
                return state
            }
            if (state.currentOperand == null) {
                return {
                    ...state,
                    operation: payload.operation
                }

            }
            if (state.previousOperand == null) {
                return {
                    ...state,
                    operation: payload.operation,
                    previousOperand: state.currentOperand,
                    currentOperand: null,
                }
            }
            return {
                ...state,
                previousOperand: evaluate(state),
                operation: payload.operation,
                currentOperand: null
            }

        // on equal = click
        case ACTIONS.EVAULUATE:
            if (state.currentOperand == null || state.previousOperand == null || state.operation == null) {
                return state
            }

            return {
                ...state,
                overwrite: true,
                previousOperand: null,
                operation: null,
                currentOperand: evaluate(state)
            }

        // on delete button click

        case ACTIONS.DELETE_DIGIT:
            if (state.overwrite) {
                return {
                    ...state,
                    overwrite: false,
                    currentOperand: null
                }
            }

            if (state.currentOperand == null) return state
            if (state.currentOperand.length === 1) {
                return {
                    ...state, currentOperand: null
                }
            }
            return {
                ...state, currentOperand: state.currentOperand.slice(0, -1)
            }
        // on clear button click
        case ACTIONS.CLEAR:
            return {}

    }

    // if (ACTIONS.ADD_DIGIT) {
    //     return {
    //         ...state,
    //         currentOperand: `${state.currentOperand || ""}${payload.digit}`
    //     }
    // }

}
