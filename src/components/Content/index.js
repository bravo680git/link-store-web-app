import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { toast } from 'react-toastify';

import storeAPI from '../../apis/store'
import LinkTag from "../LinkTag";
import StoreForm from '../StoreForm'
import { setData } from '../../store/dataSlice'
import useHandleLogout from "../../hooks/useHandleLogout";
import style from './Content.module.scss'

function Content() {
    const dispatch = useDispatch()
    const handleLogout = useHandleLogout()
    const data = useSelector(state => state.data.data)
    const [show, setShow] = useState({ show: false, data: {}, action: '' })

    useEffect(() => {
        (async () => {
            try {
                const resData = await storeAPI.getAll()
                dispatch(setData(resData))
            } catch (error) {
                toast.error(error)
                if (error === 'Unauthorization' || error === 'No prohibit') {
                    handleLogout()
                }
            }
        })()
    }, [])

    return (
        <>
            <div className={clsx(style.btn)} onClick={() => setShow({ show: true, action: 'create' })}>
                Add a new Link
            </div>
            <div className={clsx(style.container)}>
                {data && data.map((item, i) =>
                    <LinkTag dataTag={item} setShow={setShow} key={i} />)
                }
                {show.show && <StoreForm showForm={[show, setShow]} />}
            </div>
        </>
    )
}

export default Content