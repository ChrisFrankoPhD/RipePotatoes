import Hero from "./MyHero";
import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'



const MovieView = () => {

    const {id} = useParams()
    const [movieDetails, setMovieDetails] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=fef1ffc2f924211ebb103584bb624ee4&language=en-US`)
            .then(response => response.json())
            .then(data => {
                // setTimeout(() => {
                //     setIsLoading(false)
                //     console.log(data)
                //     setMovieDetails(data)
                // }, 1000)
                setIsLoading(false)
                console.log(data)
                setMovieDetails(data)
            })
    }, [id])

    function renderTitleHero() {
        const posterURL = `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
        const altText = `movie poster for ${movieDetails.title}`
        const backdropURL = `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`

        let movieTitle = movieDetails.title
        let movieOverview = movieDetails.overview
        if(!movieDetails.title) {
            movieTitle = "Movie Not Found"
            movieOverview = "Sorry we could not find a movie with the requested ID, try searching for another movie. Or, if you entered the movie ID into the URL yourself, try a different ID number. The URL must be of format '/movie/{idnumber}' where {idnumber} is an integer value."
        }

        if(isLoading) {
            return (<Hero text="Loading..." />)
        }
        if(movieDetails) {
            return (
                <main>
                    <Hero text={movieTitle} backdropURL={backdropURL} />
                    <section className="container my-5">
                        <div className="row">
                            <div className="col-3">
                            <div className="img-container aspect-66 shadow-lg rounded">
                                {movieDetails.poster_path ? (
                                    <img className="card-image" src={posterURL} alt={altText} />
                                ) : (
                                    <p className="card-image bg-dark text-light p-3 fs-2 text-center d-flex align-items-center">{movieTitle}</p>
                                )}
                            </div>
                            </div>
                            <div className="col-9 lead">
                                <h1>{movieTitle}</h1>
                                <div className="mt-3">{movieOverview}</div>
                                {
                                    (movieDetails.title) ? (
                                        <div className="bg-dark text-light rounded p-3 d-inline-block mt-3">
                                            <div className="fw-bolder">Score: {movieDetails.vote_average}</div>
                                            <div className="fw-bolder">Votes: {movieDetails.vote_count}</div>
                                        </div>
                                    ): (
                                        <div className="bg-dark text-light rounded p-3 d-inline-block mt-3">
                                            <div className="fw-bolder">😔</div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </section>
                </main>
            )
        }
    }

    return (
        renderTitleHero()
    )
    ;
};

export default MovieView