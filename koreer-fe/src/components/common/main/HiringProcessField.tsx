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
            description: '비자를 신청하는 방법은 다음과 같습니다. 1. ....',
        },
        {
            title: '2. 인터뷰 과정',
            description: '북미 시장에서는 인터뷰 절차를 여러 단계 준비하는것이 중요합니다. 이를테면 기술인텨뷰 같은\n' +
                '경우에는 단순한 프로젝트에 대한 내용 보다는...',
        },
        {
            title: '3. 효과적인 영어 학습',
            description: '의사소통을 하는 과정에서 순조로운 영어 회화 실력은 필수입니다. \n' +
                '회화나 영어 실력 향상을 위한 학습 방법은 다양하게 있는데요. 예를 들어 ...',
        },
        {
            title: '4. 한인 네트워킹 형성',
            description: '해외에서 한인들의 커뮤니티를 통해 다양한 정보들과 지역에 대한 최신 정보들을 \n' +
                '여러 방면으로 얻을 수 있기 때문에, 네트워킹을 형성하는것은 매우 중요합니다. 그래서 아래와 같은 \n' +
                '경로로 네트워킹을 알아볼 수 있습니다. \n1. ...',
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