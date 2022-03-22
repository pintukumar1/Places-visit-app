import React, { useCallback, useReducer } from 'react'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/Util/validators'
import classes from './PlaceForm.module.css'

const formReducer = (state, action) => {
    switch (action.type) {
        case "INPUT_CHANGE":
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: { value: action.value, isValid: action.isValid }
                },
                isValid: formIsValid
            }
        default:
            return state
    }
}


function NewPlace() {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            title: {
                value: "",
                isValid: false
            },
            description: {
                value: "",
                isValid: false
            },
            address: {
                value: "",
                isValid: false
            }
        },
        isValid: false
    })

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: "INPUT_CHANGE",
            value: value,
            isValid: isValid,
            inputId: id
        });
    }, [])

    const placeSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formState.inputs)
    }

    return (
        <form className={classes["place-form"]} onSubmit={placeSubmitHandler}>
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                errorText="Please enter a valid title."
            />
            <Input
                id="description"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                onInput={inputHandler}
                errorText="Please enter a valid description (at least 5 characters)."
            />
            <Input
                id="address"
                type="text"
                element="input"
                label="Address"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                errorText="Please enter a valid address."
            />
            <Button type="submit" disabled={!formState.isValid}>ADD PLACE</Button>
        </form>
    )
}

export default NewPlace