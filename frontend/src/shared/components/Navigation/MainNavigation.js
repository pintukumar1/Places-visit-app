import React from 'react'
import { Link } from 'react-router-dom'
import MainHeader from './MainHeader'
import classes from './MainNavigation.module.css'
import Navlinks from './Navlinks'

function MainNavigation(props) {
    return (
        <MainHeader>
            <button className={classes.mainNavigationMenuButton}>
                <span />
                <span />
                <span />
            </button>
            <h1 className={classes.mainNavigationTitle}>
                <Link to="/">
                    Your Places
                </Link>
            </h1>
            <nav>
                <Navlinks />
            </nav>
        </MainHeader>
    )
}

export default MainNavigation