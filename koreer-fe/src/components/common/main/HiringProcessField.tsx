import style from "../../../assets/scss/common/main.module.scss";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export function HiringProcessField() {

    const navigate = useNavigate();
    const [isDetailHovered, setIsDetailHovered] = useState(false);
    const [isEtaHovered, setIsEtaHovered] = useState(false);


    const onClickMovePage = (value : string) =>{
        value === 'eta'? window.location.href ='https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta/apply-ko.html'
        : navigate('/hiring-detail')

    }
    const hiringProcessInformation = [
        {
            title: '1. 비자 신청 방법',
            description: 'Submitting an Application: Submit your resume and cover letter through the company\'s ' +
                'job portal, LinkedIn, or job boards. Sometimes, a portfolio or project links may also be required.',
        },
        {
            title: '2. 인터뷰 과정',
            description: 'HR and Recruiter Review: The HR team or recruiter reviews the submitted documents to check' +
                ' if the candidate meets the qualifications and has relevant experience.',
        },
        {
            title: '3. 효과적인 영어 학습',
            description: 'Phone or Video Interview: This is usually conducted by HR or a recruiter to verify basic qualifications,' +
                ' work experience, and fit with the company. It typically lasts 30 minutes to an hour.',
        },
        {
            title: '4. 한인 네트워킹 형성',
            description: 'Online Coding Test: This tests your algorithm, data structures, and problem-solving skills.' +
                ' Platforms like HackerRank, LeetCode, or Codility might be used. Take-home Assignment: You may be given ' +
                'a project to complete within a specified time frame to demonstrate your practical skills.',
        },
    ];
    return (
        <>
            <div className={style.hiringTitleWrapper}>
                <span className={style.text}>북미 취업 과정</span>
            </div>
            <div className={style.hiringProcessWrapper}>
                <div className={style.hiringProcessBodyWrapper}>
                    {hiringProcessInformation.map((wrapper, idx) => (
                        <div className={style.hiringProcessBody} key={idx}>
                            <div className={style.hiringProcessContents}>
                                <span className={style.text}>{wrapper.title}</span>
                                <span className={style.subText}>{wrapper.description}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={style.hiringSupportButtonWrapper}>
                    <button
                        type={"button"}
                        className={`${style.detailButtonWrapper} ${isDetailHovered ? style.detailButtonHoverWrapper : ''}`}
                        onMouseEnter={() => setIsDetailHovered(true)}
                        onMouseLeave={() => setIsDetailHovered(false)}
                        onClick={() =>onClickMovePage('detail')}
                    >
                        See more Detail..
                    </button>

                    <button
                    type={"button"}
                    className={`${style.detailButtonWrapper} ${isEtaHovered ? style.detailButtonHoverWrapper : ''}`}
                    onMouseEnter={() => setIsEtaHovered(true)}
                    onMouseLeave={() => setIsEtaHovered(false)}
                    onClick={() =>onClickMovePage('eta')}
                    >
                        Move to the visa application page
                    </button>


                </div>

            </div>
        </>
    );
}