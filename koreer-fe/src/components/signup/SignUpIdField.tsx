import style from "../../assets/scss/sub/signup.module.scss";
import {handleSaveInput} from "../../util/etcUtil";
interface Args{
    id: string;
    setId: (_: string) => void
}
export function SignUpIdField({id, setId}: Args) {
    return(
        <>
            <div className={style.content}>
                            <span className={style.contentText}>
                                ID
                            </span>
                <div className={style.contentWithButton}>
                    <input
                        placeholder={"koreer@gmail.com"}
                        className={style.contentInput}
                        onChange={(e) =>handleSaveInput(e, setId)}
                    />
                    <button className={style.checkDuplicatedButton}>
                        Duplication Check
                    </button>

                </div>
            </div>
        </>
    )
}