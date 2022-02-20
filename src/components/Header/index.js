import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import clsx from "clsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome } from '@fortawesome/free-solid-svg-icons'
import useHandleLogout from "../../hooks/useHandleLogout"
import storeAPI from "../../apis/store"
import { setData } from '../../store/dataSlice'
import style from './Header.module.scss'

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = useHandleLogout()
    const isLogin = useSelector(state => state.auth.isLogin)
    const [query, setQuery] = useState('title')
    const [search, setSearch] = useState('')

    const handleSearch = async () => {
        if (!isLogin) return
        try {
            const resData = await storeAPI.searchLink({[query]:search})
            dispatch(setData(resData))
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className={clsx(style.container)}>
            <header>
                <div className={clsx(style.home)} onClick={ () => navigate('/store')}>
                    <FontAwesomeIcon icon={faHome}/>
                </div>
                <div className={clsx(style.searchBox)}>
                    <input
                        placeholder="Search"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <select
                        value={query}
                        onChange={e => setQuery(e.target.value
                            )}
                    >
                        <option value='title'>title</option>
                        <option value='type'>type</option>
                    </select>
                    <button onClick={handleSearch}>Search</button>
                </div>
                {!isLogin ?
                    <div className={clsx(style.btn)}>
                        <div className={clsx(style.signIn)}>
                            <button onClick={() => navigate('/login')}>Sign in</button>
                        </div>
                        <div className={clsx(style.signUp)}>
                            <button onClick={() => navigate('/register')}>Sign up</button>
                        </div>
                    </div> :
                    <div className={clsx(style.btn)}>
                        <button onClick={handleLogout}>Log out</button>
                    </div>
                }
            </header>
        </div>
    )
}

export default Header