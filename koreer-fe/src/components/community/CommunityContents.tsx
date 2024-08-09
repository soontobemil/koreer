import style from "../../assets/scss/sub/community.module.scss"

export function CommunityContents() {

    const communityContents = [
        {
            name: 'YS',
            description: '노드로 5분만에 개발부터 배포하는 방법.',
            time: '11분 전',
            nation: 'kor',
            category: '기술, 취업, 이직',
            hashTag: '#JAVA',
        },
        {
            name: 'JAY',
            description: 'How I Successfully Found a Job Abroad',
            time: '2시간 전',
            nation: 'canada',
            category: '기술, 취업, 이직',
            hashTag: '#CANADA',
        },
        {
            name: 'chhong',
            description: '캐나다에서 할 수 있는 부업 추천 top 3',
            time: '1시간 전',
            nation: 'kor',
            category: '사는 이야기',
            hashTag: '#JOB',
        },
        {
            name: 'reols',
            description: '이력서 쓰는것부터 쉽지않네요 ㅋㅋㅋ',
            time: '2시간 전',
            nation: 'usa',
            category: '사는 이야기',
            hashTag: '#MONEY',
        },
        {
            name: '문보스',
            description: '해외T.M회사에서 직원 모집합니다.월 1000+@보장!!',
            time: '4시간 전',
            nation: 'japan',
            category: '기술, 취업, 이직',
            hashTag: '',
        },
        {
            name: '자바킬러',
            description: '엔비디아가 떡락하네요',
            time: '6시간 전',
            nation: 'kor',
            category: '사는 이야기',
            hashTag: '',
        },
        {
            name: 'leenKim11',
            description: '유럽 여행기 EP2',
            time: '약 1일 전',
            nation: 'canada',
            category: '사는 이야기',
            hashTag: '',
        },
        {
            name: 'helloworld',
            description: '사이드 팀원 1분 안드로이드 개발자분 구해요ㅛ',
            time: '약 1일 전',
            nation: 'kor',
            category: '모임, 스터디',
            hashTag: '#Kotlin',
        },

    ];

    return (
        <>
            <div className={style.communityContentWrapper}>
                {/*  커뮤니티 게시글  */}
                {communityContents.map((data, index) => (
                    <div className={style.communityContent} key={index}>

                        {/*  커뮤니티 헤더 영역  */}
                        <div className={style.contentHeaderWrapper}>
                            <div className={`${style.countryImg} ${style[data.nation]}`}></div>
                            <span>{data.name}</span>|
                            <span>{data.time}</span>
                            <div className={style.modifyImg}></div>
                        </div>

                        {/*  커뮤니티 내용 영역  */}
                        <div className={style.descriptionWrapper}>
                                <span className={style.description}>
                                    {data.description}
                                </span>
                        </div>

                        {/*  커뮤니티 푸터 영역  */}
                        <div className={style.contentFooterWrapper}>
                            <div className={style.contentCategoryWrapper}>
                                    <span className={style.categoryText}>
                                        {data.category}
                                    </span>
                            </div>
                            <span className={style.text}>
                                    {data.hashTag}
                                </span>
                            <span className={style.text}>
                                    #DOCKER
                                </span>
                        </div>

                    </div>
                ))}

            </div>

        </>
    )
}