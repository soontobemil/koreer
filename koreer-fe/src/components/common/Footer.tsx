import style from "../../assets/scss/common/footer.module.scss"
import logo from "../../assets/img/koreer_logo.png"
import { useNavigate } from "react-router-dom";
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export function Footer() {
    const navigate = useNavigate()

    const handleUrl = (path: string) => {
        navigate(`${path}`)
        window.scrollBy({
            left: 0,
            top: -window.scrollY,
            behavior: "smooth",
        });
    }

    const socialLinks = [
        { icon: <LinkedIn />, url: 'https://linkedin.com' },
        { icon: <Twitter />, url: 'https://twitter.com' },
        { icon: <Facebook />, url: 'https://facebook.com' },
        { icon: <Instagram />, url: 'https://instagram.com' }
    ];

    return (
        <footer className={style.footer}>
            <div className={style.footerLine} />
            <div className={style.footerContent}>
                <div className={style.footerInfoArea}>
                    <div className={style.footerMenu}>
                        <span onClick={() => handleUrl('about-us')}>About Us</span>
                        <span onClick={() => handleUrl('contact')}>Contact</span>
                        <span onClick={() => handleUrl('signin')}>Login</span>
                        <span onClick={() => handleUrl('community')}>Community</span>
                    </div>
                    <div className={style.mainContent}>
                        <div className={style.leftContent}>
                            <span className={style.title}>
                                Koreer
                            </span>
                            <span className={style.description}>
                                Email: koreerkorea@gmail.com<br />
                                Address: Vancouver, BC, Canada<br />
                                KakaoTalk: <a href="https://open.kakao.com/o/gMhi2YJg" target="_blank" rel="noopener noreferrer">Open Chat</a>
                            </span>
                            <div className={style.socialLinks}>
                                {socialLinks.map((link, index) => (
                                    <IconButton
                                        key={index}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={style.socialIcon}
                                    >
                                        {link.icon}
                                    </IconButton>
                                ))}
                            </div>
                        </div>
                        <img className={style.footerLogo} src={logo} alt="Koreer logo" />
                    </div>
                    <div className={style.copyright}>
                        © {new Date().getFullYear()} Koreer. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}