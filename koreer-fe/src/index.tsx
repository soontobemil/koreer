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
import {Success} from './components/common/Success';
import {NotFoundPage} from './components/common/NotFoundPage';
import {TestComponents} from './components/shared/TestComponents';
import {MembershipPage} from './features/membership/MembershipPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
        path: "success",
        element: <Success />
      },
      {
        path: "membership",
        element: <MembershipPage />
      }
    ]
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
]);

// Add scroll to top on route change
router.subscribe(() => {
  window.scrollTo(0, 0);
});

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
