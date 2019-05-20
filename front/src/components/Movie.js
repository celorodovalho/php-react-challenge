import React from 'react';
import { Card, Button, Row, Col, ListGroup, ListGroupItem, Pagination } from 'react-bootstrap';

export default class Movie extends React.Component {
    constructor() {
        super();
        this.state = { movies: [], pagination: [] };
        this.onPageChange = this.onPageChange.bind(this);
    }
    onPageChange(page) {
        fetch('http://127.0.0.1:8000/api/movies/upcoming/'+page)
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
                                    <Button variant="primary">See details</Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    )
                });

                let pagination = [];

                for (let number = 1; number <= data.total_pages; number++) {
                    pagination.push(
                        <Pagination.Item key={number} active={number === data.page} onClick={this.onPageChange.bind(this, number)}>
                            {number}
                        </Pagination.Item>,
                    );
                }

                this.setState({movies: moviesList, pagination: pagination});
                window.scrollTo(0, 0);
            });
    }
    componentDidMount() {
        this.onPageChange(1);
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