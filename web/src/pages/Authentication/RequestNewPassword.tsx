import React, { FormEvent, useState } from 'react';
import Input from '../../components/inputs/input/input';
import Authentication from '../../Layout/Authentication';
import api from '../../service/api';
import jwt from 'jsonwebtoken';
import './style.css'

const RequestNewPassword: React.FC = () => {
    const [email, setEmail] = useState('luan.staner@gmail.com');
    const [redefineStatus, setRedefineStatus] = useState({ className: 'd-none', message: '' });

    async function handleCreateProcessRequestNewPassword(e: FormEvent) {
        e.preventDefault();
        try {
            const secretKey = process.env.REACT_APP_TOKEN as string ;
            const token = jwt.sign({ id: email }, secretKey , { expiresIn: 600 });
            const authorization = `Bearer ${token}`;
            
            const user = await api.post('/auth/redefine/password', { email }, { headers: { authorization } })
            console.log(user.status);
            setRedefineStatus({
                message: `Enviamos um email para ${email}, com os seguintes passos para refinição de senha.`,
                className: 'alert-warning'
            })

        } catch (error) {
            console.log('Error redefine pasword', error.message);
            setRedefineStatus({
                message: `Usuário não existe, solicite um usuário ao administrador.`,
                className: 'alert-danger'
            })

        }
        // setEmail('')
    }

    return (
        <Authentication>
            <form className="form-signin ">
                <h1 className="h3 mb-3 font-weight-normal">Redefinir senha</h1>
                <Input
                    key="inputEmailm´ms´vs"
                    type="email"
                    label="Email"
                    name="email"
                    id="inputEmail"
                    required
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />


                <div className={`alert ${redefineStatus.className}  `}>
                    {redefineStatus.message}
                </div>
                <div className="button-group">


                    <button
                        className="btn btn-lg btn-primary btn-block"
                        onClick={handleCreateProcessRequestNewPassword}
                        type="button">Pronto</button>

                </div>
            </form>
        </Authentication>
    )
}

export default RequestNewPassword;