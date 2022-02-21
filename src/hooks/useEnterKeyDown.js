const useEnterKeyDown = () => (e, callback) => {
    if (e.keyCode === 13) {
        callback()
    }
}

export default useEnterKeyDown