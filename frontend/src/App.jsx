
import { useState } from 'react'
import './App.css'

// Temporary sample data — not connected to the database yet.
const crafts = [
  {
    id: 1,
    name: 'Traditional Anatolian Kilim',
    type: 'Kilim',
    country: 'Türkiye',
    materials: ['Wool', 'Cotton'],
    techniques: ['Weaving', 'Dyeing'],
    process: ['Preparing Materials', 'Weaving', 'Finishing'],
    story:
      'Kilim weaving is an important part of Anatolian textile traditions. Different patterns and colors can carry cultural meanings.',
    images: ['/crafts/kilim.jpg'],
  },
  {
    id: 2,
    name: 'Traditional Ceramic Bowl',
    type: 'Bowl',
    country: 'Türkiye',
    materials: ['Clay'],
    techniques: ['Pottery', 'Glazing'],
    process: ['Shaping', 'Drying', 'Firing', 'Decoration'],
    story:
      'Decorated ceramic bowls reflect traditions of craftsmanship and ornamental design.',
    images: [
  '/crafts/bowl.jpg',
  '/crafts/bowl-detail.jpg',
  '/crafts/bowl-top.jpg',
],
  },
  {
    id: 3,
    name: 'Traditional Woven Bag',
    type: 'Bag',
    country: 'Türkiye',
    materials: ['Cotton'],
    techniques: ['Weaving', 'Sewing'],
    process: ['Preparing Materials', 'Weaving', 'Assembly'],
    story:
      'Woven bags combine practical everyday use with decorative textile craftsmanship.',
    images: ['/crafts/bag.webp'],
  },
  {
    id: 4,
    name: 'Traditional Beaded Necklace',
    type: 'Necklace',
    country: 'Türkiye',
    materials: ['Beads'],
    techniques: ['Beading'],
    process: ['Preparing Materials', 'Assembly', 'Finishing'],
    story:
      'Beaded necklaces can express artistic traditions through their colors, shapes, and patterns.',
    images: ['/crafts/necklace.jpg'],
  },
]

