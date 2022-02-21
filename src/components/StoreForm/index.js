import { useState } from 'react'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'

import { setData } from '../../store/dataSlice'
import storeAPI from '../../apis/store'
import useFetch from '../../hooks/usefetch'
import style from './StoreForm.module.scss'

function StoreForm({ showForm }) {
    const [show, setShow] = showForm
    const data = show.data ? show.data : {}
    const action = show.action
    const [title, setTitle] = useState(data.title ?? '')
    const [link, setLink] = useState(data.link ?? '')
    const [type, setType] = useState(data.type ?? '')
    const [description, setDescription] = useState(data.description ?? '')
    const [errorMsg, setErrorMsg] = useState('')
    const dispatch = useDispatch()
    const fetchApi = useFetch()

    const handleSubmit = async () => {
        try {
            if (!(title && link)) throw 'Title and link are require fields'
            const sendData = {
                title,
                link,
                type,
                description
            }
            
            if (action === 'create') {
                await fetchApi(() => storeAPI.saveLink(sendData))
                toast.success('Save item successfully')
            }
            else {
                await fetchApi(() => storeAPI.editLink(data._id, sendData))
                toast.success('Edit item successfully')
            }

            setShow({show:false}) //hide store form 
            const resData = await storeAPI.getAll()
            dispatch(setData(resData))
        } catch (error) {
            toast.error(error)
            setErrorMsg(error)
        }
    }

    return (
        <div className={clsx(style.container)}>
            <i onClick={() => setShow({show: false})}><FontAwesomeIcon icon={faTimes}/></i>
            <form>
                <div className={clsx(style.heading)}>
                    {action === 'create' ? 'Save a new link' : 'Edit link'}
                </div>
                <div className={clsx(style.input)}>
                    <label>Title</label>
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className={clsx(style.input)}>
                    <label>Link</label>
                    <input
                        value={link}
                        onChange={e => setLink(e.target.value)}
                    />
                </div>
                <div className={clsx(style.input)}>
                    <label>Type</label>
                    <input
                        value={type}
                        onChange={e => setType(e.target.value)}
                    />
                </div>
                <div className={clsx(style.input)}>
                    <label>Description</label>
                    <input
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <div className={clsx(style.btn)}>
                    <button
                        type='button'
                        onClick={handleSubmit}
                    >Submit</button>
                </div>
                <div className={clsx(style.error)}>
                    {errorMsg}
                </div>
            </form>
        </div>
    )
}

export default StoreForm