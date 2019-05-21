import React from 'react';
import Header from './components/Header';
import Movies from './components/Movies';
import Movie from './components/Movie';
import MovieSearch from './components/MovieSearch';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <Header/>
            <Container fluid={true}>
                <Route exact path="/" component={Movies} />
                <Route path="/search" component={MovieSearch} />
                <Route path="/movie/:id" component={Movie} />
            </Container>
        </Router>
    );
}

export default App;