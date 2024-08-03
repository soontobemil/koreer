import style from "../../assets/scss/sub/companyInformation.module.scss"
import google from "../../assets/img/google.jpeg"
import wynn_resorts from "../../assets/img/wynn_resorts.jpeg"
import unlv from "../../assets/img/unlv.png"

export function CompanyInformation() {
    const jobListingsData = [
        {
            companyName: 'Wynn Resorts',
            jobTitle: 'Developer',
            location: 'North Las Vegas, NV',
            salaries: '122K',
            reviews: '701',
            description: 'What happens in Vegas may also happen in China. Wynn Resorts, the brainchild of gaming mogul and former Mirage Resorts chairman Steve Wynn, operates luxury casino resorts in Las Vegas and Macau, the only place in China where gambling is legal. The company\'s Wynn Las Vegas is a .',
            companyThumbnail: wynn_resorts,
        },
        {
            companyName: 'University of Nevada Las Vegas overview',
            jobTitle: 'Web Developer',
            location: 'Las Vegas, NV',
            salaries: '140K',
            reviews: '291',
            description: "The rebel yell of these UNLV students could justly be \"Viva Las Vegas!\" Nearly 28,000 students attend the University of Nevada, Las Vegas (UNLV), the largest academic institution in the state and home to the Rebel mascot. The university offers more than 220 undergra",
            companyThumbnail: unlv,
        },
        {
            companyName: 'Google',
            jobTitle: 'Cleaner',
            location: 'New York',
            salaries: '80K',
            reviews: '15',
            description: "we're looking for cleaner who is ...",
            companyThumbnail: google,
        },
    ];

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

                    {/* 회사 검색 영역 */}
                    <div className={style.filterSection}>
                        <button className={style.filterButton}>Frontend</button>
                        <button className={style.filterButton}>Backend</button>
                        <button className={style.filterButton}>DevOps</button>
                        <button className={style.filterButton}>Salary</button>
                        <button className={style.filterButton}>Location</button>
                        <button className={style.filterButton}>Visa</button>
                    </div>

                    {/* 노출 회사 영역 */}
                    <div className={style.jobListingWrapper}>
                        {jobListingsData.map((job, index) => (
                            <div key={index} className={style.jobListing}>
                                <div className={style.jobHeader}>
                                    {job.companyThumbnail && (
                                        <img
                                            src={job.companyThumbnail}
                                            alt={job.companyName}
                                            className={style.companyThumbnail}
                                        />
                                    )}
                                    <div className={style.jobInfo}>
                                        <span className={style.companyName}>{job.companyName}</span>
                                        <span className={style.jobTitle}>{job.jobTitle}</span>
                                    </div>
                                </div>
                                <div className={style.jobDetail}>
                                    <div className={style.jobContent}>
                                        <span className={style.contentsName}>Location</span>
                                        <span className={style.contentText}>{job.location}</span>
                                    </div>

                                    <div className={style.jobContent}>
                                        <span className={style.contentsName}>Salaries</span>
                                        <span className={style.contentText}>{job.salaries}</span>
                                    </div>

                                    <div className={style.jobContent}>
                                        <span className={style.contentsName}>Reviews</span>
                                        <span className={style.contentText}>{job.reviews}</span>
                                    </div>

                                    <div className={style.jobContent}>
                                        <span className={style.contentsName}>
                                            Descriptions
                                        </span>
                                        <span className={style.jobDescription}>{job.description}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}