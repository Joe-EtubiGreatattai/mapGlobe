import React from "react";
import Globe from "react-globe.gl";

const locationGroups = {
  cities: [
    { name: "Paris", lat: 48.8566, lng: 2.3522, size: 1.2, color: "#3b4a6b", id: "paris" },
    { name: "London", lat: 51.5074, lng: -0.1278, size: 1.2, color: "#3b4a6b", id: "london" },
    { name: "Dubai", lat: 25.2048, lng: 55.2708, size: 1.2, color: "#3b4a6b", id: "dubai" },
    { name: "Milan", lat: 45.4642, lng: 9.19, size: 1.0, color: "#3b4a6b", id: "milan" },
    { name: "Rome", lat: 41.9028, lng: 12.4964, size: 1.0, color: "#3b4a6b", id: "rome" },
    { name: "Monaco", lat: 43.7384, lng: 7.4246, size: 0.9, color: "#3b4a6b", id: "monaco" },
    { name: "Miami", lat: 25.7617, lng: -80.1918, size: 1.1, color: "#3b4a6b", id: "miami" },
    { name: "New York", lat: 40.7128, lng: -74.006, size: 1.4, color: "#3b4a6b", id: "nyc" },
    { name: "Las Vegas", lat: 36.1699, lng: -115.1398, size: 1.1, color: "#3b4a6b", id: "las-vegas" }
  ],
  winterski: [
    { name: "Courchevel", lat: 45.4167, lng: 6.6333, size: 0.9, color: "#3b4a6b", id: "courchevel" },
    { name: "Megeve", lat: 45.8531, lng: 6.6333, size: 0.8, color: "#3b4a6b", id: "megeve" },
    { name: "Verbier", lat: 46.095, lng: 7.226, size: 0.8, color: "#3b4a6b", id: "verbier" },
    { name: "St Moritz", lat: 46.4908, lng: 9.8355, size: 0.9, color: "#3b4a6b", id: "st-moritz" },
    { name: "Aspen", lat: 39.1911, lng: -106.8175, size: 0.9, color: "#3b4a6b", id: "aspen" }
  ],
  islandBeach: [
    { name: "St Barth", lat: 17.8962, lng: -62.8503, size: 0.9, color: "#3b4a6b", id: "st-barth" },
    { name: "Mykonos", lat: 37.4467, lng: 25.3289, size: 0.9, color: "#3b4a6b", id: "mykonos" },
    { name: "Ibiza", lat: 38.9067, lng: 1.4206, size: 0.9, color: "#3b4a6b", id: "ibiza" },
    { name: "Costa Rica", lat: 9.7489, lng: -83.7534, size: 1.1, color: "#3b4a6b", id: "costa-rica" },
    { name: "Thailand", lat: 13.7563, lng: 100.5018, size: 1.1, color: "#3b4a6b", id: "thailand" },
    { name: "Maldives", lat: 3.2028, lng: 73.2207, size: 1.0, color: "#3b4a6b", id: "maldives" },
    { name: "Croatia", lat: 45.1, lng: 15.2, size: 1.0, color: "#3b4a6b", id: "croatia" },
    { name: "Bodrum", lat: 37.0344, lng: 27.4306, size: 0.9, color: "#3b4a6b", id: "bodrum" }
  ]
};

