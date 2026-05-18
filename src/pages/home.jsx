import { useState, useEffect } from "react";
import Layout from "../components/layout.jsx";
import HeroSlider from "../components/HeroSlider";
import "./../styles/pages/Home.css";

const slides = [
  {
    img: "https://i.pinimg.com/736x/b5/2f/58/b52f589daebd13077f27ccabd2bacfe0.jpg",
    title: "Sajek Valley",
    desc: "Experience the clouds above the hills.",
  },
  {
    img: "https://i.pinimg.com/1200x/11/99/d2/1199d2b57cf03528bec023822e49985e.jpg",
    title: "Sylhet",
    desc: "Green hills and endless tea gardens.",
  },
  {
    img: "https://i.pinimg.com/736x/0f/e1/cd/0fe1cd18d5aae44d370ac712a5555f8e.jpg",
    title: "Bandarban",
    desc: "Misty hills, waterfalls, tribal soul.",
  },
  {
    img: "https://i.pinimg.com/736x/71/a0/a3/71a0a3d9a91acd580f4e019884bf7025.jpg",
    title: "Sundarban",
    desc: "Wild mangroves, animals, winding tides.",
  },
  {
    img: "https://i.pinimg.com/736x/ef/9e/20/ef9e20b9d227d7e98654eb5f37125bc3.jpg",
    title: "Debotakhum",
    desc: "Serene canyon, emerald waters, hidden.",
  },
];

const Home = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="background">
      <div className="circle1"></div>
      <div className="circle2"></div>
      <Layout>

        <HeroSlider />
        <section className="hero">

          {/* LEFT SIDE */}
          <div className="hero-left">
            <span className="hero-tag">✈ Explore Bangladesh Smarter</span>

            <h1>
              Discover the beauty of <span>Bangladesh</span> with JatraPath
            </h1>

            <p>
              Plan journeys, discover hidden gems, explore breathtaking
              destinations, and travel with confidence — all in one place.
            </p>

            <div className="hero-buttons">
              <a href="/destinations" className="primary-btn">
                Explore Destinations
              </a>

              <a href="/about" className="secondary-btn">
                Learn More
              </a>
            </div>

            <div className="hero-stats">
              <div className="stat-box">
                <h3>150+</h3>
                <p>Travel Spots</p>
              </div>

              <div className="stat-box">
                <h3>10K+</h3>
                <p>Travelers</p>
              </div>

              <div className="stat-box">
                <h3>64</h3>
                <p>District Guides</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="hero-right">

            <div className="glass-card main-card image-slider">

              <div className="img-stack">
                {slides.map((slide, i) => (
                  <img
                    key={i}
                    src={slide.img}
                    alt={slide.title}
                    className={i === index ? "active" : ""}
                  />
                ))}
              </div>

              <div className="card-content">
                <h3>{slides[index].title}</h3>
                <p>{slides[index].desc}</p>
              </div>

            </div>

            <div className="floating-card">
              <span>🌍 Trending Destination</span>
              <h4>Cox's Bazar</h4>
            </div>

          </div>

        </section>
        <section className="section featured">
          <h2>Featured Destinations</h2>
          <p>Top places travelers love in Bangladesh</p>

          <div className="grid">
            {slides.map((item, i) => (
              <div className="card" key={i}>
                <img src={item.img} alt={item.title} />
                <div className="card-body">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="section why">
          <h2>Why Choose JatraPath?</h2>

          <div className="features">
            <div className="feature-box">🌍 100+ Destinations</div>
            <div className="feature-box">💰 Best Travel Deals</div>
            <div className="feature-box">🧭 Smart Trip Planning</div>
            <div className="feature-box">📱 Easy Booking System</div>
          </div>
        </section>
        <section className="section popular">
          <h2>Popular Places</h2>

          <div className="popular-grid">
            {slides.map((item, i) => (
              <div className="popular-card" key={i}>
                <img src={item.img} />
                <div className="overlay-text">
                  <h3>{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="section testimonials">
          <h2>What Travelers Say</h2><br />

          <div className="testimonial-box">
            <p>"JatraPath helped me explore Bangladesh like never before!"</p>
            <h4>- Rahim Uddin</h4>
          </div>

          <div className="testimonial-box">
            <p>"Easy booking and amazing destinations."</p>
            <h4>- Sara Khan</h4>
          </div>
        </section>
        <section className="section newsletter">
          <h2>Get Travel Updates</h2>
          <p>Subscribe for latest destinations & offers</p>

          <div className="newsletter-box">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </section>

      </Layout>

    </div>
  );
};

export default Home;