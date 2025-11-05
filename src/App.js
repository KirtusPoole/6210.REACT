import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { supabase } from './supabaseClient';
import './App.css';
import ViewScp from './ViewScp';
import CreateScp from './CreateScp';

function App() {
  const [scps, setScps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // for mobile

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
      <div className="app-container">
        {/* Sidebar */}
        <nav className={`sidebar ${collapsed ? 'collapsed' : ''} ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <h2>SCP List</h2>
            <button
              className="toggle-btn"
              onClick={() => {
                if (window.innerWidth <= 768) setSidebarOpen(false);
                else setCollapsed(!collapsed);
              }}
            >
              {collapsed ? '➡️' : '⬅️'}
            </button>
          </div>

          <Link to="/create" className="sidebar-link create" onClick={() => setSidebarOpen(false)}>
            ➕ <span>Create New SCP</span>
          </Link>
          <Link to="/" className="sidebar-link home" onClick={() => setSidebarOpen(false)}>
            🏠 <span>Home</span>
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
                className="sidebar-link scp-item"
                onClick={() => setSidebarOpen(false)}
              >
                🗂 <span>{scp['scp-id']}</span>
              </Link>
            ))
          )}
        </nav>

        {/* Mobile Toggle Button */}
        <button className="mobile-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          ☰
        </button>

        {/* Main Content */}
        <main className={`main-content ${sidebarOpen ? 'dimmed' : ''}`} onClick={() => setSidebarOpen(false)}>
          <Routes>
            <Route
              path="/"
              element={
                <div className="home-content">
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
