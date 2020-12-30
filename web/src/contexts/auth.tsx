import { createContext, useEffect, useState } from 'react';
import api from '../service/api';
import * as auth from '../service/apiAuth';
import { InputSignProps } from '../service/apiAuth';

interface UserProps{
    name: string,
    email:string
}

interface AuthContextData {
    signed: boolean,
    user: UserProps | null,
    loading: boolean,
    signIn: (signinProps: InputSignProps)=> Promise<null | Error>,
    signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<UserProps | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStorageData()
    }, [])

    async function loadStorageData() {
        const storageUser = localStorage.getItem("@App:user")
        const storageToken = localStorage.getItem("@App:token")


        if (storageToken && storageUser) {
            setUser(JSON.parse(storageUser))
            api.defaults.headers.Authorization = `Bearer ${storageToken}`

        }
        setLoading(false)
    }

    async function signIn({...rest} : InputSignProps) {
        try {
            const response = await auth.signIn({...rest})
            
            setUser(response.user);
            
            api.defaults.headers.Authorization= `Bearer ${response.token}`
            
            localStorage.setItem("@App:user", JSON.stringify(response.user))
            localStorage.setItem("@App:token", JSON.stringify(response.token))
            return
        } catch (error) {
            return error
        }


    }

    function signOut() {
        localStorage.clear()
        setUser(null)
    }


    return (
        <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;