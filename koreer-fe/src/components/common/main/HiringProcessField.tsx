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
            title: '1. Application',
            description: 'Submitting an Application: Submit your resume and cover letter through the company\'s ' +
                'job portal, LinkedIn, or job boards. Sometimes, a portfolio or project links may also be required.',
        },
        {
            title: '2. Resume Screening',
            description: 'HR and Recruiter Review: The HR team or recruiter reviews the submitted documents to check' +
                ' if the candidate meets the qualifications and has relevant experience.',
        },
        {
            title: '3. Initial Interview',
            description: 'Phone or Video Interview: This is usually conducted by HR or a recruiter to verify basic qualifications,' +
                ' work experience, and fit with the company. It typically lasts 30 minutes to an hour.',
        },
        {
            title: '4. Technical Assessment',
            description: 'Online Coding Test: This tests your algorithm, data structures, and problem-solving skills.' +
                ' Platforms like HackerRank, LeetCode, or Codility might be used. Take-home Assignment: You may be given ' +
                'a project to complete within a specified time frame to demonstrate your practical skills.',
        },
        {
            title: '5. Technical Interview',
            description: 'In-depth Technical Interview: Usually consists of multiple rounds, each lasting about 45 minutes' +
                ' to an hour.',
        },
        {
            title: '6. Behavioral and Cultural Fit Interview',
            description: 'Behavioral Interview: Uses the STAR (Situation, Task, Action, Result) method to ask about past experiences.' +
                ' Evaluates teamwork, conflict resolution, leadership, etc. Cultural Fit Interview: Assesses whether the candidate\'s ' +
                'values align with the company\'s culture.',
        },
    ];
    return (
        <>
            <div className={style.hiringProcessWrapper}>
                <div className={style.hiringTitleWrapper}>
                    <span className={style.text}>Hiring Process in North America</span>
                </div>
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