const locationProfiles = {
  paris: {
    name: "Paris",
    country: "France",
    population: "2.1 million",
    description: "The 'City of Light'. Home to the Eiffel Tower, Louvre and timeless streets.",
    highlights: ["Eiffel Tower", "Louvre Museum", "Notre-Dame"],
    image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=900&h=600&fit=crop"
  },
  london: {
    name: "London",
    country: "United Kingdom",
    population: "9 million",
    description: "Historic capital city with major cultural institutions.",
    highlights: ["Buckingham Palace", "British Museum", "Tower Bridge"],
    image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=900&h=600&fit=crop"
  },
  dubai: {
    name: "Dubai",
    country: "UAE",
    population: "3.3 million",
    description: "Modern skyline, luxury shopping and desert safaris.",
    highlights: ["Burj Khalifa", "Palm Jumeirah", "Dubai Mall"],
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&h=600&fit=crop"
  },
  nyc: {
    name: "New York",
    country: "United States",
    population: "8+ million",
    description: "The Big Apple. Financial and cultural hub of America.",
    highlights: ["Statue of Liberty", "Central Park", "Times Square"],
    image: "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=900&h=600&fit=crop"
  },
  miami: {
    name: "Miami",
    country: "United States",
    population: "470k",
    description: "Vibrant coastal city known for beaches, nightlife and art deco architecture.",
    highlights: ["South Beach", "Art Deco District", "Wynwood Walls"],
    image: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=900&h=600&fit=crop"
  },
  "las-vegas": {
    name: "Las Vegas",
    country: "United States",
    population: "650k",
    description: "Entertainment capital with world-class shows, casinos and nightlife.",
    highlights: ["The Strip", "Bellagio Fountains", "High Roller"],
    image: "https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?w=900&h=600&fit=crop"
  },
  milan: {
    name: "Milan",
    country: "Italy",
    population: "1.4 million",
    description: "Fashion capital of the world and home to stunning gothic architecture.",
    highlights: ["Milan Cathedral", "La Scala", "Fashion District"],
    image: "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=900&h=600&fit=crop"
  },
  rome: {
    name: "Rome",
    country: "Italy",
    population: "2.8 million",
    description: "The Eternal City with ancient ruins and Renaissance art.",
    highlights: ["Colosseum", "Vatican City", "Trevi Fountain"],
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=900&h=600&fit=crop"
  },
  monaco: {
    name: "Monaco",
    country: "Monaco",
    population: "39k",
    description: "Luxury playground on the French Riviera known for casinos and yachts.",
    highlights: ["Monte Carlo Casino", "Prince's Palace", "Port Hercules"],
    image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=900&h=600&fit=crop"
  },
  courchevel: {
    name: "Courchevel",
    country: "France",
    population: "2k",
    description: "Exclusive ski resort in the French Alps with world-class slopes.",
    highlights: ["Luxury Chalets", "Michelin Dining", "Premier Skiing"],
    image: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=900&h=600&fit=crop"
  },
  megeve: {
    name: "Megève",
    country: "France",
    population: "4k",
    description: "Charming alpine village with medieval architecture and superb skiing.",
    highlights: ["Traditional Village", "Ski Slopes", "Gourmet Restaurants"],
    image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=900&h=600&fit=crop"
  },
  verbier: {
    name: "Verbier",
    country: "Switzerland",
    population: "3k",
    description: "Premier ski resort with challenging terrain and vibrant après-ski.",
    highlights: ["Off-Piste Skiing", "Mountain Views", "Nightlife"],
    image: "https://images.unsplash.com/photo-1551524164-687a55dd1126?w=900&h=600&fit=crop"
  },
  "st-moritz": {
    name: "St Moritz",
    country: "Switzerland",
    population: "5k",
    description: "Glamorous alpine resort town and birthplace of winter tourism.",
    highlights: ["Luxury Hotels", "Winter Olympics", "Champagne Climate"],
    image: "https://images.unsplash.com/photo-1551524164-687a55dd1126?w=900&h=600&fit=crop"
  },
  aspen: {
    name: "Aspen",
    country: "United States",
    population: "7k",
    description: "Colorado ski town combining world-class slopes with cultural sophistication.",
    highlights: ["Four Mountains", "Music Festival", "Historic Downtown"],
    image: "https://images.unsplash.com/photo-1551524164-687a55dd1126?w=900&h=600&fit=crop"
  },
  "st-barth": {
    name: "St Barth",
    country: "Caribbean",
    population: "10k",
    description: "Exclusive Caribbean island with pristine beaches and French flair.",
    highlights: ["White Sand Beaches", "Luxury Villas", "French Cuisine"],
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=900&h=600&fit=crop"
  },
  mykonos: {
    name: "Mykonos",
    country: "Greece",
    population: "10k",
    description: "Iconic Greek island famous for whitewashed buildings and vibrant nightlife.",
    highlights: ["Beach Clubs", "Windmills", "Little Venice"],
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=900&h=600&fit=crop"
  },
  ibiza: {
    name: "Ibiza",
    country: "Spain",
    population: "50k",
    description: "Mediterranean paradise known for stunning sunsets and world-renowned clubs.",
    highlights: ["Beach Clubs", "Old Town", "Sunset Bars"],
    image: "https://images.unsplash.com/photo-1558642084-fd07fae5282e?w=900&h=600&fit=crop"
  },
  "costa-rica": {
    name: "Costa Rica",
    country: "Costa Rica",
    population: "5 million",
    description: "Tropical paradise with lush rainforests, diverse wildlife and pristine beaches.",
    highlights: ["Rainforests", "Volcanoes", "Eco-Tourism"],
    image: "https://images.unsplash.com/photo-1621962930674-b61b5e5a5190?w=900&h=600&fit=crop"
  },
  thailand: {
    name: "Thailand",
    country: "Thailand",
    population: "70 million",
    description: "Land of smiles with golden temples, tropical islands and rich culture.",
    highlights: ["Bangkok Temples", "Island Hopping", "Thai Cuisine"],
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=900&h=600&fit=crop"
  },
  maldives: {
    name: "Maldives",
    country: "Maldives",
    population: "540k",
    description: "Tropical island nation with crystal-clear waters and overwater bungalows.",
    highlights: ["Overwater Villas", "Coral Reefs", "Private Islands"],
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=900&h=600&fit=crop"
  },
  croatia: {
    name: "Croatia",
    country: "Croatia",
    population: "4 million",
    description: "Adriatic gem with ancient cities, stunning coastline and island paradises.",
    highlights: ["Dubrovnik Walls", "Island Hopping", "Historic Cities"],
    image: "https://images.unsplash.com/photo-1555990538-c3d7a4d0d9f3?w=900&h=600&fit=crop"
  },
  bodrum: {
    name: "Bodrum",
    country: "Turkey",
    population: "180k",
    description: "Turkish Riviera hotspot with ancient ruins and buzzing beach clubs.",
    highlights: ["Beach Clubs", "Castle", "Marina"],
    image: "https://images.unsplash.com/photo-1605522324893-378955d0a70f?w=900&h=600&fit=crop"
  }
};

