import style from "../../assets/scss/sub/signup.module.scss";
import {useState} from "react";

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