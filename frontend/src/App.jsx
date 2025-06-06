import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import "bootstrap/dist/css/bootstrap.min.css";
import MainPage from "@/pages/MainPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/me" element={<ProfilePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/logout" element={<LogoutPage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/" element={<MainPage />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
