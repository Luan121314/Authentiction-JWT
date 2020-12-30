import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import './style.css'

const Home: React.FC = () => {

    const { signOut, user } = useAuth()

    function handleSignOut() {
        signOut()
    }

    return (
        <>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#" aria-disabled="true">Disabled</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                            <div className="dropdown-menu" aria-labelledby="dropdown01">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li>
                    </ul>
                    <div className="alert alert-secondary">
                        <span>Olá <strong>{user?.name}</strong></span>
                    <button 
                    className="btn btn-secondary ml-2 my-sm-0" 
                    onClick={handleSignOut}
                    type="button">Sign out</button>
                    </div>
                </div>
            </nav>

            <main role="main" className="container">

                <div className="starter-template">
                    <h1>Bootstrap starter template</h1>
                    <p className="lead">Use this document as a way to quickly start any new project.<br/> All you get is this text and a mostly barebones HTML document.</p>
                </div>
      
            </main>

      </>
      
    )
}

export default Home;