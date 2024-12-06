import style from "../../assets/scss/common/main.module.scss";
import { ListItems } from "./main/ListItems";
import { HiringProcessField } from "./main/HiringProcessField";
import { CompanyInformationField } from "./main/CompanyInformationField";
import { TopButton } from "./TopButton";
import { motion } from "framer-motion";

export default function Main() {
    return (
        <motion.div 
            className={style.mainContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Hero Section */}
            <CompanyInformationField />

            <div className={style.underLine} />

            {/* Hiring Process Section */}
            <HiringProcessField />

            <div className={style.underLine} />

            {/* Community Section */}
            <div className={style.mainCommunityWrapper}>
                <motion.div 
                    className={style.communityTitleWrapper}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className={style.titleTop}>TODAY HOT ARTICLE</div>
                    <div className={style.titleMain}>커뮤니티 인기 게시글 TOP 3</div>
                </motion.div>

                <ListItems />
            </div>

            <TopButton />
        </motion.div>
    );
}
