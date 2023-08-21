import Hero from "./MyHero";

const AboutView = () => {
  return (
    <main>
      <Hero text="Here's the Tea 🍵 on the Barista" />
      <section className="container">
        <div className="row">
            <div className="col-8 offset-2 mt-5 mb-3 lead">
                <h3>Chris Franko</h3>
                <p>Chris Franko has lots of great achievments as you liekly know. He can play ttfaf on expert, iykyk. He also likely has other tings he can do but honestly I dont know what.</p>
            </div>
        </div>
        <div className="row">
            <div className="col-8 offset-2 mb-3 lead">
                <h3>Barista</h3>
                <p>He owns an espresso machine, so that has got to count for something right orem ipsum dolor sit amet, consectetur adipisicing elit. Est quisquam praesentium quo sit eos repudiandae ratione saepe, nam excepturi molestiae, eligendi voluptate libero. Quasi quisquam possimus quo explicabo esse quaerat.</p>
            </div>
        </div>
        <div className="row">
            <div className="col-8 offset-2 mb-3 lead">
                <h3>Mini-Series</h3>
                <p>There are many mini-series here for you to pick froma s you can see. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est quisquam praesentium quo sit eos repudiandae ratione saepe, nam excepturi molestiae, eligendi voluptate libero. Quasi quisquam possimus quo explicabo esse quaerat.</p>
            </div>
        </div>
      </section>
    </main>
  );
};

export default AboutView;
