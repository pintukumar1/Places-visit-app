import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Navlinks.module.css'

function Navlinks(props) {
    return (
        <ul className={classes.navlinks}>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? `${classes.active}` : undefined
                    }>
                    ALL USERS
                </NavLink>
            </li>
            <li >
                <NavLink
                    to="/u1/places" 
                    className={({ isActive }) =>
                        isActive ? `${classes.active}` : undefined
                    }>
                    MY PLACES
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/places/new" 
                    className={({ isActive }) =>
                        isActive ? `${classes.active}` : undefined
                    }>
                    ADD PLACE
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/auth" 
                    className={({ isActive }) =>
                        isActive ? `${classes.active}` : undefined
                    }>
                    AUTHENTICATE
                </NavLink>
            </li>
        </ul>
    )
}

export default Navlinks