export default function App() {
  const globeEl = React.useRef();
  const [size, setSize] = React.useState([window.innerWidth * 0.85, window.innerHeight * 0.65]);
  const [selected, setSelected] = React.useState(null);
  const [activeFilter, setActiveFilter] = React.useState('cities');

  React.useEffect(() => {
    if (!globeEl.current) return;
    const controls = globeEl.current.controls();
    
    controls.autoRotate = false;
    controls.enableZoom = true;
    controls.enableRotate = true;
    controls.enablePan = false;
    controls.minDistance = 180;
    controls.maxDistance = 400;
    
    globeEl.current.pointOfView({ lat: 25, lng: 20, altitude: 1.5 }, 0);
  }, []);

  React.useLayoutEffect(() => {
    const onResize = () => setSize([window.innerWidth * 0.85, window.innerHeight * 0.65]);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const pointRadius = (d) => Math.max(0.6, d.size) * 0.5;

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    setSelected(null);
    
    const locations = locationGroups[filter];
    if (locations.length > 0 && globeEl.current) {
      const avgLat = locations.reduce((sum, loc) => sum + loc.lat, 0) / locations.length;
      const avgLng = locations.reduce((sum, loc) => sum + loc.lng, 0) / locations.length;
      
      globeEl.current.pointOfView({ lat: avgLat, lng: avgLng, altitude: 1.5 }, 1500);
    }
  };

  const [popupPosition, setPopupPosition] = React.useState({ x: 50, y: 50 });

  const handleLocationSelect = (location) => {
    setSelected(location);
    if (globeEl.current) {
      globeEl.current.pointOfView({ lat: location.lat, lng: location.lng, altitude: 1.5 }, 1000);
      
      // Calculate screen position for the location
      setTimeout(() => {
        const screenCoords = globeEl.current.getScreenCoords(location.lat, location.lng);
        if (screenCoords) {
          // Position popup to the right of the point if there's space, otherwise to the left
          const popupWidth = 320;
          const xPos = screenCoords.x + 50 < size[0] - popupWidth ? screenCoords.x + 50 : screenCoords.x - popupWidth - 50;
          const yPos = Math.min(Math.max(screenCoords.y - 150, 20), size[1] - 400);
          
          setPopupPosition({ 
            x: xPos, 
            y: yPos 
          });
        }
      }, 1000);
    }
  };

  const getButtonStyle = (filter) => ({
    padding: '14px 32px',
    margin: '0 6px',
    border: 'none',
    borderRadius: '30px',
    fontSize: '15px',
    fontWeight: '600',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    background: activeFilter === filter ? '#3b4a6b' : '#f5f5f5',
    color: activeFilter === filter ? 'white' : '#666',
    boxShadow: activeFilter === filter ? '0 2px 8px rgba(59, 74, 107, 0.3)' : 'none'
  });

  const currentProfile = selected
    ? (locationProfiles[selected.id] || {
        name: selected.name,
        country: '',
        population: '—',
        description: `${selected.name} — explore this beautiful destination.`,
        highlights: [],
        image: 'https://images.unsplash.com/photo-1503264116251-35a269479413?w=900&h=600&fit=crop'
      })
    : null;

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 100%)",
        position: "relative",
        minHeight: "80vh",
        maxHeight: "100vh",
        overflow: "auto",
        width: "100vw",
        fontFamily: "'Inter', 'Segoe UI', sans-serif"
      }}
    >
      <div style={{
        textAlign: "center",
        paddingTop: "10px",
        paddingBottom: "10px"
      }}>
        <h1 style={{
          fontSize: "48px",
          fontWeight: "400",
          fontFamily: "'Georgia', serif",
          margin: "0 0 16px 0",
          color: "#3b4a6b",
          letterSpacing: "0.5px"
        }}>
          Our Locations Worldwide
        </h1>
        
        <p style={{
          fontSize: "16px",
          color: "#999",
          margin: "0 0 40px 0",
          lineHeight: "1.6",
          maxWidth: "600px",
          marginLeft: "auto",
          marginRight: "auto"
        }}>
          Discover our premium services across the globe's most exclusive destinations
        </p>

        <div style={{ 
          display: "flex", 
          justifyContent: "center",
          gap: "8px", 
          marginBottom: "40px", 
          flexWrap: "wrap" 
        }}>
          <button 
            style={getButtonStyle('cities')} 
            onClick={() => handleFilterClick('cities')}
          >
            Cities
          </button>
          <button 
            style={getButtonStyle('winterski')} 
            onClick={() => handleFilterClick('winterski')}
          >
            Winter Ski
          </button>
          <button 
            style={getButtonStyle('islandBeach')} 
            onClick={() => handleFilterClick('islandBeach')}
          >
            Island & Beach
          </button>
        </div>
      </div>

      <div style={{
        position: "relative",
        width: "90%",
        maxWidth: "100vw",
        margin: "0 auto",
        height: "64vh",
        background: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Globe
          ref={globeEl}
          width={size[0]}
          height={size[1]}
          backgroundColor="rgba(255,255,255,0)"
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          enablePointerInteraction={true}
          pointsData={locationGroups[activeFilter]}
          pointLat={(d) => d.lat}
          pointLng={(d) => d.lng}
          pointColor={(d) => d.color}
          pointAltitude={0.01}
          pointRadius={0}
          htmlElementsData={locationGroups[activeFilter]}
          htmlLat={(d) => d.lat}
          htmlLng={(d) => d.lng}
          htmlAltitude={0.01}
          htmlElement={(d) => {
            const el = document.createElement('div');
            el.style.position = 'relative';
            el.style.display = 'flex';
            el.style.flexDirection = 'column';
            el.style.alignItems = 'center';
            el.innerHTML = `
              <div style="
                position: absolute;
                bottom: 100%;
                margin-bottom: 8px;
                background: #3b4a6b;
                color: white;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 600;
                font-family: 'Inter', sans-serif;
                white-space: nowrap;
                pointer-events: none;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
              ">${d.name}</div>
              <svg width="32" height="40" viewBox="0 0 24 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 22 12 22s12-13 12-22c0-6.627-5.373-12-12-12z" fill="${d.color}"/>
                <circle cx="12" cy="12" r="6" fill="white"/>
              </svg>
            `;
            el.style.cursor = 'pointer';
            el.style.pointerEvents = 'auto';
            el.onclick = () => handleLocationSelect(d);
            return el;
          }}
          pointLabel={(d) => `
            <div style="
              background: #3b4a6b;
              color: white;
              padding: 8px 16px;
              borderRadius: 6px;
              fontSize: 14px;
              fontWeight: 600;
              fontFamily: 'Inter', sans-serif;
              boxShadow: 0 2px 8px rgba(0,0,0,0.2);
            ">
              ${d.name}
            </div>
          `}
          onPointClick={(d) => {
            handleLocationSelect(d);
          }}
        />
        
        <div style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "8px"
        }}>
          <button
            onClick={() => {
              if (globeEl.current) {
                const pov = globeEl.current.pointOfView();
                globeEl.current.pointOfView({ ...pov, altitude: Math.max(1.5, pov.altitude - 0.3) }, 300);
              }
            }}
            style={{
              width: "36px",
              height: "36px",
              background: "white",
              border: "1px solid #ddd",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: "300",
              color: "#666",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
          >
            +
          </button>
          <button
            onClick={() => {
              if (globeEl.current) {
                const pov = globeEl.current.pointOfView();
                globeEl.current.pointOfView({ ...pov, altitude: Math.min(4, pov.altitude + 0.3) }, 300);
              }
            }}
            style={{
              width: "36px",
              height: "36px",
              background: "white",
              border: "1px solid #ddd",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: "300",
              color: "#666",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
          >
            −
          </button>
        </div>

        <div style={{
          position: "absolute",
          bottom: "12px",
          right: "12px",
          fontSize: "11px",
          color: "#999",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "rgba(255,255,255,0.9)",
          padding: "4px 8px",
          borderRadius: "4px"
        }}>
          <span>© Leaflet</span>
          <span>|</span>
          <span>© OpenStreetMap contributors</span>
          <span>|</span>
          <span>© CARTO</span>
        </div>

        {selected && currentProfile && (
          <div style={{
            position: "absolute",
            top: `${popupPosition.y}px`,
            left: `${popupPosition.x}px`,
            background: "white",
            borderRadius: "10px",
            padding: "16px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            maxWidth: "320px",
            width: "320px",
            zIndex: 1000,
            maxHeight: "400px",
            overflow: "auto"
          }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelected(null);
              }}
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                width: "24px",
                height: "24px",
                background: "#f5f5f5",
                border: "none",
                borderRadius: "50%",
                cursor: "pointer",
                fontSize: "16px",
                color: "#666",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "300"
              }}
            >
              ×
            </button>

            <div style={{
              width: "100%",
              height: "120px",
              borderRadius: "6px",
              background: `url(${currentProfile.image}) center/cover`,
              marginBottom: "12px"
            }} />

            <h3 style={{ 
              margin: "0 0 4px 0", 
              fontSize: "18px",
              color: "#3b4a6b",
              fontWeight: "600"
            }}>
              {currentProfile.name}
            </h3>
            
            <p style={{ 
              margin: "0 0 10px 0", 
              fontSize: "12px",
              color: "#999"
            }}>
              {currentProfile.country} {currentProfile.population && `· ${currentProfile.population}`}
            </p>
            
            <p style={{ 
              margin: "0 0 12px 0", 
              fontSize: "13px",
              color: "#666",
              lineHeight: "1.5"
            }}>
              {currentProfile.description}
            </p>
            
            {currentProfile.highlights && currentProfile.highlights.length > 0 && (
              <div style={{ marginBottom: "12px" }}>
                <h4 style={{ 
                  margin: "0 0 8px 0",
                  fontSize: "11px",
                  color: "#3b4a6b",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}>
                  Highlights
                </h4>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {currentProfile.highlights.map((highlight, index) => (
                    <span
                      key={index}
                      style={{
                        background: "#f5f5f5",
                        color: "#666",
                        padding: "4px 10px",
                        borderRadius: "16px",
                        fontSize: "11px",
                        border: "1px solid #e0e0e0"
                      }}
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => {
                alert(`Contact us about ${currentProfile.name}!\n\nThis would typically open a contact form or email.`);
              }}
              style={{
                width: "100%",
                padding: "10px 20px",
                background: "#3b4a6b",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontFamily: "'Inter', 'Segoe UI', sans-serif"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#2d3a52";
                e.target.style.boxShadow = "0 4px 12px rgba(59, 74, 107, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#3b4a6b";
                e.target.style.boxShadow = "none";
              }}
            >
              Contact Us
            </button>
          </div>
        )}
      </div>

      <div style={{ height: "60px" }} />
    </div>
  );
}