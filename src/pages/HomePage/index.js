import { Link } from 'react-router-dom'
import clsx from 'clsx';
import Header from "../../components/Header";
import style from './HomePage.module.scss'

function HomePage() {

    return (
        <>
            <Header />
            <div className={clsx(style.homeContent)}>
                <p>
                    Welcome to link store app, a app can help you store and easily find the URL to
                    many website.
                </p>
                <hr />
                <p>
                    <Link to='/register'>Sign up</Link> or <Link to='/login'>Sign in</Link> to start.
                </p>
            </div>
        </>
    )
}

export default HomePage