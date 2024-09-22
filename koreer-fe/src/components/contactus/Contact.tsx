import style from "../../assets/scss/sub/contactus.module.scss"
enum OptionType {
    SALES = "SALES",
    SUPPORT = "SUPPORT",
    MEDIA = "MEDIA",
}
export function Contact() {

    const handleContact = (type: OptionType) => {
        alert(type+'는 준비중입니다.')
    }

    // @ts-ignore
    const OptionBox = ({ iconClass, title, description, linkText, optionType }) => (
        <div className={style.optionBox}>
            <div className={style.iconPlaceholder}>
                <div className={`${style.iconImg} ${iconClass}`}/>
            </div>
            <h2 className={style.optionTitle}>{title}</h2>
            <p className={style.optionDescription}>{description}</p>
            <span className={style.optionLink}
            onClick={() =>handleContact(optionType)}>{linkText} →</span>
        </div>
    );
    return (
        <>
            {/*  Contact Container  */}
            <div className={style.contactContainer}>
                <h1 className={style.contactTitle}>Contact us</h1>
                <p className={style.contactDescription}>
                    Get in touch and let us know how we can help.
                </p>
                <div className={style.contactOptions}>

                    <OptionBox
                        optionType={OptionType.SALES}
                        iconClass={style.sales}
                        title="Sales"
                        description="We'd love to talk about how we can work together."
                        linkText="Contact sales"
                    />
                    <OptionBox
                        optionType={OptionType.SUPPORT}
                        iconClass={style.support}
                        title="Help & Support"
                        description="We're here to help with any questions or code."
                        linkText="Get support"
                    />
                    <OptionBox
                        optionType={OptionType.MEDIA}
                        iconClass={style.media}
                        title="Media & Press"
                        description="Get news, company info, and media resources."
                        linkText="Visit Our Channel"
                    />
                </div>
            </div>
            <div className={style.underline}/>

            {/* Contact Info Section */}
            <div className={style.contactInfo}>
                <h2 className={style.contactInfoTitle}>Contact Info</h2>
                <div className={style.contactInfoContent}>
                    <div className={style.infoBlock}>
                        <div className={`${style.infoImg} ${style.email}`}/>
                        <p>koreerkorea@gmail.com</p>
                    </div>
                    <div className={style.infoBlock}>
                        <div className={`${style.infoImg} ${style.kakao}`}/>
                        <p>https://open.kakao.com/o/gMhi2YJg</p>
                    </div>
                </div>
            </div>

            <div className={style.underline}/>

            {/* Contact form */}
            <div className={style.contactFormWrapper}>
                <div className={style.contactForm}>
                    <h2 className={style.formTitle}>Having any problems?</h2>
                    <form className={style.formWrapper}>
                        <label className={style.formLabel}>Full name</label>
                        <input className={style.formInput} type="text" placeholder="Enter your full name"/>

                        <label className={style.formLabel}>Email</label>
                        <input className={style.formInput} type="email" placeholder="Enter your email"/>

                        <label className={style.formLabel}>Comment</label>
                        <textarea className={style.formTextarea} placeholder="Enter your comment"
                                  maxLength={2000}></textarea>

                        <button className={style.formButton} type="submit">Send</button>
                    </form>
                </div>
            </div>
        </>
    );
}