import Header2 from "../components/Header/Header2";
import Banner2 from "../components/Banner/Banner2";
import RecruitmentMethod from "../components/EecruitmentMethod/RecruitmentMethod"
import HotMajor from "../components/HotMajors/HotMajor"
import Reason from "../components/Reasons/Reason"
import Schoolarship from "../components/Schoolarship/Schoolarship"
import StudentFee from "../components/StudentFee/StudentFee"
import Footer from "../components/Footer/Footer"
import ScrollToTopButton from "../components/ScrollToTopButton/ScrollToTopButton"
const ConsultantPage = () => {
    return (
        <div >
            <Header2 />
            <Banner2 />
            <Reason />
            <HotMajor />
            <Schoolarship />
            <StudentFee />
            <RecruitmentMethod />
            <Footer />
            <ScrollToTopButton />
        </div>
    );
}

export default ConsultantPage;