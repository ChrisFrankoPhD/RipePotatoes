import {Link, useNavigate} from 'react-router-dom'

const NavBar = ({searchText, setSearchText}) => {
  
const navigate = useNavigate()
const updateSearchText = (e) => {
  setSearchText(e.target.value)
  // console.log(searchText);
  navigate('/search')
}
// console.log(searchText);


    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary px-5">
          <div className="container-fluid px-5">
            <Link className="navbar-brand" to="/">Ripe Potatoes</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">About</Link>
                </li>
                <li className="nav-item dropdown">
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/">Home</Link></li>
                    <li><Link className="dropdown-item" to="/about">About</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item disabled" to="placeholder">Coming Soon!</Link></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link disabled" to="placeholder">Comng Soon!</Link>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <input 
                  className="form-control me-2" 
                  type="search" 
                  placeholder="Search" 
                  aria-label="Search" 
                  value={searchText}
                  onChange={updateSearchText} 
                />
                <Link to="/search"><button className="btn btn-outline-success" type="submit">Search</button></Link>
              </form>
            </div>
          </div>
        </nav>
    )
}
export default NavBar