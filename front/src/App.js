import React from 'react';
import Header from './components/Header';
import Movies from './components/Movies';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <Header/>
            <Container fluid={true}>
                <Route exact path="/" component={Movies} />
            </Container>
        </Router>
    );
}

export default App;