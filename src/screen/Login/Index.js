import React, { useState } from 'react';
import './Login.css'
import firebase from '../../config/firebase';
import 'firebase/auth'

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [typeMessage, setTypeMessage] = useState('');

    const logIn = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(response => {
                setTypeMessage('success')
            })
            .catch(err => {
                setTypeMessage('err')
            })
    }

    return (
        <div className="login-content d-flex align-items-center">
            <form className="form-signin mx-auto">
                <div className="text-center mb-4">
                    <img className="mb-4" src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
                    <h1 className="h3 mb-3 fw-normal text-white font-weight-bold">Login</h1>
                </div>
                
                
                <input type="email" id="inputEmail" className="form-control my-2" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
                
                <input type="password" id="inputPassword" className="form-control my-2" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />

                <button onClick={logIn} className="w-100 btn btn-lg btn-login" type="button">Sign in</button>

                <div className="msg-login text-white my-4">
                    {typeMessage == 'success' && <span className="text-success"><strong>Wow!</strong> Você está conectado! &#128526;</span> }
                    {typeMessage == 'err' && <span className="text-danger"><strong>Opss!</strong> Verifique se e-mail e senha estão corretos! &#128546;</span> }
                </div>

                <div className="options-login mt-5 text-center">
                    <a href="#" className="mx-2">Recuperar Senha</a>
                    <span className="text-white">&#10073;</span>
                    <a href="#" className="mx-2">Cadastrar</a>
                </div>

            </form>
        </div>
    )

}