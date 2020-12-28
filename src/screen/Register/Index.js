/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import firebase from '../../config/firebase';

import 'firebase/auth'
import './Register.css'

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [typeMessage, setTypeMessage] = useState('');
    const [message, setMessage] = useState('');
    const [load, setLoad] = useState('');

    const registerUser = (e) => {
        setLoad(true)
        e.preventDefault();
        setMessage(null)
        if(!email || !password){
            setTypeMessage('erro');
            setMessage('Você precisa definir email e senha para fazer o cadastro!')
            return
        }

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(response => {
                setLoad(false)
                setTypeMessage('success')
            })
            .catch(error => {
                setLoad(false)
                setTypeMessage('erro')
                switch(error.message) {
                    case 'Password should be at least 6 characters':
                        setMessage('A senha deve ter pelo menos 6 caracteres')
                        break;
                    case 'The email address is already in use by another account.':
                        setMessage('Este email já esta sendo utilizado')
                        break;
                    case 'The email address is badly formatted.':
                        setMessage('O formato do email é inválido')
                        break;
                    default:
                        setMessage('Não foi possivel cadastrar. Tente novamente mais tarde!')
                        break;
                }
            })
    }

    return (
        <div className="form-register">
            <form className="form-login text-center mx-auto mt-5">
                <h1 className="h3 mb-3 text-black font-weight-bold">Register</h1>
                <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control my-2" placeholder="Email" />
                <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control my-2" placeholder="Senha" />

                {load == true 
                    ? <div className="spinner-border text-danger mt-3 mb-5" role="status">
                        <span className="sr-only"></span>
                    </div>
                    : <>
                    <button onClick={registerUser} type="buttom" className="btn btn-lg btn-block mt-3 mb-5 btn-register">Cadastrar</button>
                    <div className="msg-login text-white my-4">
                        {typeMessage == 'success' && <span className="text-success"><strong>Wow!</strong> Usuário cadastrado com sucesso! &#128526;</span> }
                        {typeMessage == 'erro' && <span className="text-danger"><strong>Opss!</strong> {message} &#128546;</span> }
                    </div>
                    </>
                }
                

                

                
            </form>

        </div>
    )
}