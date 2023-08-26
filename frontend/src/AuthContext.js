import { createContext, useCallback, useState } from "react";

export const AuthContext  = createContext({})


export const AuthProvider = ({children}) => {
    const [userInfo , setuserInfo] = useState({})

    const handleInfo = useCallback((value) => {
        setuserInfo(value)
    },[setuserInfo])
    return(
        <AuthContext.Provider value={{userInfo,handleInfo}}>
            {children}
        </AuthContext.Provider>
    )
}