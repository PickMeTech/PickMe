import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterComponent from "./components/RegisterPage/RegisterComponent";
import ProfilePage from "./components/ProfilePage/ProfilePage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<RegisterComponent />} />
                <Route path="/" element={<ProfilePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
