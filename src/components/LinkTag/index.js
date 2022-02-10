import { useSelector, useDispatch } from "react-redux"
import clsx from "clsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { setData } from '../../store/dataSlice'
import storeAPI from '../../apis/store'
import style from './LinkTag.module.scss'

function LinkTag({ dataTag, setShow }) {
    const data = useSelector( state => state.data.data)
    const oldData = data
    const dispatch = useDispatch()

    const handleEdit = async () => {
        setShow({
            show: true, 
            data: dataTag,
            action: 'edit'
        })
    }
    
    const handleDelete = async () => {    
        const id = dataTag._id
        const newData = data.filter(item => item._id !== id)
        dispatch(setData(newData))
        try {
            await storeAPI.deleteLink(id)
            alert('Delete item sucessfully')
        } catch (error) {
            alert('Fail to delete item: '+error)
            dispatch(setData(oldData))
        }
    }

    return (
        <div className={clsx(style.tag)}>
            <a href={dataTag.link} target='_blank'>
                <h3>{dataTag.title}</h3>
                <p>{dataTag.description}</p>
            </a>
            <div className={clsx(style.btn)}>
                <i 
                    className={clsx(style.edit)}
                    onClick={handleEdit}>
                        <FontAwesomeIcon icon={faPen}/>
                </i>
                <i 
                    className={clsx(style.delete)}
                    onClick={handleDelete}>
                        <FontAwesomeIcon icon={faTrash}/>
                </i>
            </div>
        </div>
    )
}

export default LinkTag