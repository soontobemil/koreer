
export const handleSaveInput = (e:any, setValue: (_: string) => void) =>{
    const input = e.target.value;
    setValue(input)
}

export const timeAgo = (timestamp:string)  =>{
    // 문자열로 주어진 타임스탬프를 Date 객체로 변환
    const past: Date = new Date(timestamp);
    const now: Date = new Date();

    // 두 날짜의 차이를 초 단위로 계산
    const diffInSeconds: number = Math.floor((now.getTime() - past.getTime()) / 1000);

    // 초, 분, 시간, 일 단위로 변환 기준
    const secondsInMinute: number = 60;
    const secondsInHour: number = 3600;
    const secondsInDay: number = 86400;

    // 시간 차이를 기준으로 적절한 포맷 반환
    if (diffInSeconds < secondsInMinute) {
        return `${diffInSeconds}초 전`;
    } else if (diffInSeconds < secondsInHour) {
        const minutes: number = Math.floor(diffInSeconds / secondsInMinute);
        return `${minutes}분 전`;
    } else if (diffInSeconds < secondsInDay) {
        const hours: number = Math.floor(diffInSeconds / secondsInHour);
        return `${hours}시간 전`;
    } else {
        const days: number = Math.floor(diffInSeconds / secondsInDay);
        return `${days}일 전`;
    }
}

export const convertTipCategory = (tip: string) => {
    switch (tip) {
        case 'info':
            return '해외 취업 정보';
        case 'daily':
            return '생활';
        case 'news':
            return '개발 기술, 최신 뉴스';
        default:
            return "전체"
    }

};