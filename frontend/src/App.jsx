import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="me" element={<ProfilePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<LoginPage />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
