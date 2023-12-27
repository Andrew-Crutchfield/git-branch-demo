import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

import HomePage from './components/HomePage';
import ChirpDetails from './components/ChirpDetails';
import AdminPanel from './components/AdminPanel';
import ComposeChirp from './components/ComposeChirp';
import UserMentions from './components/UserMentions';
import { Chirp } from './types'; 

interface AppProps {}

const App = (props: AppProps) => {
    const [chirps, setChirps] = useState<Chirp[]>([]);

    useEffect(() => {
        console.log('Fetching chirps...');
        fetch('http://localhost:3000/chirps')
            .then(res => res.json())
            .then(data => {
                console.log('Chirps fetched:', data);
                setChirps(data);
            })
            .catch(e => console.error('[fetch error]', e));
    }, []);

    return (
        <BrowserRouter>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Chirper</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                            <Nav.Link as={NavLink} to="/compose">Compose Chirp</Nav.Link>
                            <Nav.Link as={NavLink} to="/admin">Admin Panel</Nav.Link>
                            <Nav.Link as={NavLink} to="/mentions">User Mentions</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="mt-5">
                <Routes>
                    <Route path="/" element={<HomePage chirps={chirps} />} />
                    <Route path="/chirp/:id" element={<ChirpDetails />} />
                    <Route path="/compose" element={<ComposeChirp />} />
                    <Route path="/admin" element={<AdminPanel />} />
                    <Route path="/mentions" element={<UserMentions />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
};

export default App;