import { createContext, useState } from "react";
import React from "react";

const User = createContext(null)

const UserProvider = ({children}) =>{
    const [user, setUser] = useState({"name":"Vansh" , "dob": "2002-12-17" , "time":"13:20" , "gender":"Male", "state":"Maharashtra" , "city":"Mumbai"})

    return(
        <User.Provider value={{user,setUser}}>
            {children}
        </User.Provider>
    )

}

export {User, UserProvider}