// App.js
import React from "react";
import "./App.css";
import Globe from "react-globe.gl";

const locationGroups = {
  cities: [
    { name: "Paris", lat: 48.8566, lng: 2.3522, size: 1.2, color: "#ff6fa3", id: "paris" },
    { name: "London", lat: 51.5074, lng: -0.1278, size: 1.2, color: "#ff9f43", id: "london" },
    { name: "Dubai", lat: 25.2048, lng: 55.2708, size: 1.2, color: "#ffd166", id: "dubai" },
    { name: "Milan", lat: 45.4642, lng: 9.19, size: 1.0, color: "#a3d5ff", id: "milan" },
    { name: "Rome", lat: 41.9028, lng: 12.4964, size: 1.0, color: "#f7c59f", id: "rome" },
    { name: "Monaco", lat: 43.7384, lng: 7.4246, size: 0.9, color: "#ffd700", id: "monaco" },
    { name: "Miami", lat: 25.7617, lng: -80.1918, size: 1.1, color: "#4ee1d6", id: "miami" },
    { name: "Nyc", lat: 40.7128, lng: -74.006, size: 1.4, color: "#7ef7ff", id: "nyc" },
    { name: "Las Vegas", lat: 36.1699, lng: -115.1398, size: 1.1, color: "#ff9a9a", id: "las-vegas" }
  ],
  winterski: [
    { name: "Courchevel", lat: 45.4167, lng: 6.6333, size: 0.9, color: "#dbeafe", id: "courchevel" },
    { name: "Megeve", lat: 45.8531, lng: 6.6333, size: 0.8, color: "#c7d2fe", id: "megeve" },
    { name: "Verbier", lat: 46.095, lng: 7.226, size: 0.8, color: "#e6f0ff", id: "verbier" },
    { name: "St Moritz", lat: 46.4908, lng: 9.8355, size: 0.9, color: "#cfe9ff", id: "st-moritz" },
    { name: "Aspen", lat: 39.1911, lng: -106.8175, size: 0.9, color: "#d1fae5", id: "aspen" }
  ],
  islandBeach: [
    { name: "St barth", lat: 17.8962, lng: -62.8503, size: 0.9, color: "#ffefd5", id: "st-barth" },
    { name: "Mykonos", lat: 37.4467, lng: 25.3289, size: 0.9, color: "#ffd8d8", id: "mykonos" },
    { name: "Ibiza", lat: 38.9067, lng: 1.4206, size: 0.9, color: "#ffe4b5", id: "ibiza" },
    { name: "Costa Rica", lat: 9.7489, lng: -83.7534, size: 1.1, color: "#a0f0c6", id: "costa-rica" },
    { name: "Thailande", lat: 13.7563, lng: 100.5018, size: 1.1, color: "#ffd1f0", id: "thailande" },
    { name: "Maldives", lat: 3.2028, lng: 73.2207, size: 1.0, color: "#a7f3d0", id: "maldives" },
    { name: "Croatia", lat: 45.1, lng: 15.2, size: 1.0, color: "#cfe8ff", id: "croatia" },
    { name: "Bodrum", lat: 37.0344, lng: 27.4306, size: 0.9, color: "#ffe7d6", id: "bodrum" }
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
    highlights: ["Buckingham Palace", "British Museum"],
    image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=900&h=600&fit=crop"
  },
  dubai: {
    name: "Dubai",
    country: "UAE",
    population: "3.3 million",
    description: "Modern skyline, luxury shopping and desert safaris.",
    highlights: ["Burj Khalifa", "Palm Jumeirah"],
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&h=600&fit=crop"
  },
  nyc: {
    name: "New York City",
    country: "United States",
    population: "8+ million",
    description: "The Big Apple. Financial and cultural hub.",
    highlights: ["Statue of Liberty", "Central Park"],
    image: "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=900&h=600&fit=crop"
  }
};

// flatten to pointsData
const pointsData = Object.entries(locationGroups).flatMap(([group, arr]) =>
  arr.map((p) => ({ ...p, group }))
);

