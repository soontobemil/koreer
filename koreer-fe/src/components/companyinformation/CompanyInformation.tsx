import style from "../../assets/scss/sub/companyInformation.module.scss"
import {useCompanyInformationGetter} from "./hooks/useCompanyInformationGetter";
import {useEffect, useState} from "react";
import {CompanyInformationDTO} from "../../types/companyInformation";
import {Modal} from "../common/Modal";

export function CompanyInformation() {

    const [revealModal, setRevealModal] = useState<CompanyInformationDTO>();
    const {getCompanyInfo, companyInformation} = useCompanyInformationGetter();
    useEffect(() => {
        getCompanyInfo().then();
        // eslint-disable-next-line
    }, []);

    const handleOpenDetailModal = (job: CompanyInformationDTO) =>{
        setRevealModal(job)
    }


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
                        {companyInformation && companyInformation.map((job, index) => (
                            <div key={index} className={style.jobListing}
                            onClick={() =>handleOpenDetailModal(job)}>
                                <div className={style.jobHeader}>
                                    {/*  썸네일 임시 주석  */}
                                    {/*{job.companyThumbnail && (*/}
                                    {/*    <img*/}
                                    {/*        src={job.companyThumbnail}*/}
                                    {/*        alt={job.companyName}*/}
                                    {/*        className={style.companyThumbnail}*/}
                                    {/*    />*/}
                                    {/*)}*/}
                                    <div className={style.jobInfo}>
                                        <span className={style.companyName}>{job.company_name}</span>
                                        <span className={style.jobTitle}>{job.job_title}</span>
                                    </div>
                                </div>
                                <div className={style.jobDetail}>
                                    <div className={style.jobContent}>
                                        <span className={style.contentsName}>Location</span>
                                        <span className={style.contentText}>{job.location}</span>
                                    </div>

                                    <div className={style.jobContent}>
                                        <span className={style.contentsName}>Salaries</span>
                                        <span className={style.contentText}>{job.salary}</span>
                                    </div>

                                    {/*<div className={style.jobContent}>*/}
                                    {/*    <span className={style.contentsName}>Reviews</span>*/}
                                    {/*    <span className={style.contentText}>{job.job_title}</span>*/}
                                    {/*</div>*/}

                                    <div className={style.jobContent}>
                                        <span className={style.contentsName}>
                                            Descriptions
                                        </span>
                                        <span className={style.jobDescription}>{job.job_description}</span>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
            {revealModal?.id && (
                <Modal companyInformation={revealModal}
                       setRevealModal={setRevealModal}
                />
            )}
        </>
    )
}