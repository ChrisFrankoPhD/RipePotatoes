import Hero from "./MyHero";
import { Link } from "react-router-dom";


const NotFound = () => {
  return (
    <main>
      <Hero text="Page Not Found, 404 Error" />
      <section className="container">
        <div className="row">
            <div className="col-8 offset-2 mb-4 mt-5">
                <h3>We can not find the page requested</h3>
                <p>Im sorry, we cannot find a page that matches that URL. Try searching for some movies with the search-bar above, or navitgate back to the <Link to="/">Home page by clicking here.</Link></p>
            </div>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
