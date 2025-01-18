import { createContext, useState } from "react";
import React from "react";

const User = createContext(null)

const UserProvider = ({children}) =>{
    const [user, setUser] = useState({"Name":"Vansh" , "dob": "2002-12-17" , "tob":"13:20" , "Gender":"Male", "State":"Maharashtra" , "City":"Mumbai"})

    return(
        <User.Provider value={{user,setUser}}>
            {children}
        </User.Provider>
    )

}

export {User, UserProvider}