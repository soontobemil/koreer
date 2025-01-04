import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from "./components/common/Main";
import App from "./App";
import {Community} from "./features/community/Community";
import {Contact} from "./components/contactus/Contact";
import {AboutUs} from "./components/aboutus/AboutUs";
import {CompanyInformation} from "./components/companyinformation/CompanyInformation";
import {Provider} from 'react-redux';
import {store} from "./slice";
import {SignIn} from "./features/auth/SignIn";
import {SignUp} from "./features/auth/SignUp";
import {NotFoundPage} from "./components/common/NotFoundPage";
import {Tips} from "./features/community/Tips";
import {TipsPosting} from "./features/community/TipsPosting";
import {Success} from "./components/common/Success";
import {EmploymentInfo} from "./features/employment/EmploymentInfo";
import {USAVisaInfo} from "./features/visa/USAVisaInfo";
import {CanadaVisaInfo} from "./features/visa/CanadaVisaInfo";
import {USASalaryInfo} from "./components/salary/USASalaryInfo";
import {CanadaSalaryInfo} from "./components/salary/CanadaSalaryInfo";
import {InterviewGuide} from "./features/employment/InterviewGuide";
import {USALifeInfo} from "./components/life/USALifeInfo";
import {CanadaLifeInfo} from "./components/life/CanadaLifeInfo";
import {WorkPermit} from "./features/employment/WorkPermit";
import {CommunityForm} from "./features/community/CommunityForm";
import {Seminar} from "./components/seminar/Seminar";
import {TestComponents} from './components/shared/TestComponents';
import {MembershipPage} from './features/membership/MembershipPage';

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App/>}>
                        <Route path="" element={<Main/>}/>
                        <Route path="test" element={<TestComponents/>}/>
                        <Route path="seminar-info" element={<Seminar/>}/>
                        <Route path="company-information" element={<CompanyInformation/>}/>
                        <Route path="employment-info" element={<EmploymentInfo/>}/>
                        <Route path="visa-info">
                            <Route path="usa" element={<USAVisaInfo/>}/>
                            <Route path="canada" element={<CanadaVisaInfo/>}/>
                        </Route>
                        <Route path="salary-info">
                            <Route path="usa" element={<USASalaryInfo/>}/>
                            <Route path="canada" element={<CanadaSalaryInfo/>}/>
                        </Route>
                        <Route path="life-info">
                            <Route path="usa" element={<USALifeInfo/>}/>
                            <Route path="canada" element={<CanadaLifeInfo/>}/>
                        </Route>
                        <Route path="work-permit" element={<WorkPermit/>}/>
                        <Route path="interview-guide">
                            <Route path="" element={<InterviewGuide/>}/>
                            <Route path="technical" element={<InterviewGuide/>}/>
                            <Route path="behavioral" element={<InterviewGuide/>}/>
                            <Route path="coding-test" element={<InterviewGuide/>}/>
                        </Route>
                        <Route path="community" element={<Community/>} />
                        <Route path="community/post" element={<CommunityForm />} />
                        <Route path="tips" element={<Tips/>}/>
                        <Route path="tips/posting" element={<TipsPosting/>}/>
                        <Route path="about-us" element={<AboutUs/>}/>
                        <Route path="contact" element={<Contact/>}/>
                        <Route path="signin" element={<SignIn/>}/>
                        <Route path="signup" element={<SignUp/>}/>
                        <Route path="success" element={<Success/>}/>
                        <Route path="membership" element={<MembershipPage/>}/>
                    </Route>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
