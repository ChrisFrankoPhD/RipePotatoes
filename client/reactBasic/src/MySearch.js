import { Link } from "react-router-dom";
import Hero from "./MyHero";
import {useState} from 'react'

const MovieModal = ({ movieObj }) => {
  const modalID = `modal-${movieObj.id}`
  const altText = `movie poster for ${movieObj.title}`
  const posterURL = `https://image.tmdb.org/t/p/w500/${movieObj.poster_path}`
  let movieTitle = movieObj.title
    let movieOverview = movieObj.overview
    if(!movieObj.title) {
        movieTitle = "Movie Not Found"
        movieOverview = "Sorry we could not find a movie with the requested ID, try searching for another movie. Or, if you entered the movie ID into the URL yourself, try a different ID number. The URL must be of format '/movie/{idnumber}' where {idnumber} is an integer value."
    }

  return (
    <dialog id={modalID} className="w-60 movie-modal shadow-lg p-0">
      <div className="row w-100 m-0">
        <div className="col-4 py-3 px-3">
          <div className="img-container aspect-66 shadow-lg rounded">
              {movieObj.poster_path ? (
                  <img className="card-image" src={posterURL} alt={altText} />
              ) : (
                  <p className="card-image bg-dark text-light p-3 fs-2 text-center d-flex align-items-center">{movieTitle}</p>
              )}
          </div>
          </div>
          <div className="col-8 lead py-3 px-3">
              <h1>{movieTitle}</h1>
              <div className="mt-3">{movieOverview}</div>
              <div className="d-flex flex-row justify-content-between">
                {
                  (movieObj.title) ? (
                      <div className="bg-dark text-light rounded p-3 d-inline-block mt-3">
                          <div className="fw-bolder">Score: {movieObj.vote_average}</div>
                          <div className="fw-bolder">Votes: {movieObj.vote_count}</div>
                      </div>
                  ): (
                      <div className="bg-dark text-light rounded p-3 d-inline-block mt-3">
                          <div className="fw-bolder">😔</div>
                      </div>
                  )
                }
                <button className="close py-1 px-2 align-self-end">close</button>
              </div>
          </div>
      </div>
    </dialog>
  )
}

