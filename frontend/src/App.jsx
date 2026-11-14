
import { useState } from 'react'
import './App.css'


const crafts = [
  {
    id: 1,
    name: 'Traditional Anatolian Kilim',
    type: 'Kilim',
    country: 'Türkiye',
    materials: ['Wool', 'Cotton'],
    image: '/crafts/kilim.jpg',
  },
  {
    id: 2,
    name: 'Traditional Ceramic Bowl',
    type: 'Bowl',
    country: 'Türkiye',
    materials: ['Clay'],
    image: '/crafts/bowl.jpg',
  },
  {
    id: 3,
    name: 'Traditional Woven Bag',
    type: 'Bag',
    country: 'Türkiye',
    materials: ['Cotton'],
    image: '/crafts/bag.webp',
  },
  {
    id: 4,
    name: 'Traditional Beaded Necklace',
    type: 'Necklace',
    country: 'Türkiye',
    materials: ['Beads'],
    image: '/crafts/necklace.jpg',
  },
]



function App() {
  const [search, setSearch] = useState('')
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [selectedType, setSelectedType] = useState('All')
  const [selectedCountry, setSelectedCountry] = useState('All')

  const filteredCrafts = crafts.filter((craft) => {
    const searchableText = [
      craft.name,
      craft.type,
      craft.country,
      ...craft.materials,
    ].join(' ').toLowerCase()

    const matchesSearch = searchableText.includes(search.toLowerCase())
    const matchesType =
      selectedType === 'All' || craft.type === selectedType
    const matchesCountry =
      selectedCountry === 'All' || craft.country === selectedCountry

    return matchesSearch && matchesType && matchesCountry
  })

  return (
    <div className="app">
      <header className="navbar">
        <a className="brand" href="#home">IndigenousCraft</a>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#explore">Explore</a>
        </nav>

        <div className="auth-links">
          <button type="button">Log In</button>
          <button type="button" className="signup-button">
            Sign Up
          </button>
        </div>
      </header>

      <main id="home">
        <section className="hero">
          <p className="eyebrow">EXPLORE CULTURAL HERITAGE</p>
          <h1>Discover Crafts Around the World</h1>
          <p className="hero-description">
            Explore traditional craftsmanship, cultural stories
            and unique handmade products from different regions.
          </p>
        </section>

        <section className="explore-section" id="explore">
          <div className="search-area">
            <div className="search-row">
              <input
                type="search"
                placeholder="Search crafts, materials, locations..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />

              <button
                type="button"
                className="advanced-button"
                onClick={() => setAdvancedOpen(!advancedOpen)}
              >
                Advanced Search
              </button>
            </div>

            {advancedOpen && (
              <div className="advanced-panel">
                <label>
                  Product Type
                  <select
                    value={selectedType}
                    onChange={(event) =>
                      setSelectedType(event.target.value)
                    }
                  >
                    <option>All</option>
                    <option>Kilim</option>
                    <option>Bowl</option>
                    <option>Bag</option>
                    <option>Necklace</option>
                  </select>
                </label>

                <label>
                  Country
                  <select
                    value={selectedCountry}
                    onChange={(event) =>
                      setSelectedCountry(event.target.value)
                    }
                  >
                    <option>All</option>
                    <option>Türkiye</option>
                    <option>Japan</option>
                    <option>Uzbekistan</option>
                    <option>Iran</option>
                  </select>
                </label>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedType('All')
                    setSelectedCountry('All')
                    setSearch('')
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          <div className="section-heading">
            <div>
              <h2>Explore Crafts</h2>
              <p>Discover cultural creations from around the world.</p>
            </div>
            <span>{filteredCrafts.length} crafts</span>
          </div>

          <div className="craft-gallery">
            {filteredCrafts.map((craft) => (
              <article className="craft-card" key={craft.id}>
                <img src={craft.image} alt={craft.name} />
                <div className="craft-info">
                  <h3>{craft.name}</h3>
                  <p>{craft.country} · {craft.type}</p>
                </div>
              </article>
            ))}
          </div>

          {filteredCrafts.length === 0 && (
            <p className="empty-results">
              No crafts found. Try changing your search.
            </p>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
