import React from 'react'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/Util/validators'
import { useForm } from '../../shared/hooks/form-hook'
import classes from './PlaceForm.module.css'


function NewPlace() {
    const [formState, inputHandler] = useForm(
        {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            }, 
            address: {
                value: '',
                isValid : false 
            }
        }, false );

    
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