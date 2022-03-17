import React from 'react'
import UserItem from './UserItem'
import classes from './UsersList.module.css'

function UsersList(props) {
    if (props.items.length === 0) {
        return (
            <div>
                <h2>No users found.</h2>
            </div>
        )
    }

    return (
        <ul className={classes.usersList}>
            {props.items.map(user => (
                <UserItem
                    key={user.id}
                    id={user.id} image={user.image}
                    name={user.name}
                    placeCount={user.places}
                />
            ))}
        </ul>
    )
}

export default UsersList