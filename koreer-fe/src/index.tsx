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
import { Provider } from 'react-redux';
import {store} from "./slice";
import {SignUp} from "./components/signup/SignUp";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App/>}>
                        <Route path="" element={<Main/>}/>
                        <Route path="about-us" element={<AboutUs/>}/>
                        <Route path="company-information" element={<CompanyInformation/>}/>
                        <Route path="community" element={<Community/>}/>
                        <Route path="contact" element={<Contact/>}/>
                        <Route path="signup" element={<SignUp/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
