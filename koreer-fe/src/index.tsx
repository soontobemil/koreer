import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {store} from './store';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Main from "./components/common/Main";
import {Seminar} from './components/seminar/Seminar';
import {CompanyInformation} from './features/company/CompanyInformation';
import {EmploymentInfo} from './features/employment/EmploymentInfo';
import {USAVisaInfo} from './features/visa/USAVisaInfo';
import {CanadaVisaInfo} from './features/visa/CanadaVisaInfo';
import {Success} from './components/common/Success';
import {NotFoundPage} from './components/common/NotFoundPage';
import {TestComponents} from './components/shared/TestComponents';
import {MembershipPage} from './features/membership/MembershipPage';
import {Community} from './features/community/Community';
import {CommunityForm} from './features/community/CommunityForm';
import {Tips} from './features/community/Tips';
import {TipsPosting} from './features/community/TipsPosting';
import {AboutUs} from './components/aboutus/AboutUs';
import {Contact} from './components/contactus/Contact';
import {SignIn} from './features/auth/SignIn';
import {SignUp} from './features/auth/SignUp';
import {InterviewGuide} from './features/employment/InterviewGuide';
import {WorkPermit} from './features/employment/WorkPermit';
import {USASalaryInfo} from './components/salary/USASalaryInfo';
import {CanadaSalaryInfo} from './components/salary/CanadaSalaryInfo';
import {USALifeInfo} from './components/life/USALifeInfo';
import {CanadaLifeInfo} from './components/life/CanadaLifeInfo';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element: <Main />
      },
      {
        path: "test",
        element: <TestComponents />
      },
      {
        path: "seminar-info",
        element: <Seminar />
      },
      {
        path: "company-information",
        element: <CompanyInformation />
      },
      {
        path: "employment-info",
        element: <EmploymentInfo />
      },
      {
        path: "visa-info/usa",
        element: <USAVisaInfo />
      },
      {
        path: "visa-info/canada",
        element: <CanadaVisaInfo />
      },
      {
        path: "salary-info/usa",
        element: <USASalaryInfo />
      },
      {
        path: "salary-info/canada",
        element: <CanadaSalaryInfo />
      },
      {
        path: "life-info/usa",
        element: <USALifeInfo />
      },
      {
        path: "life-info/canada",
        element: <CanadaLifeInfo />
      },
      {
        path: "work-permit",
        element: <WorkPermit />
      },
      {
        path: "interview-guide",
        element: <InterviewGuide />
      },
      {
        path: "interview-guide/technical",
        element: <InterviewGuide />
      },
      {
        path: "interview-guide/behavioral",
        element: <InterviewGuide />
      },
      {
        path: "interview-guide/coding-test",
        element: <InterviewGuide />
      },
      {
        path: "community",
        element: <Community />
      },
      {
        path: "community/post",
        element: <CommunityForm />
      },
      {
        path: "tips",
        element: <Tips />
      },
      {
        path: "tips/posting",
        element: <TipsPosting />
      },
      {
        path: "about-us",
        element: <AboutUs />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "signin",
        element: <SignIn />
      },
      {
        path: "signup",
        element: <SignUp />
      },
      {
        path: "success",
        element: <Success />
      },
      {
        path: "membership",
        element: <MembershipPage />
      }
    ]
  }
]);

const root = createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
