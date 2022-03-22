import React, { useState } from 'react'
import Map from '../../shared/components/UIElements/Map'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIElements/Card'
import Modal from '../../shared/components/UIElements/Modal'
import classes from './PlaceItem.module.css'

const PlaceItem = props => {
    const [showMap, setShowMap] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const openMapHandler = () => setShowMap(true)

    const closeMapHandler = () => setShowMap(false)

    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
    }
    
    const cancelDeleteHandler = () => {
        setShowConfirmModal(false)
    }

    const confirmDeleteHandler = () => {
        setShowConfirmModal(false)
        console.log("DELETING....")
    }

    return (
        <React.Fragment>
            <Modal
                show={showMap}
                onCancel={closeMapHandler}
                header={props.address}
                contentClass={classes["place-item__modal-content"]}
                footerClass={classes["place-item__modal-actions"]}
                footer = {
                    <Button onClick={closeMapHandler}>
                        CLOSE
                    </Button>} >
                <div className={classes["map-container"]}>
                    <Map center={props.coordinates} zoom={16}/>
                </div>
            </Modal>
            <Modal show={showConfirmModal} onCancel={cancelDeleteHandler} header="are you sure?" footerClass="place-item__modal-actions" footer={
                <React.Fragment>
                    <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
                    <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
                </React.Fragment>
            }>
                <p>
                    Do you want to proceed and delete this place? Please note that it 
                    can't be undone thereafter.
                </p>
            </Modal>
            <li className={classes['place-item']}>
                <Card className={classes['place-item__content']}>
                    <div className={classes['place-item__image']}>
                        <img src={props.image} alt={props.title} />
                    </div>
                    <div className={classes['place-item__info']}>
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className={classes['place-item__actions']}>
                        <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
                        <Button to={`/places/${props.id}`}>EDIT</Button>
                        <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>
                    </div>
                </Card>
            </li>
        </React.Fragment>
    )
}

export default PlaceItem
