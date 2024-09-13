import style from "../../assets/scss/sub/signup.module.scss";
import {useEffect, useState} from "react";

interface Args{
    nation: string;
    setNation: (_: string) => void
}
export function SignUpNationField({nation, setNation}:Args) {

    const [optionReveal, setOptionReveal] = useState(false)
    const nations = [
        {name: 'KOREA'},
        {name: 'USA'},
        {name: 'CANADA'},
        {name: 'JAPAN'},
        {name: 'CHINA'},
    ]

    const handleSelectNation = () => {
        setOptionReveal(() => !optionReveal)
    }

    const selectNation = (value:string) =>{
        setNation(value)
    }

    // 국가 체크 부분
    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    console.log(error)
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);

    useEffect(() => {
        const checkNation = () => {
            const { latitude, longitude } = location;

            const locations = [
                {
                    name: 'KOREA',
                    latRange: [33, 43],
                    lonRange: [124, 132],
                },
                {
                    name: 'USA',
                    latRange: [24, 49],  // 본토 기준
                    lonRange: [66, 172],
                },
                {
                    name: 'CANADA',
                    latRange: [42, 83],
                    lonRange: [53, 141],
                },
                {
                    name: 'JAPAN',
                    latRange: [20, 45],
                    lonRange: [122, 153],
                },
                {
                    name: 'CHINA',
                    latRange: [18, 53],
                    lonRange: [73, 123],
                }
            ];

            for (const loc of locations) {
                if (
                    latitude >= loc.latRange[0] && latitude <= loc.latRange[1] &&
                    longitude >= loc.lonRange[0] && longitude <= loc.lonRange[1]
                ) {
                    setNation(loc.name);
                    break;
                }
            }
        };

        if (location.latitude && location.longitude) {
            checkNation();
        }
    }, [location, nation, optionReveal]);

    return (
        <>
            <div className={style.content}>
                <span className={style.contentText}>
                    Select your nation
                </span>
                <div className={style.contentWithNation}>
                    <div className={style.nationWrapper} onClick={handleSelectNation}>
                        <span className={style.nationText}>
                            {nation}
                        </span>
                        <div className={style.selectButton}>
                            {optionReveal && (
                                <div className={style.selectOptionsWrapper}>
                                    {nations.map((data, idx) => (
                                        <div className={`${style.options} ${data.name === nation ? style.selected : ''}`} key={idx}
                                        onClick={() =>selectNation(data.name)}>
                                            {data.name}
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}