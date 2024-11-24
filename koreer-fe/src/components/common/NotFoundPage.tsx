import style from "../../assets/scss/common/notfound.module.scss"
import React from "react";
import {Link} from "react-router-dom";

export function NotFoundPage() {
    return(
        <>
            <div className={style.notfoundContainer}>
                <h1 className={style.notfoundTitle}>404</h1>
                <p className={style.notfoundMessage}>Oops! The page you're looking for doesn't exist.</p>
                <Link to="/" className={style.homeButton}>
                    Go Back Home
                </Link>
            </div>
        </>
    )
}