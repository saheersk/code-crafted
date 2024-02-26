import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/Login";
import Otp from "./pages/auth/Otp";
import SignUserUp from "./pages/auth/SignUserUp";
import Home from "./pages/home/Home";
import SignHrUp from "./pages/auth/SignHrUp";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import UserManagement from "./pages/admin/UserManagement";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-up/user" element={<SignUserUp />} />
                <Route path="/sign-up/hr" element={<SignHrUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/otp/:id" element={<Otp />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/edit" element={<EditProfile />} />
                <Route path="/admin" element={<UserManagement />} />
            </Routes>
        </>
    );
}

export default App;
