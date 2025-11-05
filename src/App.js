import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { supabase } from './supabaseClient';
import './App.css';
import ViewScp from './ViewScp';
import CreateScp from './CreateScp';

function App() {
  const [scps, setScps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScps();
  }, []);

  const fetchScps = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('scp-data')
        .select('*')
        .order('scp-id', { ascending: true });

      if (error) {
        console.error('Error fetching SCPs:', error);
        setScps([]);
      } else {
        setScps(data || []);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setScps([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BrowserRouter>
      <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
        {/* Sidebar */}
        <nav style={{ width: '250px', background: '#282c34', color: 'white', padding: '10px', overflowY: 'auto' }}>
          <h2 style={{ textAlign: 'center' }}>SCP List</h2>

          <Link
            to="/create"
            style={{
              display: 'block',
              background: '#4CAF50',
              color: '#fff',
              textDecoration: 'none',
              padding: '8px',
              borderRadius: '5px',
              textAlign: 'center',
              marginBottom: '10px'
            }}
          >
            ➕ Create New SCP
          </Link>

          <Link
            to="/"
            style={{
              display: 'block',
              background: '#61dafb',
              color: '#000',
              textDecoration: 'none',
              padding: '8px',
              borderRadius: '5px',
              textAlign: 'center',
              marginBottom: '10px'
            }}
          >
            🏠 Home
          </Link>

          {loading ? (
            <p>Loading...</p>
          ) : scps.length === 0 ? (
            <p>No SCPs found</p>
          ) : (
            scps.map((scp) => (
              <Link
                key={scp.id}
                to={`/scp/${scp.id}`}
                style={{
                  padding: '8px',
                  marginBottom: '5px',
                  borderRadius: '5px',
                  textDecoration: 'none',
                  background: '#444',
                  color: 'white',
                  display: 'block'
                }}
              >
                {scp['scp-id']}
              </Link>
            ))
          )}
        </nav>

        {/* Main Content */}
        <main style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          <Routes>
            <Route
  path="/"
  element={
    <div style={{
      textAlign: 'center',
      padding: '50px',
      background: '#f2f2f2',
      borderRadius: '10px',
      margin: '20px',
      fontSize: '1.2rem',
      lineHeight: '1.6',
      color: '#333'
    }}>
      <h1>Welcome to the SCP Database</h1>
      <p>
        Explore detailed entries of the most popular SCPs. <br />
        Click on an SCP from the sidebar to view its object class, containment procedures, and description.
      </p>
      <p>Feel free to add new SCPs or update existing ones!</p>
    </div>
  }
/>

            <Route path="/scp/:id" element={<ViewScp />} />
            <Route path="/create" element={<CreateScp />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
