import api from "./api";

interface resolveProps{
    token: string,
    user:{
        name: string,
        email: string
    }
}

export interface InputSignProps{
    email: string,
    password: string
}

export async function signIn({email, password}:InputSignProps ): Promise<resolveProps> {
    const data = {email, password}
    return await (await api.post('auth', data)).data
}