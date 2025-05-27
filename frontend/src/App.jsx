import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterComponent from "./pages/RegisterComponent";
import ProfilePage from "./pages/ProfilePage";
import LoginComponent from "./pages/LoginComponent";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<RegisterComponent />} />
                <Route path="me" element={<ProfilePage />} />
                <Route path="/" element={<ProfilePage />} />
                <Route path="/login" element={<LoginComponent />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