function App() {
  const [search, setSearch] = useState('')
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [selectedType, setSelectedType] = useState('All')
  const [selectedCountry, setSelectedCountry] = useState('All')

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [activeImage, setActiveImage] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [zoom, setZoom] = useState(1)

  const filteredCrafts = crafts.filter((craft) => {
    const searchableText = [
      craft.name,
      craft.type,
      craft.country,
      ...craft.materials,
      ...craft.techniques,
      ...craft.process,
    ].join(' ').toLowerCase()

    return (
      searchableText.includes(search.toLowerCase()) &&
      (selectedType === 'All' || craft.type === selectedType) &&
      (selectedCountry === 'All' || craft.country === selectedCountry)
    )
  })

  function openProduct(craft) {
    setSelectedProduct(craft)
    setActiveImage(0)
    setLightboxOpen(false)
    window.scrollTo(0, 0)
  }

  function goHome() {
    setSelectedProduct(null)
    setLightboxOpen(false)
    window.scrollTo(0, 0)
  }

  
function changeImage(direction) {
  const count = selectedProduct.images.length

  setActiveImage((current) =>
    (current + direction + count) % count
  )

  setZoom(1)
}

function changeZoom(amount) {
  setZoom((current) =>
    Math.max(1, Math.min(3, Math.round((current + amount) * 10) / 10))
  )
}

function openLightbox() {
  setZoom(1)
  setLightboxOpen(true)
}


  return (
    <div className="app">
      <header className="navbar">
        <a
          className="brand"
          href="#home"
          onClick={(event) => {
            event.preventDefault()
            goHome()
          }}
        >
          IndigenousCraft
        </a>

        <nav className="nav-links">
          <a href="#home" onClick={goHome}>Home</a>
          <a href="#explore" onClick={() => setSelectedProduct(null)}>
            Explore
          </a>
        </nav>

        <div className="auth-links">
          <button type="button">Log In</button>
          <button type="button" className="signup-button">
            Sign Up
          </button>
        </div>
      </header>

      {selectedProduct ? (
        <main className="detail-page">
          <button className="back-button" onClick={goHome}>
            ← Back to Explore
          </button>

          <div className="detail-layout">
            <section className="detail-gallery">
              <div className="main-photo-container">
                <button
                  className="main-photo-button"
                  onClick={openLightbox}
                  aria-label="Enlarge product image"
                >
                  <img
                    src={selectedProduct.images[activeImage]}
                    alt={selectedProduct.name}
                    className="main-photo"
                  />
                </button>

                
{selectedProduct.images.length > 1 && (
  <>
    <button
      type="button"
      className="gallery-arrow previous"
      onClick={() => changeImage(-1)}
      aria-label="Previous photo"
    >
      <svg viewBox="0 0 24 24" width="22" height="22">
        <path
          d="M15 18l-6-6 6-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>

    <button
      type="button"
      className="gallery-arrow next"
      onClick={() => changeImage(1)}
      aria-label="Next photo"
    >
      <svg viewBox="0 0 24 24" width="22" height="22">
        <path
          d="M9 18l6-6-6-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  </>
)}

              </div>

              <div className="thumbnail-row">
                {selectedProduct.images.map((image, index) => (
                  <button
                    key={index}
                    className={
                      'thumbnail-button ' +
                      (activeImage === index ? 'active' : '')
                    }
                    onClick={() => setActiveImage(index)}
                  >
                    <img src={image} alt={`View ${index + 1}`} />
                  </button>
                ))}
              </div>
            </section>

            <section className="detail-information">
              <p className="detail-type">{selectedProduct.type}</p>
              <h1>{selectedProduct.name}</h1>
              <p className="detail-location">
                📍 {selectedProduct.country}
              </p>

              <div className="detail-section">
                <h2>Materials</h2>
                <div className="attribute-tags">
                  {selectedProduct.materials.map((material) => (
                    <span key={material}>{material}</span>
                  ))}
                </div>
              </div>

              <div className="detail-section">
                <h2>Techniques</h2>
                <div className="attribute-tags">
                  {selectedProduct.techniques.map((technique) => (
                    <span key={technique}>{technique}</span>
                  ))}
                </div>
              </div>

              <div className="detail-section">
                <h2>Production Process</h2>
                <div className="attribute-tags">
                  {selectedProduct.process.map((step) => (
                    <span key={step}>{step}</span>
                  ))}
                </div>
              </div>

              <div className="detail-section">
                <h2>Cultural Story</h2>
                <p className="cultural-story">{selectedProduct.story}</p>
              </div>
            </section>
          </div>

          <section className="related-section">
            <h2>Related Crafts</h2>

            {crafts.filter(
              (craft) =>
                craft.type === selectedProduct.type &&
                craft.id !== selectedProduct.id
            ).length === 0 ? (
              <p className="related-empty">
                No related crafts available yet.
              </p>
            ) : (
              <div className="related-grid">
                {crafts
                  .filter(
                    (craft) =>
                      craft.type === selectedProduct.type &&
                      craft.id !== selectedProduct.id
                  )
                  .slice(0, 6)
                  .map((craft) => (
                    <button
                      className="related-card"
                      key={craft.id}
                      onClick={() => openProduct(craft)}
                    >
                      <img src={craft.images[0]} alt={craft.name} />
                      <strong>{craft.name}</strong>
                    </button>
                  ))}
              </div>
            )}
          </section>

          
{lightboxOpen && (
  <div
    className="lightbox-overlay"
    role="dialog"
    aria-modal="true"
    aria-label="Product image viewer"
    onClick={() => {
      setLightboxOpen(false)
      setZoom(1)
    }}
  >
    <button
      type="button"
      className="lightbox-close"
      onClick={() => {
        setLightboxOpen(false)
        setZoom(1)
      }}
    >
      ×
    </button>

    <div
      className="lightbox-image-frame"
      onClick={(event) => event.stopPropagation()}
      onWheel={(event) => {
        changeZoom(event.deltaY < 0 ? 0.2 : -0.2)
      }}
    >
      <img
        src={selectedProduct.images[activeImage]}
        alt={selectedProduct.name}
        draggable="false"
        style={{ transform: `scale(${zoom})` }}
      />
    </div>

    <div
      className="lightbox-toolbar"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        onClick={() => changeZoom(-0.25)}
        disabled={zoom <= 1}
      >
        −
      </button>

      <span>{Math.round(zoom * 100)}%</span>

      <button
        type="button"
        onClick={() => changeZoom(0.25)}
        disabled={zoom >= 3}
      >
        +
      </button>

      <button
        type="button"
        className="zoom-reset"
        onClick={() => setZoom(1)}
      >
        Reset
      </button>
    </div>

    {selectedProduct.images.length > 1 && (
      <div
        className="lightbox-controls"
        onClick={(event) => event.stopPropagation()}
      >
        <button onClick={() => changeImage(-1)}>←</button>
        <span>
          {activeImage + 1} / {selectedProduct.images.length}
        </span>
        <button onClick={() => changeImage(1)}>→</button>
      </div>
    )}
  </div>
)}

        </main>
      ) : (
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
                      {['All', 'Kilim', 'Bowl', 'Bag', 'Necklace'].map(
                        (type) => <option key={type}>{type}</option>
                      )}
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
                    </select>
                  </label>

                  <button
                    onClick={() => {
                      setSearch('')
                      setSelectedType('All')
                      setSelectedCountry('All')
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
                <article
                  className="craft-card"
                  key={craft.id}
                  onClick={() => openProduct(craft)}
                >
                  <img src={craft.images[0]} alt={craft.name} />
                  <div className="craft-info">
                    <h3>{craft.name}</h3>
                    <p>{craft.country} · {craft.type}</p>
                  </div>
                </article>
              ))}
            </div>

            {filteredCrafts.length === 0 && (
              <p className="empty-results">No crafts found.</p>
            )}
          </section>
        </main>
      )}
    </div>
  )
}

export default App
