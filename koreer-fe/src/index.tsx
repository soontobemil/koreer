import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from "./components/common/Main";
import App from "./App";
import {Community} from "./components/community/Community";
import {Contact} from "./components/contactus/Contact";
import {AboutUs} from "./components/aboutus/AboutUs";
import {CompanyInformation} from "./components/companyinformation/CompanyInformation";
import {Provider} from 'react-redux';
import {store} from "./slice";
import {SignIn} from "./components/signup/SignIn";
import {SignUp} from "./components/signup/SignUp";
import {NotFoundPage} from "./components/common/NotFoundPage";
import {Tips} from "./components/community/Tips";
import {TipsPosting} from "./components/community/TipsPosting";
import {Success} from "./components/common/Success";
import {EmploymentInfo} from "./components/employment/EmploymentInfo";
import {USAVisaInfo} from "./components/visa/USAVisaInfo";
import {CanadaVisaInfo} from "./components/visa/CanadaVisaInfo";
import {USASalaryInfo} from "./components/salary/USASalaryInfo";
import {CanadaSalaryInfo} from "./components/salary/CanadaSalaryInfo";
import {InterviewGuide} from "./components/employment/InterviewGuide";
import {USALifeInfo} from "./components/life/USALifeInfo";
import {CanadaLifeInfo} from "./components/life/CanadaLifeInfo";
import {WorkPermit} from "./components/employment/WorkPermit";
import {CommunityForm} from "./components/community/CommunityForm";
import {Seminar} from "./components/seminar/Seminar";
import {CommunityDetail} from "./components/community/CommunityDetail";
import {HelmetProvider} from "react-helmet-async";
import {MyPage} from "./components/MyPage";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <HelmetProvider>
                    <Routes>
                        <Route path="/" element={<App/>}>
                            <Route path="" element={<Main/>}/>
                            <Route path="my-page" element={<MyPage/>}/>
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
                            <Route path="community">
                                <Route path="" element={<Community />} />
                                <Route path="post" element={<CommunityForm />} />
                                <Route path="detail/:id" element={<CommunityDetail />} />
                            </Route>
                            <Route path="tips" element={<Tips/>}/>
                            <Route path="tips/posting" element={<TipsPosting/>}/>
                            <Route path="about-us" element={<AboutUs/>}/>
                            <Route path="contact" element={<Contact/>}/>
                            <Route path="signin" element={<SignIn/>}/>
                            <Route path="signup" element={<SignUp/>}/>
                            <Route path="success" element={<Success/>}/>
                        </Route>
                        <Route path="*" element={<NotFoundPage/>}/>
                    </Routes>
                </HelmetProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
