import style from "../../assets/scss/common/footer.module.scss"
import logo from "../../assets/img/koreer_logo.png"
import {useNavigate} from "react-router-dom";

export function Footer() {
    const navigate = useNavigate()

    const handleUrl = (path:string) => {
        navigate(`${path}`)
        window.scrollBy({
            left: 0,
            top: -window.scrollY,
            behavior: "smooth",
        });
    }
    return (
        <>
            <div className={style.footerLine}/>
            <div className={style.footer}>
                <div className={style.footerInfoArea}>
                    <div className={style.footerMenu}>
                        <span onClick={()=>handleUrl('about-us')}>About us</span>
                        <span onClick={()=>handleUrl('contact')}>Contact</span>
                        <span onClick={()=>handleUrl('signin')}>Login</span>
                    </div>
                    <span className={style.title}>
                        Koreer
                    </span>
                    <span className={style.description}>
                        Contact: koreerkorea@gmail.com <br/>
                        address: somewhere 11 Any. 142-9 <br />
                        open Chatting URL: https://open.kakao.com/o/gMhi2YJg
                    </span>
                </div>
                <img className={style.footerLogo} src={logo} alt={"logo"}/>
            </div>
        </>
    );
}