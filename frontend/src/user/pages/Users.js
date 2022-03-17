import React from "react"
import UsersList from "../components/UsersList"

const Users = () => {
    const USERS = [
        {
            id: "u2",
            name: "MS Dhoni", 
            image : "https://www.skymetweather.com/themes/skymet/images/gallery/toplists/Best-MS-Dhoni-Hairstyles-To-Flaunt-This-Summer/1.jpg", 
            places: 2
        }
    ]

    return <UsersList items={USERS} />
}

export default Users