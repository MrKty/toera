import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordConfirmPage from "./pages/ResetPasswordConfirmPage/ResetPasswordConfirmPage";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import ApplicantsList from "./pages/ApplicantsList/ApplicantsList"
import {Route, Routes} from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route exact path="/" element={<LoginPage/>}/>
            <Route exact path="/main-page" element={<MainPage/>}/>
            <Route
                exact
                path="/forgot-password-page"
                element={<ForgotPasswordPage/>}
            />
            <Route
                exact
                path="/reset-password-confirm-page"
                element={<ResetPasswordConfirmPage/>}
            />
            <Route
                exact
                path="/reset-password-page"
                element={<ResetPasswordPage/>}
            />
            <Route
                exact
                path="/settings-page"
                element={<SettingsPage/>}
            />
            <Route
                exact
                path="/applicants-list"
                element={<ApplicantsList/>}
            />

        </Routes>
    );
}

export default App;