import { Route, Routes } from "react-router";
import { useState } from "react";

import Navbar from './components/Navbar.jsx'
import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import NoteDetailPage from "./pages/NoteDetailPage.jsx";


function App() {
    const [mode, setMode] = useState('light')
    
    const toggleMode = () => {
        if (mode==='light') {
            setMode('dark')
        } else {
            setMode('light')
        }
    }

    let myBgColor
    if (mode==="light") {
        myBgColor = "#f8f9fa";
        document.body.style.backgroundColor = "#f8f9fa";
    } else {
        myBgColor = "#343a40";
        document.body.style.backgroundColor = "#343a40";
    }

    return (
        <div className="position-relative w-100 h-100">
            <div
                className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center px-3 py-5"
                style={{zIndex: -1, backgroundColor: myBgColor}}
            />
            <Navbar mode={mode} toggleMode={toggleMode}/>
            <Routes>
                <Route path="/" element={<HomePage mode={mode} toggleMode={toggleMode}/>} />
                <Route path="/create" element={<CreatePage mode={mode}/>} />
                <Route path="/note/:id" element={<NoteDetailPage mode={mode}/>} />
            </Routes>
            </div>
    );
}

export default App;
