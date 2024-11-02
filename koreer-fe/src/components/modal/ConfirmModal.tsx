import style from "../../assets/scss/sub/modal.module.scss";

interface Args{
    modalClose: (_: any) => void
}
export function ConfirmModal({modalClose}:Args) {

    const handleModalClose = () =>{
        modalClose((prev: boolean) => !prev);
        window.location.href = '/'
    }
    return(
        <>
            <div className={style.confirmBackdrop}>
                <div className={style.modalWrapper}>
                    <div className={style.textArea}>
                        <span className={style.title}>Information</span>
                        <span className={style.description}>Sign up success.<br/>Please verify your email.</span>
                    </div>

                    <div className={style.buttonArea}>
                        <button className={style.confirm}
                                onClick={handleModalClose}
                        >Confirm</button>
                    </div>
                </div>
            </div>
        </>
    )
}