export default function App() {
  const globeEl = React.useRef();
  const [size, setSize] = React.useState([window.innerWidth * 1.5, window.innerHeight * 1.8]); // Increased size
  const [selected, setSelected] = React.useState(null);
  const [activeFilter, setActiveFilter] = React.useState('cities');
  const [hoveredPoint, setHoveredPoint] = React.useState(null);

  React.useEffect(() => {
    if (!globeEl.current) return;
    const controls = globeEl.current.controls();

    // Enable user interaction
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.enableZoom = true;
    controls.enableRotate = true;
    controls.enablePan = false;
    controls.rotateSpeed = 0.8;
    controls.zoomSpeed = 0.8;
  }, []);

  React.useLayoutEffect(() => {
    const onResize = () => setSize([window.innerWidth * 1.5, window.innerHeight * 1.8]);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const pointRadius = (d) => Math.max(0.5, d.size) * 0.45;

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    setSelected(null);
  };

  const handleLocationSelect = (location) => {
    setSelected(location);
    // Fly to the selected location
    if (globeEl.current) {
      globeEl.current.pointOfView({ lat: location.lat, lng: location.lng, altitude: 1.8 }, 1000);
    }
  };

  const getButtonStyle = (filter) => ({
    padding: '12px 26px',
    margin: '0 8px 12px 8px',
    border: 'none',
    borderRadius: '50px',
    fontSize: '15px',
    fontWeight: '600',
    fontFamily: "'Raleway', sans-serif",
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    background: activeFilter === filter ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(255,255,255,0.1)',
    color: activeFilter === filter ? 'white' : 'rgba(255,255,255,0.95)',
    border: activeFilter === filter ? '2px solid rgba(255,255,255,0.35)' : '2px solid rgba(255,255,255,0.18)'
  });

  // fallback profile generator
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
      className="App"
      style={{
        background: "#000010",
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        width: "100vw"
      }}
    >
      {/* Large Interactive Globe - Bigger and shifted left */}
      <div
        style={{
          position: "absolute",
          top: "-15%",
          left: "-25%",
          width: "120%",
          height: "130%",
          pointerEvents: "auto"
        }}
      >
        <Globe
          ref={globeEl}
          width={size[0]}
          height={size[1]}
          waitForGlobeReady={false}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          enablePointerInteraction={true}
          pointsData={locationGroups[activeFilter]}
          pointLat={(d) => d.lat}
          pointLng={(d) => d.lng}
          pointColor={(d) => d.color || "#ffffff"}
          pointAltitude={0.02}
          pointRadius={pointRadius}
          pointLabel={(d) => `
            <div style="
              background: rgba(0,0,0,0.8);
              color: white;
              padding: 8px 12px;
              border-radius: 8px;
              border: 1px solid ${d.color};
              font-size: 14px;
              font-weight: 600;
              backdrop-filter: blur(10px);
            ">
              ${d.name}
            </div>
          `}
          onPointClick={(d) => {
            handleLocationSelect(d);
          }}
          onPointHover={(d) => setHoveredPoint(d)}
          onGlobeClick={() => setSelected(null)}
        />
      </div>

      {/* Right Side Content Panel */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          height: "100vh",
          width: "45%", // Slightly narrower to accommodate larger globe
          minWidth: "500px",
          padding: "80px",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          background: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.8) 50%)", // Stronger gradient
          pointerEvents: "none"
        }}
      >
        {/* Content that should be interactive */}
        <div style={{ pointerEvents: "auto" }}>
          {/* Main Title */}
          <h1 style={{
            fontSize: "70px",
            fontWeight: "800",
            fontFamily: "'Raleway', sans-serif",
            margin: "0 0 20px 0",
            lineHeight: "1.1",
            background: "linear-gradient(135deg, #fff 0%, #a0a0a0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Explore Our World
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: "20px",
            color: "rgba(255,255,255,0.8)",
            margin: "0 0 40px 0",
            lineHeight: "1.5",
            maxWidth: "500px",
            fontFamily: "'Raleway', sans-serif"
          }}>
            Discover amazing destinations around the globe. Click on locations to learn more about each unique place.
          </p>

          {/* Filter Buttons */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "40px", flexWrap: "wrap" }}>
            <button style={getButtonStyle('cities')} onClick={() => handleFilterClick('cities')}>🏙️ Cities</button>
            <button style={getButtonStyle('winterski')} onClick={() => handleFilterClick('winterski')}>⛷️ Winter Ski</button>
            <button style={getButtonStyle('islandBeach')} onClick={() => handleFilterClick('islandBeach')}>🏝️ Island & Beach</button>
          </div>

          {/* Selected Location Info */}
          {selected && currentProfile && (
            <div style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: "16px",
              padding: "24px",
              border: `1px solid ${selected.color}33`,
              backdropFilter: "blur(10px)",
              maxWidth: "500px"
            }}>
              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "8px",
                  background: `url(${currentProfile.image}) center/cover`,
                  flexShrink: 0
                }} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    margin: "0 0 8px 0", 
                    fontSize: "24px",
                    color: selected.color,
                    fontFamily: "'Raleway', sans-serif"
                  }}>
                    {currentProfile.name}
                  </h3>
                  <p style={{ 
                    margin: "0 0 12px 0", 
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.7)",
                    fontFamily: "'Raleway', sans-serif"
                  }}>
                    {currentProfile.country} {currentProfile.population && `· ${currentProfile.population}`}
                  </p>
                  <p style={{ 
                    margin: 0, 
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.9)",
                    lineHeight: "1.4",
                    fontFamily: "'Raleway', sans-serif"
                  }}>
                    {currentProfile.description}
                  </p>
                </div>
              </div>
              
              {currentProfile.highlights && currentProfile.highlights.length > 0 && (
                <div style={{ marginTop: "16px" }}>
                  <h4 style={{ 
                    margin: "0 0 8px 0",
                    fontSize: "16px",
                    color: selected.color,
                    fontFamily: "'Raleway', sans-serif"
                  }}>
                    Highlights
                  </h4>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {currentProfile.highlights.map((highlight, index) => (
                      <span
                        key={index}
                        style={{
                          background: "rgba(255,255,255,0.1)",
                          color: "rgba(255,255,255,0.9)",
                          padding: "4px 12px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          border: `1px solid ${selected.color}33`,
                          fontFamily: "'Raleway', sans-serif"
                        }}
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Hover Info */}
          {hoveredPoint && !selected && (
            <div style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: "12px",
              padding: "16px",
              border: `1px solid ${hoveredPoint.color}`,
              backdropFilter: "blur(10px)",
              maxWidth: "500px"
            }}>
              <h4 style={{ 
                margin: "0 0 8px 0",
                color: hoveredPoint.color,
                fontSize: "18px",
                fontFamily: "'Raleway', sans-serif"
              }}>
                {hoveredPoint.name}
              </h4>
              <p style={{ 
                margin: 0,
                fontSize: "14px",
                color: "rgba(255,255,255,0.8)",
                fontFamily: "'Raleway', sans-serif"
              }}>
                Click to learn more about this destination
              </p>
            </div>
          )}

          {/* Instructions when nothing is selected */}
          {!selected && !hoveredPoint && (
            <div style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "14px",
              fontStyle: "italic",
              fontFamily: "'Raleway', sans-serif"
            }}>
              Hover over points on the globe or click to see details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}