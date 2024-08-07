import style from "../../assets/scss/sub/community.module.scss"

export function Community() {
    return(
        <>
            <div className={style.communityUpperWrapper}>
                {/* 커뮤니티 헤더 */}
                <div className={style.communityTitleWrapper}>
                    <span className={style.title}>Comunity</span>
                    <span className={style.subTitle}>Share your thoughts and opinions with a diverse group of people.</span>


                </div>
            </div>
        </>
    )
}