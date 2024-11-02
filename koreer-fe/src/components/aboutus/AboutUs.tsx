import style from "../../assets/scss/sub/aboutus.module.scss"
import hacker from "../../assets/img/hacker-cat.svg"
import man from "../../assets/img/man-technologist.svg"
import woman from "../../assets/img/woman-technologist.svg"
import mission from "../../assets/img/missions.svg"
import vision from "../../assets/img/vision.svg"
import history from "../../assets/img/history.svg"

export function AboutUs() {

    const teamMembers = [
        {
            name: "Alex Smith",
            role: "Creative Leader",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            image: hacker,
            social: {
                facebook: "#",
                twitter: "#",
                instagram: "#",
            },
        },
        {
            name: "May Brown",
            role: "Web Developer",
            description: "Sed do eiusmod tempor incididunt ut labore et dolore.",
            image: man,
            social: {
                facebook: "#",
                twitter: "#",
                instagram: "#",
            },
        },
        {
            name: "Ann Richmond",
            role: "Web Developer",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            image: woman,
            social: {
                facebook: "#",
                twitter: "#",
                instagram: "#",
            },
        },
    ];

    return(
        <>
            {/*  Our Profile  */}
            <div className={style.aboutUsContainer}>
                <h1 className={style.pageTitle}>Meet Our Team</h1>
                <div className={style.teamGrid}>
                    {teamMembers.map((member, index) => (
                        <div key={index} className={style.teamMemberCard}>
                            <img src={member.image} alt={member.name} className={style.memberImage}/>
                            <h2 className={style.memberName}>{member.name}</h2>
                            <p className={style.memberDescription}>{member.description}</p>
                            <p className={style.memberRole}>{member.role}</p>
                            <div className={style.socialLinks}>
                                <a href={member.social.facebook}><i className="fab fa-facebook"></i></a>
                                <a href={member.social.twitter}><i className="fab fa-twitter"></i></a>
                                <a href={member.social.instagram}><i className="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={style.underline}/>

            <div className={style.visionMissionSection}>
                <div className={style.item}>
                    <div className={style.iconContainer}>
                        <img src={vision} alt="Vision Icon" className={style.icon}/>
                    </div>
                    <div className={style.textContainer}>
                        <h2 className={style.title}>Our Vision</h2>
                        <p className={style.description}>
                            our vision is achieve as much money as possible and do the things what i really want to do
                            ..
                        </p>
                    </div>
                </div>

                <div className={style.lineBetween}/>

                <div className={`${style.item} ${style.rightItem}`}>
                    <div className={style.iconContainer}>
                        <img src={mission} alt="Mission Icon" className={style.icon}/>
                    </div>
                    <div className={style.textContainer}>
                        <h2 className={style.title}>Our Mission</h2>
                        <p className={style.description}>
                            To achieve our goals, we must remain steadfast in our commitment to innovation and
                            adaptability.
                            <br/>Every challenge we face is an opportunity to learn, grow, and evolve.
                            <br/>By leveraging the latest technologies and fostering a culture of collaboration, we can
                            exceed expectations and drive impactful results.
                        </p>
                    </div>
                </div>

                <div className={style.lineBetween}/>

                <div className={style.item}>
                    <div className={style.iconContainer}>
                        <img src={history} alt="history Icon" className={style.icon}/>
                    </div>
                    <div className={style.textContainer}>
                        <h2 className={style.title}>History</h2>
                        <p className={style.description}>
                            We started this application to provide seamless solutions for businesses looking to optimize their digital presence. <br />
                            Our goal is to empower companies with cutting-edge tools that simplify processes and enhance user experiences.<br />
                            By focusing on innovation and user-centric design, we aim to bridge the gap between technology and business needs.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}