const MovieCard = ({movieObj}) => {
  let [clickCount, incrementClickCount] = useState(0)
  let [modalHTML, setModalHTML] = useState('')

  const posterURL = `https://image.tmdb.org/t/p/w500/${movieObj.poster_path}`
  const altText = `movie poster for ${movieObj.title}`
  const movieViewPath = `/movie/${movieObj.id}`

  async function renderMovieModal(movieObj) {
    // initialize backdrop URL strings needed to call for backdrop photo when adding a CSS rule below
    const backdropURL = `https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`
    const backdropImageValue = `url(${backdropURL})`
    incrementClickCount(clickCount + 1)
    const modalKey = `${movieObj.id}${clickCount}`
    console.log('renderMovieModal activated')

    // update the modalHTML state to be a MovieModal component that is made in the background using the current cards movie object, we want this to be created on click, or else we would have to create a ton of hidden modal components in the HTML for every search result, this way we only build the one actually being viewed
    await setModalHTML(<MovieModal movieObj={movieObj} key={modalKey}/>)
    let modal = document.getElementById(`modal-${movieObj.id}`)

    // call showModal() on the modal that was just made, this changes the display to visible, and provides a pseudo "::backdrop" element that covers the rest of the page to give the modal focus, we then add the CSS class ".modal-open" to the body element, which has the declaration "overflow: hidden;", this stops the body from scrolling when the modal is open
    modal.showModal()
    document.querySelector('body').classList.add('modal-open')

    // this one was complicated to figure out, we want the created ::backdrop pseudo element to have the backdrop image from the API as the background image, but we cannot use JS to select for the ::backdrop pseudo element using query selector or something similar, even if we use a setTimeOut to ensure we waited long enough for it to be created, therefore we instead can just add a CSS rule by selecting the appropiate stylesheet (App.css) using document.styleSheets[idx], and insert a new CSS rule that includes the selector and background-image declaration 
    document.styleSheets[2].insertRule(`#modal-${movieObj.id}::backdrop {background-image: ${backdropImageValue}}`);

    // adding the event listener for the close modal button, the built in <dialog> element has a .close() method along with the .showModal() method, so this makes it simple. We also remove the modal-open class with overflow: hidden from the body so scrolling is focused back to the body
    document.querySelector(`#modal-${movieObj.id} .close`).addEventListener('click', () => {
      modal.close()
      document.querySelector('body').classList.remove('modal-open')
    })
    // adding the event listener to allow us to simply click off of the modal to close it in addition to being able to use the button, here we have to use the event itself to check the target, which will is the element that was clicked on, and if the element that was clicked on is the parent modal element, then it closes. The parent modal includes the pseudo ::backdrop that is created, and if we click on the modal card itself, the more specific decendant we clicked on is returned as the target, so effectively this means if we click ont he backdrop, then close the modal 
    document.querySelector(`body`).addEventListener('click', (e) => {
      console.log(e.target)
      console.log(document.getElementById(`modal-${movieObj.id}`))
      if(e.target === document.getElementById(`modal-${movieObj.id}`)) {
        console.log('clicked off modal')
        modal.close()
        document.querySelector('body').classList.remove('modal-open')
      }
    })
  }


  return (
    <div className="col">
      <div className="card my-3 overflow-hidden">
          <div className="row g-0">
              <Link className="col-4 text-decoration-none d-block" to={movieViewPath}>
                  <div className="img-container aspect-66">
                      {movieObj.poster_path ? (
                        <img className="card-image" src={posterURL} alt={altText} />
                      ) : (
                        <p className="card-image bg-dark text-light p-3 text-center d-flex align-items-center">{movieObj.title}</p>
                      )}
                  </div>
              </Link>
              <div className="col-8 card-height position-relative">
                  <Link className="card-body text-start height-80 text-decoration-none d-block" to={movieViewPath}>
                      <h3 className="card-title">{movieObj.title}</h3>
                      <div className="card-text overflow-hidden fs-6">{movieObj.overview}</div>
                  </Link>
                  <div className="read-more fade-white position-absolute">
                      <div className="text-decoration-none text-uppercase fw-normal w-100 text-end fs-6 me-2 read-more-link" onClick={() => renderMovieModal(movieObj)}>Read More &gt;</div>
                  </div>
              </div>
          </div>
      </div>
      {modalHTML}
    </div>
  )
}

const SearchView = ({ keyword, searchResults , isLoading}) => {
  
  const title = `Displaying search results for: "${keyword}"`

  const resultsHTML = searchResults.map((obj, idx) => {
    return (
      <MovieCard movieObj={obj} key={idx}/>
    )
  })
  

  function renderSearchHTML() {
    if(!searchResults.length) {
      if(!keyword) {
        return (
          <main>
            <Hero text="Search Input Empty" />
            <section className="container my-5">
              <div className="row justify-content-center lead">
                  <h1>You are currently not searching for anything</h1>
                  <p>To browse some movies, try entering a keyword into the search bar above</p>
              </div>
            </section>
          </main>
        )
      } else {
        return (
          <main>
            <Hero text={title} />
            <section className="container my-5">
              <div className="row justify-content-center lead">
                  <h1>No Titles Found</h1>
                  <p>Sorry, we could not find any movies with titles matching your search: "<span>{keyword}</span>"</p>
                  <p>Check to see if you entered your query correctly, or search for a different title.</p>
              </div>
            </section>
          </main>
        )
      }
    } else {  
      return (
        <main>
          <Hero text={title} />
          <section className="container">
            <div className="row justify-content-center">
                <div className="col-11 mt-5 mb-3 lead">
                  <div className="row row-cols-1 row-cols-lg-2">
                    {resultsHTML}
                  </div>
                </div>
            </div>
          </section>
        </main>
      )
    }
  }

  return (renderSearchHTML());

};

export default SearchView;