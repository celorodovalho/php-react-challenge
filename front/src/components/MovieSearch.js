import React from 'react';
import {Card, Button, Row, Col, ListGroup, ListGroupItem, Pagination, FormControl, Form} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default class Movies extends React.Component {
    constructor() {
        super();
        this.state = { movies: [], pagination: [], form: null, query: ''};
        this.onSearch = this.onSearch.bind(this);
    }
    onSearch(page) {
        axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
        axios.post('http://127.0.0.1:8000/api/movies/search/'+page, {query: this.state.query}, {
            crossDomain: true,
            withCredentials: true,
            headers: {
                // 'Content-Type': 'text/html',
                // 'Content-Type': 'multipart/form-data',
                // 'Accept': 'application/json',
                // 'Content-Type': 'x-www-form-urlencoded',
                'Accept-Language': 'en'
            }})
            .then(result=>result.json())
            .then(data => {
                let moviesList = data.results.map((movie) => {
                    const poster = movie.poster_path ? "//image.tmdb.org/t/p/w500/" + movie.poster_path : '//via.placeholder.com/500x750';
                    return (
                        <Col sm={3}>
                            <Card style={{ 'marginTop': '15px' }}>
                                <Card.Img variant="top" src={poster} />
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem><strong>Genres:</strong> {movie.genres.join(' | ')}</ListGroupItem>
                                    <ListGroupItem><strong>Release Date:</strong> {movie.release_date.replace(/-/g, '/')}</ListGroupItem>
                                </ListGroup>
                                <Card.Footer>
                                    <Link to={'movie/'+movie.id}>See details</Link>
                                </Card.Footer>
                            </Card>
                        </Col>
                    )
                });

                let pagination = [];

                for (let number = 1; number <= data.total_pages; number++) {
                    pagination.push(
                        <Pagination.Item key={number} active={number === data.page} onClick={this.onSearch.bind(this, number)}>
                            {number}
                        </Pagination.Item>,
                    );
                }

                let form = <Form inline onSubmit={this.onSearch.bind(this, data.page)}>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" value={this.state.query} onChange={this.updateInputValue}/>
                    <Button variant="outline-success">Search</Button>
                </Form>;

                this.setState({movies: moviesList, pagination: pagination, form: form});
                window.scrollTo(0, 0);
            });
    }
    updateInputValue (e) {
        this.setState({
            query: e.target.value
        });
    }
    componentDidMount() {
        this.onSearch(1);
    }
    render() {
        return (
            <Row>

                {this.state.movies}
                <Col><Pagination style={{ 'marginTop': '15px', 'justifyContent': 'center' }}>{this.state.pagination}</Pagination></Col>
            </Row>
        )
    }
}