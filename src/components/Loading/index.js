import clsx from "clsx"
import style from './Loading.module.scss'

function Loading({ show }) {

    return (
        <>
            {show &&
                <div className={clsx(style.container)}>
                    <div className={clsx(style.div3)}></div>
                    <div className={clsx(style.div2)}></div>
                    <div className={clsx(style.div1)}></div>
                </div>
            }
        </>
    )
}

export default Loading