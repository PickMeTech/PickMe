import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterComponent from "./components/RegisterPage/RegisterComponent";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import LoginComponent from "./components/LoginPage/LoginComponent";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<RegisterComponent />} />
                <Route path="/" element={<ProfilePage />} />
                <Route path="/login" element={<LoginComponent />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
