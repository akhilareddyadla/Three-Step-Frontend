import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignUp from './components/signup';
import LoginPage from './components/login';
import ProfilePage from './components/ProfilePage';
import PatternValidation from './components/Pattern_Verification';
// import FacialRecognition from './components/Facial_Validation';
import Navbar from './components/Navbar';
import Home from './components/Home';
import PatternRecognition from './components/Pattern_Recognition';
import FacialCapture from './components/Facial_Capture';

function App() {
    return (
        <Router>
            <Navbar /> {/* Navbar should be outside of Routes */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/first_level" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/second_level" element={<PatternValidation />} />
                <Route path="/third_level" element={<FacialCapture />} />
                <Route path="/Pattern_Recognition" element={<PatternRecognition />} />
            </Routes>
        </Router>
    );
}

export default App;
