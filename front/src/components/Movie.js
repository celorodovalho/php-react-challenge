import React from 'react';
import {Row, Col, ListGroup} from 'react-bootstrap';
import http from '../plugins/http';

/**
 * Component class to show the movie details
 */
export default class Movie extends React.Component {
    constructor({match}) {
        super();
        this.state = {movie: [], id: match.params.id};
    }

    /**
     * Method to convert minutes in hours/minutes
     *
     * @param num
     * @returns {string}
     */
    convertTime(num) {
        const hours = (num / 60),
            rhours = Math.floor(hours),
            minutes = (hours - rhours) * 60,
            rminutes = Math.round(minutes);
        return rhours + "h " + rminutes + "m";
    }

    componentDidMount() {
        http.get(`movies/show/${this.state.id}`)
            .then(result => result.data)
            .then(movie => {
                const poster = movie.poster_path ? `//image.tmdb.org/t/p/w500/${movie.poster_path}` : '//via.placeholder.com/500x750';
                const mv = (
                    <>
                        <Col sm={3}>
                            <img src={poster} alt="" className="img-fluid"/>
                        </Col>
                        <Col sm={9}>
                            <h3>{movie.title}</h3>
                            <div className="genres">
                                <strong>Genres:</strong> {movie.genres.map(item => item.name).join(' | ')}
                            </div>
                            <div className="rating">
                                <strong>Rating:</strong> {movie.vote_average}/10
                            </div>
                            <div className="release_date">
                                <strong>Release Date:</strong> {movie.release_date.replace(/-/g, '/')}
                            </div>
                            <div className="runtime">
                                <strong>Runtime:</strong> {this.convertTime(movie.runtime)}
                            </div>
                            <div className="spoken_languages">
                                <strong>Languages:</strong> {movie.spoken_languages.map(item => item.name).join(' | ')}
                            </div>
                            <div className="overview">
                                <p>{movie.overview}</p>
                            </div>
                            <ListGroup as="ul">
                                {movie.credits.cast.map(cast => {
                                    return <ListGroup.Item as="li">
                                        <img src={`//image.tmdb.org/t/p/w200${cast.profile_path}`} alt=""
                                             style={{width: 45, marginRight: 10}}/>
                                        <span>{cast.name} as <strong>{cast.character}</strong></span>
                                    </ListGroup.Item>;
                                })}
                            </ListGroup>
                        </Col>
                    </>
                );

                this.setState({movie: mv});
            });
    }

    render() {
        return (
            <Row style={{'marginTop': '15px'}}>
                {this.state.movie}
            </Row>
        )
    }
}