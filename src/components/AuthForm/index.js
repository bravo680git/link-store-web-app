import { useState } from "react"
import { useDispatch } from "react-redux"
import clsx from "clsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faEye } from '@fortawesome/free-solid-svg-icons'

import authAPI from '../../apis/auth'
import useFetch from "../../hooks/usefetch"
import { setLoginState } from '../../store/authSlice'
import style from './AuthForm.module.scss'

function AuthForm({ type, setIsRegistered }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordCfm, setPasswordCfm] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const dispatch = useDispatch()
    const fetchApi = useFetch()

    const checkInputField = () => {
        if (username.length < 6) throw 'Username must have more than 8 charaters!'
        if (password.length < 6) throw 'Password must have more than 8 charaters!'
        if (type === 'register' && passwordCfm !== password) {
            throw 'Confirm password must simillar as password!'
        }
    }

    const handleLogin = async () => {
        try {
            checkInputField()
            const account = { username, password }
            const data = await fetchApi(() => authAPI.login(account))
            localStorage.setItem('authToken', data.authToken)
            localStorage.setItem('isLogin', true)
            dispatch(setLoginState(true))
        } catch (error) {
            setErrorMsg(error)
        }
    }

    const hadleRegister = async () => {
        try {
            checkInputField()
            const account = { username, password, passwordConfirm: passwordCfm }
            await fetchApi(() => authAPI.register(account))
            alert('Register new account sucessfully')
            setIsRegistered(true)
        } catch (error) {
            setErrorMsg(error)
        }
    }

    return (
        <div className={clsx(style.container)}>
            <form>
                <div className={clsx(style.input)}>
                    <label htmlFor="username">Username</label>
                    <input
                        name="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <i><FontAwesomeIcon icon={faUser} /></i>
                </div>
                <div className={clsx(style.input)}>
                    <label htmlFor="password">Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <i><FontAwesomeIcon icon={faLock} /></i>
                    {type === 'register' ?
                        null :
                        <div onClick={() => setShowPassword(!showPassword)}>
                            <FontAwesomeIcon icon={faEye} />
                        </div>
                    }
                </div>
                {type === 'register' ?
                    <div className={clsx(style.input)}>
                        <label htmlFor="passwordCfm">Confirm Password</label>
                        <input
                            type='password'
                            name="passwordCfm"
                            value={passwordCfm}
                            onChange={e => setPasswordCfm(e.target.value)}
                        />
                        <i><FontAwesomeIcon icon={faLock} /></i>
                    </div> :
                    null
                }
                <div className={clsx(style.button)}>
                    {type === 'register' ?
                        <button
                            type='button'
                            onClick={hadleRegister}>
                            Register
                        </button> :
                        <button
                            type='button'
                            onClick={handleLogin}>
                            Log in
                        </button>
                    }
                </div>
                {
                    <div className={clsx(style.error)} >
                        {errorMsg}
                    </div>
                }
            </form>
        </div>
    )
}

export default AuthForm