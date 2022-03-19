import React from 'react'
import Card from '../../shared/UIElements/Card'
import classes from './PlaceList.module.css'

function PlaceList(props) {

    if (props.items === 0) {
        return (
            <div className={classes["place-list center"]}>
                <Card >
                    <h2>No Places found. Maybe create one?</h2>
                    <button>Share Place</button>
                </Card>
            </div>
        )
    }
    return <ul className={classes["place-list"]}>
        {props.items.map(place => (
            <PlaceItem
                key={place.item}
                id={place.id}
                image={place.imageUrl}
                title={place.title}
                description={props.description}
                address={props.address}
                creatorId={place.creator}
                coordinates={place.location}
            />
        ))}
    </ul>
}

export default PlaceList