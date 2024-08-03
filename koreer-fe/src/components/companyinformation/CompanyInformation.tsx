import style from "../../assets/scss/sub/companyInformation.module.scss"

export function CompanyInformation() {
    console.log(12312)
    return (
        <>
            <div className={style.companyInfoContainer}>
                {/* 소개 영상 영역 */}
                <div className={style.introSection}>
                    <div className={style.introVideo}>
                        <div className={style.videoPlaceholder}>▶</div>
                    </div>
                    <div className={style.introText}>How much do you know about Canada?</div>
                </div>

                {/* 회사 목록 컨텐츠 영역 */}
                <div className={style.companyContents}>
                    <div className={style.filterSection}>
                        <button className={style.filterButton}>Frontend</button>
                        <button className={style.filterButton}>Backend</button>
                        <button className={style.filterButton}>DevOps</button>
                        <button className={style.filterButton}>Salary</button>
                        <button className={style.filterButton}>Location</button>
                        <button className={style.filterButton}>Visa</button>
                    </div>
                    <div className={style.jobListings}>
                        <div className={style.jobListing}>
                            <div className={style.jobHeader}>
                                <span className={style.companyName}>Google</span>
                                <span className={style.jobTitle}>Cleaner</span>
                            </div>
                            <div className={style.jobDetails}>
                                <span className={style.jobLocation}>Las Vegas</span>
                                <span className={style.jobDescription}>we're looking for cleaner who is ...</span>
                            </div>
                        </div>
                        {/* 추가적인 job-listing 요소들 */}
                    </div>
                </div>
            </div>
        </>
    )
}