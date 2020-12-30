import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../components/inputs/input/input';
import { useAuth } from '../../hooks/useAuth';
import Authentication from '../../Layout/Authentication';
import './style.css'

const SingIn: React.FC = () => {
    const { signIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signedStatus, setSignedStatus] = useState(true);
    const history = useHistory();

    async function handleSignIn(e: FormEvent) {
        e.preventDefault();
        console.log('Logar');
        const signedGoodProcessed = await signIn({ email, password })
        setSignedStatus(!signedGoodProcessed);

    }

    function handleRedirectToPageRequestNewPassword(e: FormEvent){
        e.preventDefault();
        history.push('/redefine')
    }

    return (
        <Authentication>
            <form className="form-signin ">
                <h1 className="h3 mb-3 font-weight-normal">Signin</h1>
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
                <Input
                    key="inputPasswordnvsbnsp"
                    label="Senha"
                    name="password"
                    type="password"
                    id="inputPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />

                <div className={!signedStatus ? `alert alert-danger` : 'd-none'}>
                    Usuário e senha incorretos
                </div>
                <div className="button-group">

                    <button
                        className="btn btn-lg btn-primary btn-block"
                        onClick={handleSignIn}
                        type="button">Sign in</button>

                    <button 
                    className="btn btn-link"
                    type="button"
                    onClick={handleRedirectToPageRequestNewPassword}
                     >Esqueci a senha</button>
                </div>
            </form>
        </Authentication>
    )
}

export default SingIn