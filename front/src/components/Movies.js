import React from 'react';
import {Card, Row, Col, ListGroup, ListGroupItem, Pagination, Form, FormControl, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import qs from 'qs';
import http from '../plugins/http';

/**
 * Component class to provide a movies list
 */
export default class Movies extends React.Component {
    constructor() {
        super();
        this.state = {movies: [], pagination: [], form: null, query: ''};

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Retrieves the upcoming movies when no one search was made
     *
     * @param page
     */
    search(page) {
        http.post(`movies/search/${page}`, this.state.query ? qs.stringify({query: this.state.query}) : null)
            .then(result => result.data)
            .then(data => {
                let moviesList = data.results.map((movie) => {
                    const poster = movie.poster_path ? `//image.tmdb.org/t/p/w500/${movie.poster_path}` : '//via.placeholder.com/500x750';
                    return (
                        <Col sm={3}>
                            <Card style={{'marginTop': '15px'}}>
                                <Card.Img variant="top" src={poster}/>
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem><strong>Genres:</strong> {movie.genres.join(' | ')}</ListGroupItem>
                                    <ListGroupItem><strong>Release
                                        Date:</strong> {movie.release_date.replace(/-/g, '/')}</ListGroupItem>
                                </ListGroup>
                                <Card.Footer>
                                    <Link to={'movie/' + movie.id}>See details</Link>
                                </Card.Footer>
                            </Card>
                        </Col>
                    )
                });

                let pagination = [];

                for (let number = 1; number <= data.total_pages; number++) {
                    pagination.push(
                        <Pagination.Item key={number} active={number === data.page}
                                         onClick={this.handlePageChange.bind(this, number)}>
                            {number}
                        </Pagination.Item>,
                    );
                }

                let form = <Form inline onSubmit={this.handleSubmit.bind(this, data.page)}>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2"
                                 onChange={this.handleInputChange}/>
                    <Button type="submit" variant="outline-success">Search</Button>
                </Form>;

                this.setState({movies: moviesList, pagination: pagination, form: form});
                window.scrollTo(0, 0);
            });
    }

    handleSubmit(page, e) {
        e.preventDefault();
        this.search(page);
    }

    handlePageChange(page) {
        this.search(page);
    }

    handleInputChange(e) {
        this.setState({
            query: e.target.value
        });
    }

    componentDidMount() {
        this.search(1);
    }

    render() {
        return (
            <>
                <Row>
                    <Col style={{'marginTop': '15px'}}>{this.state.form}</Col>
                </Row>
                <Row>
                    {this.state.movies}

                </Row>
                <Row>
                    <Col><Pagination style={{
                        'marginTop': '15px',
                        'justifyContent': 'center'
                    }}>{this.state.pagination}</Pagination></Col>
                </Row>
            </>
        )
    }
}