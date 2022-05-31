import { useDispatch } from 'react-redux'
import { setLoading } from '../store/dataSlice'

const useFetch = () => {
    const dispatch = useDispatch()
    return async (apiCallback) => {
        try {
            dispatch(setLoading(true))
            const res = await apiCallback()
            dispatch(setLoading(false))
        return res
        } catch (error) {
            dispatch(setLoading(false))
            throw error
        }
    }
}

export default useFetch