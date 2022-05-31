import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import AuthForm from '../../components/AuthForm'

function RegisterPage() {
    const [isRegistered, setIsRegistered] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        if (isRegistered) {
            navigate('/login')
        }
    }, [isRegistered])

    return (
        <>
            <Header/>
            <AuthForm type="register" setIsRegistered={setIsRegistered}/>
        </>
    )
}

export default RegisterPage