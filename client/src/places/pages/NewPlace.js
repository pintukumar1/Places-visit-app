import React, { useContext } from 'react'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/Util/validators'
import { useForm } from '../../shared/hooks/form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook'
import classes from './PlaceForm.module.css'
import { AuthContext } from '../../shared/context/auth-context'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

function NewPlace() {
    const auth = useContext(AuthContext)
    const { isLoading, error, sendRequest, clearError } = useHttpClient()
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
                isValid: false
            }
        }, false);


    const placeSubmitHandler = async (event) => {
        event.preventDefault(); 
        // console.log(formState.inputs)
        try {
            await sendRequest('http://localhost:5000/api/places',
             "POST",
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value,
                    address: formState.inputs.address.value,
                    creator : auth.userId
                }),
                {
                    "Content-Type" : "application/json"
                }
            );
            //Redirect the user to a different page
        } catch (err) {}
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <form className={classes["place-form"]} onSubmit={placeSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay/>}
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
        </React.Fragment>
    )
}

export default NewPlace