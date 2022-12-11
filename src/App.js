
import './App.css';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import {useState, useEffect} from "react";
import Map from './pages/Map';
import "leaflet/dist/leaflet.css";


function App() {

  const [name, setName] = useState('');
  const [id, setId] = useState();

    useEffect(() => {
        (
            async () => {
                const response = await fetch(`${process.env.REACT_APP_API_END_POINT}/api/user`, {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                })

                const content = await response.json();
                setName(content.name);
                setId(content.id);
            }
        )();
    })

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar name={name} setName={setName}/>
        <main> 
          <Routes>
            <Route path="/" element ={<Home name={name}/>} />
            <Route path="/login" element={<Login setName={setName}/>} />
            <Route path="/register" element={<Register/>}/>
            <Route path="/map" element={<Map id={id}/>}/> 
          </Routes>
      </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
