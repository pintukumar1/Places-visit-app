import React from 'react'
import UserItem from './UserItem'
import Card from '../../shared/UIElements/Card'
import classes from './UsersList.module.css'

function UsersList(props) {
    if (props.items.length === 0) {
        return (
            <div className={classes.center}>
                <Card>
                    <h2>No users found.</h2>
                </Card>
            </div>

        )
    }

    return (
        <ul className={classes['users-list']}>
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