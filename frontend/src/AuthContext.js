import { createContext, useState } from "react";

export const AuthContext  = createContext()


export const AuthProvider = ({children}) => {
    const [userInfo , setuserInfo] = useState()
    return(
        <AuthContext.Provider value={{userInfo,setuserInfo}}>
            {children}
        </AuthContext.Provider>
    )
}