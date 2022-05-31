import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import AuthForm from '../../components/AuthForm'

function LoginPage() {
    const navigate = useNavigate()
    const isLogin = useSelector(state => state.auth.isLogin)
    useEffect(() => {
        if (isLogin) {
            navigate('/store')
        }
    }, [isLogin])

    return (
        <>
            <Header/>
            <AuthForm type="login" />
        </>
    )
}

export default LoginPage