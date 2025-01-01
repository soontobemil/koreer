import style from "../../assets/scss/sub/seminar.module.scss"
export function Seminar() {

    const applySeminar = () =>{
        window.open("https://docs.google.com/forms/d/1s8KW2xbS1wNg1ywRMaOBBDo6tMbMjGm-zQSwGyr-1Jc/edit")
    }

    const seminarData = [
        {
            title: "기술 인터뷰 완벽 준비",
            description: "기술 인터뷰에서 자주 묻는 질문과 모범 답안을 소개합니다.",
            currentParticipants: 11,
            maxCapacity: 20
        },
        {
            title: "H-1B 비자 프로세스 안내",
            description: "H-1B 비자를 성공적으로 준비하기 위한 가이드를 제공합니다.",
            currentParticipants: 15,
            maxCapacity: 25
        },
        {
            title: "미국 현지 문화와 비즈니스 매너",
            description: "현지 문화 적응과 비즈니스 에티켓에 대해 배울 수 있습니다.",
            currentParticipants: 8,
            maxCapacity: 15
        },
        {
            title: "이력서 및 커버레터 작성 팁",
            description: "해외 취업을 위한 효과적인 이력서 작성법을 공유합니다.",
            currentParticipants: 18,
            maxCapacity: 30
        }
    ];

    return (
        <>
            <div className={style.seminarInfo}>
                <div className={style.header}>
                    <h1 className={style.title}>해외 취업 세미나 정보</h1>
                    <p className={style.description}>해외 취업에 필요한 정보를 제공하는 다양한 세미나를 확인하고 참여하세요.</p>
                </div>

                <div className={style.categorySection}>
                    <h2 className={style.categoryTitle}>세미나 카테고리</h2>
                    <ul className={style.categoryList}>
                        <li className={style.categoryItem}>기술 인터뷰 대비</li>
                        <li className={style.categoryItem}>비자 준비 과정</li>
                        <li className={style.categoryItem}>현지 문화 이해</li>
                        <li className={style.categoryItem}>커리어 상담</li>
                    </ul>
                </div>

                <div className={style.seminarList}>
                    <h2 className={style.listTitle}>진행 중인 세미나</h2>

                    {seminarData.map((seminar, index) => (
                        <div key={index} className={style.seminarCard}>
                            <h3 className={style.seminarTitle}>{seminar.title}</h3>
                            <p className={style.seminarDescription}>{seminar.description}</p>
                            <div className={style.cardFooter}>
                                <button
                                    className={style.applyButton}
                                    onClick={applySeminar}
                                >
                                    신청하기
                                </button>
                                <span className={style.capacity}>
                                    정원 : ({seminar.currentParticipants}/{seminar.maxCapacity})
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}