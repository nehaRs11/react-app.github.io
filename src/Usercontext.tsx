import { useState, createContext } from "react"

export type AuthUser ={
    Name:string,
    Email:string
    Password:string
    Id:string
}
type UserContProviderProp={
    children : React.ReactNode
}

type UserContextType={
    user: AuthUser | null
    setUser:React.Dispatch<React.SetStateAction<AuthUser | null>>
}

export let UserContext = createContext({} as UserContextType) //allows to get rid of null check
// export let UserContext = createContext<UserContextType |null>({})

export const UserContProvider = ({children}:UserContProviderProp)=>{
    const [user, setUser] = useState<AuthUser|null>(null)
    return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>

}