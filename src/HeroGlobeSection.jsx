// HeroGlobeSection.jsx
import React, { useState } from 'react';
import InteractiveGlobe from './InteractiveGlobe';

const HeroGlobeSection = () => {
  const [activeFilter, setActiveFilter] = useState('cities');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [viewMode, setViewMode] = useState('globe'); // 'globe' or 'profile'

  // Define the locations you requested
  const locationGroups = {
    cities: [
      { name: 'Paris', lat: 48.8566, lng: 2.3522, size: 1.2, color: '#ff6fa3', id: 'paris' },
      { name: 'London', lat: 51.5074, lng: -0.1278, size: 1.2, color: '#ff9f43', id: 'london' },
      { name: 'Dubai', lat: 25.2048, lng: 55.2708, size: 1.2, color: '#ffd166', id: 'dubai' },
      { name: 'Milan', lat: 45.4642, lng: 9.19, size: 1.0, color: '#a3d5ff', id: 'milan' },
      { name: 'Rome', lat: 41.9028, lng: 12.4964, size: 1.0, color: '#f7c59f', id: 'rome' },
      { name: 'Monaco', lat: 43.7384, lng: 7.4246, size: 0.9, color: '#ffd700', id: 'monaco' },
      { name: 'Miami', lat: 25.7617, lng: -80.1918, size: 1.1, color: '#4ee1d6', id: 'miami' },
      { name: 'Nyc', lat: 40.7128, lng: -74.0060, size: 1.4, color: '#7ef7ff', id: 'nyc' },
      { name: 'Las Vegas', lat: 36.1699, lng: -115.1398, size: 1.1, color: '#ff9a9a', id: 'las-vegas' }
    ],
    winterski: [
      { name: 'Courchevel', lat: 45.4167, lng: 6.6333, size: 0.9, color: '#dbeafe', id: 'courchevel' },
      { name: 'Megeve', lat: 45.8531, lng: 6.6333, size: 0.8, color: '#c7d2fe', id: 'megeve' },
      { name: 'Verbier', lat: 46.0950, lng: 7.2260, size: 0.8, color: '#e6f0ff', id: 'verbier' },
      { name: 'St Moritz', lat: 46.4908, lng: 9.8355, size: 0.9, color: '#cfe9ff', id: 'st-moritz' },
      { name: 'Aspen', lat: 39.1911, lng: -106.8175, size: 0.9, color: '#d1fae5', id: 'aspen' }
    ],
    islandBeach: [
      { name: 'St barth', lat: 17.8962, lng: -62.8503, size: 0.9, color: '#ffefd5', id: 'st-barth' },
      { name: 'Mykonos', lat: 37.4467, lng: 25.3289, size: 0.9, color: '#ffd8d8', id: 'mykonos' },
      { name: 'Ibiza', lat: 38.9067, lng: 1.4206, size: 0.9, color: '#ffe4b5', id: 'ibiza' },
      { name: 'Costa Rica', lat: 9.7489, lng: -83.7534, size: 1.1, color: '#a0f0c6', id: 'costa-rica' },
      { name: 'Thailande', lat: 13.7563, lng: 100.5018, size: 1.1, color: '#ffd1f0', id: 'thailande' },
      { name: 'Maldives', lat: 3.2028, lng: 73.2207, size: 1.0, color: '#a7f3d0', id: 'maldives' },
      { name: 'Croatia', lat: 45.1, lng: 15.2, size: 1.0, color: '#cfe8ff', id: 'croatia' },
      { name: 'Bodrum', lat: 37.0344, lng: 27.4306, size: 0.9, color: '#ffe7d6', id: 'bodrum' }
    ]
  };

  // Minimal profiles for some key cities. Others fall back to a generic profile below.
  const locationProfiles = {
    paris: {
      name: 'Paris',
      country: 'France',
      population: '2.1 million',
      description: "The 'City of Light'. Home to the Eiffel Tower, Louvre and timeless streets.",
      highlights: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame'],
      funFacts: ['Famous for cafés and fashion'],
      image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=900&h=600&fit=crop'
    },
    london: {
      name: 'London',
      country: 'United Kingdom',
      population: '9 million',
      description: 'Historic capital city with major cultural institutions.',
      highlights: ['Buckingham Palace', 'British Museum'],
      funFacts: ['Oldest underground railway'],
      image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=900&h=600&fit=crop'
    },
    dubai: {
      name: 'Dubai',
      country: 'UAE',
      population: '3.3 million',
      description: 'Modern skyline, luxury shopping and desert safaris.',
      highlights: ['Burj Khalifa', 'Palm Jumeirah'],
      funFacts: ['Rapid development in recent decades'],
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&h=600&fit=crop'
    },
    'nyc': {
      name: 'New York City',
      country: 'United States',
      population: '8+ million',
      description: 'The Big Apple. Financial and cultural hub.',
      highlights: ['Statue of Liberty', 'Central Park'],
      funFacts: ['Hundreds of languages spoken'],
      image: 'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=900&h=600&fit=crop'
    }
    // others will use fallback
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    setSelectedLocation(null);
    setShowProfile(false);
    setViewMode('globe');
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowProfile(true);
    setViewMode('profile');
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
    setSelectedLocation(null);
    setViewMode('globe');
  };

  const handleViewProfile = (locationId) => {
    const list = locationGroups[activeFilter] || [];
    const location = list.find(loc => loc.id === locationId);
    if (location) {
      setSelectedLocation(location);
      setShowProfile(true);
      setViewMode('profile');
    }
  };

  const getButtonStyle = (filter) => ({
    padding: '12px 26px',
    margin: '0 8px 12px 8px',
    border: 'none',
    borderRadius: '50px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    background: activeFilter === filter ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(255,255,255,0.1)',
    color: activeFilter === filter ? 'white' : 'rgba(255,255,255,0.95)',
    border: activeFilter === filter ? '2px solid rgba(255,255,255,0.35)' : '2px solid rgba(255,255,255,0.18)'
  });

  // fallback profile generator
  const currentProfile = selectedLocation
    ? (locationProfiles[selectedLocation.id] || {
        name: selectedLocation.name,
        country: '',
        population: '—',
        description: `${selectedLocation.name} — quick profile not available.`,
        highlights: [],
        funFacts: [],
        image: 'https://images.unsplash.com/photo-1503264116251-35a269479413?w=900&h=600&fit=crop'
      })
    : null;

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #0b0b0b 0%, #111827 60%)'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '30%',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px'
      }}>
        <h1 style={{
          color: 'white',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: '800',
          marginBottom: '12px'
        }}>
          Explore Our World
        </h1>

        <p style={{
          color: 'rgba(255,255,255,0.9)',
          fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
          marginBottom: '18px',
          maxWidth: '760px'
        }}>
          Click map markers or use the quick-view buttons. Filters group locations.
        </p>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button style={getButtonStyle('cities')} onClick={() => handleFilterClick('cities')}>🏙️ Cities</button>
          <button style={getButtonStyle('winterski')} onClick={() => handleFilterClick('winterski')}>⛷️ Winter ski</button>
          <button style={getButtonStyle('islandBeach')} onClick={() => handleFilterClick('islandBeach')}>🏝️ Island & beach</button>
        </div>

        {viewMode === 'globe' && (
          <div style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {(locationGroups[activeFilter] || []).slice(0, 4).map(loc => (
              <button
                key={loc.id}
                onClick={() => handleViewProfile(loc.id)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '18px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 600,
                  background: 'rgba(255,255,255,0.06)'
                }}
              >
                👁️ View {loc.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '70%',
        zIndex: 10
      }}>
        <InteractiveGlobe
          width="100%"
          height="100%"
          locations={locationGroups[activeFilter]}
          onLocationSelect={handleLocationSelect}
        />
      </div>

      {showProfile && selectedLocation && currentProfile && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            width: '92%',
            maxWidth: '720px',
            maxHeight: '88vh',
            overflowY: 'auto',
            background: '#0f1724',
            borderRadius: '14px',
            padding: '20px',
            border: `1px solid ${selectedLocation.color}33`
          }}>
            <button onClick={handleCloseProfile} style={{
              position: 'absolute',
              top: 18,
              right: 18,
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '22px',
              cursor: 'pointer'
            }}>×</button>

            <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
              <div style={{
                minWidth: 220,
                height: 140,
                borderRadius: 10,
                background: `url(${currentProfile.image}) center/cover`
              }} />

              <div style={{ color: 'white', flex: 1 }}>
                <h2 style={{ margin: 0 }}>{currentProfile.name}</h2>
                <div style={{ opacity: 0.8, marginTop: 6 }}>{currentProfile.country}</div>
                <p style={{ marginTop: 12 }}>{currentProfile.description}</p>

                <div style={{ display: 'flex', gap: 12, marginTop: 14 }}>
                  <button onClick={handleCloseProfile} style={{
                    padding: '10px 14px',
                    borderRadius: 10,
                    background: 'rgba(255,255,255,0.06)',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'white'
                  }}>← Back to Globe</button>
                </div>
              </div>
            </div>

            {currentProfile.highlights && currentProfile.highlights.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <h4 style={{ color: selectedLocation.color }}>Highlights</h4>
                <ul style={{ color: '#d1d5db' }}>
                  {currentProfile.highlights.map((h, i) => <li key={i}>{h}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroGlobeSection;
