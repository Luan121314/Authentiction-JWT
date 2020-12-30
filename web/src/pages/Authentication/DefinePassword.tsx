import React, { FormEvent, useEffect, useState } from 'react';
import Input from '../../components/inputs/input/input';
import Authentication from '../../Layout/Authentication';
import api from '../../service/api';
import jwt from 'jsonwebtoken';
import './style.css';
import { useParams } from 'react-router-dom';

interface TokenArgs {
    token: string
}

interface PayloadJWT {
    id: string;
    email: string;
}

const DefinePassword: React.FC = () => {
    const [redefineStatus, setRedefineStatus] = useState({ className: 'd-none', message: '' });
    const [isCheckedToken, setIsChekedToken] = useState(false);
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('')
    const [id, setId] = useState('');
    const { token } = useParams<TokenArgs>()



    useEffect(() => {
        try {
            const secretKey = process.env.REACT_APP_TOKEN as string ;
            
            const payloadJWT = jwt.verify(token, secretKey);
            console.log(payloadJWT);

            const { id, email } = payloadJWT as PayloadJWT;
            setId(id);
            setEmail(email);
            setIsChekedToken(true);

        } catch (error) {
            setIsChekedToken(false)
        }
    }, [])


    async function handleCreateProcessDefinePassword(e: FormEvent) {
        e.preventDefault();
        try {
            const secretKey = process.env.REACT_APP_TOKEN as string ;
            const token = jwt.sign({ id: 'anonymous' }, secretKey, { expiresIn: 600 })
            const user = await api.put(`users/${id}`, { password, email }, { headers: { authorization: `Bearer ${token}` } })
            console.log(user.status);
            setRedefineStatus({
                message: `Senha redefinida.`,
                className: 'alert-sucess'
            })

        } catch (error) {
            console.log('Error redefine pasword', error.message);
            setRedefineStatus({
                message: `Ops deu algum error.`,
                className: 'alert-danger'
            })

        }
    }

    return (
        <Authentication>
            {isCheckedToken ? (

                <form className="form-signin ">
                    <h1 className="h3 mb-3 font-weight-normal">Redefinir senha</h1>
                    <Input
                        key="inputEmailm´ms´vs"
                        type="password"
                        label="Nova senha"
                        name="password"
                        id="inputEmail"
                        required
                        autoFocus
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                        key="inputEmailm´ms´vs"
                        type="password"
                        label="Confirme a senha"
                        name="password"
                        id="inputEmail"
                        required
                        autoFocus
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                    />


                    <div className={`alert ${redefineStatus.className}  `}>
                        {redefineStatus.message}
                    </div>
                    <div className="button-group">


                        <button
                            className="btn btn-lg btn-primary btn-block"
                            onClick={handleCreateProcessDefinePassword}
                            type="button">Pronto</button>

                    </div>
                </form>
            ) : (
                    <div className="alert alert-danger">
                        Sessão expirada
                    </div>
                )}
        </Authentication>
    )
}

export default DefinePassword;