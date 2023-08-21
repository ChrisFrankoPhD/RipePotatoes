import Hero from "./MyHero";

const HomeView = () => {
  return (
    <main>
      <Hero text="Movie Review Blog" />
      <section className="container">
        <div className="row">
            <div className="col-8 offset-2 mb-4 mt-5">
                <h3>Movies</h3>
                <p>There are many moveis here for you to pick froma s you can see. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est quisquam praesentium quo sit eos repudiandae ratione saepe, nam excepturi molestiae, eligendi voluptate libero. Quasi quisquam possimus quo explicabo esse quaerat.</p>
            </div>
        </div>
        <div className="row">
            <div className="col-8 offset-2 mb-4">
                <h3>Television</h3>
                <p>There are many TV shows here for you to pick froma s you can see. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est quisquam praesentium quo sit eos repudiandae ratione saepe, nam excepturi molestiae, eligendi voluptate libero. Quasi quisquam possimus quo explicabo esse quaerat.</p>
            </div>
        </div>
        <div className="row">
            <div className="col-8 offset-2 mb-4">
                <h3>Mini-Series</h3>
                <p>There are many mini-series here for you to pick froma s you can see. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est quisquam praesentium quo sit eos repudiandae ratione saepe, nam excepturi molestiae, eligendi voluptate libero. Quasi quisquam possimus quo explicabo esse quaerat.</p>
            </div>
        </div>
      </section>
    </main>
  );
};

export default HomeView;
