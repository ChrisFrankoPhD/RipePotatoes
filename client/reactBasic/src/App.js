import './App.css';
import {Routes, Route} from 'react-router-dom'
import {useState, useEffect} from 'react'
import NavBar from './MyNavBar'
import HomeView from "./MyHome"
import AboutView from "./MyAbout"
import SearchView from "./MySearch"
import MovieView from "./MyMovie"
import NotFound from "./My404"



function App() {

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=fef1ffc2f924211ebb103584bb624ee4&language=en-US&query=${searchText}&include_adult=false`)
      .then(response => response.json())
      .then(data => {
        console.log('Search Results:')
        console.log(data.results)
        setSearchResults(data.results)
        setIsLoading(false)

        // setTimeout(() => {
        //   console.log('Search Results:')
        //   console.log(data.results)
        //   setSearchResults(data.results)
        //   setIsLoading(false)
        // }, 2000)
      })
  }, [searchText])

  return (
    <div className="App">
      <NavBar searchText={searchText} setSearchText={setSearchText}/>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/about" element={<AboutView />} />
        <Route path="/search" element={<SearchView keyword={searchText} searchResults={searchResults} isLoading={isLoading} />} />
        <Route path="/movie/:id" element={<MovieView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
