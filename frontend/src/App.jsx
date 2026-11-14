
import './App.css'

const crafts = [
  {
    id: 1,
    name: 'Iznik Ceramics',
    country: 'Türkiye',
    category: 'Ceramics'
  },
  {
    id: 2,
    name: 'Suzani Embroidery',
    country: 'Uzbekistan',
    category: 'Textiles'
  },
  {
    id: 3,
    name: 'Batik',
    country: 'Indonesia',
    category: 'Textiles'
  }
]

function App() {
  return (
    <div className="app">
      <header className="navbar">
        <h2>IndigenousCraft</h2>
        <nav>
          <a href="#home">Home</a>
          <a href="#crafts">Explore Crafts</a>
        </nav>
      </header>

      <main id="home">
        <section className="hero">
          <h1>Discover Traditional Crafts</h1>
          <p>
            Explore cultural heritage, traditional techniques,
            and unique craftsmanship from around the world.
          </p>
          <a className="explore-button" href="#crafts">
            Explore Crafts
          </a>
        </section>

        <section id="crafts" className="crafts-section">
          <h2>Explore Cultural Crafts</h2>

          <div className="craft-grid">
            {crafts.map((craft) => (
              <article className="craft-card" key={craft.id}>
                <h3>{craft.name}</h3>
                <p>{craft.country}</p>
                <span>{craft.category}</span>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
