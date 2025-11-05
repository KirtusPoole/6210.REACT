import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { supabase } from './supabaseClient';
import './App.css';
import ViewScp from './ViewScp';
import CreateScp from './CreateScp';

function App() {
  const [scps, setScps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleMobileSidebar = () => setMobileOpen(!mobileOpen);

  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Mobile overlay */}
        {mobileOpen && <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />}

        {/* Sidebar */}
        <nav className={`sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}>
          <h2 className="sidebar-title">SCP</h2>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            {sidebarOpen ? '⬅️' : '➡️'}
          </button>

          {sidebarOpen && (
            <>
              <Link className="sidebar-link create" to="/create">➕ Create New SCP</Link>
              <Link className="sidebar-link home" to="/">🏠 Home</Link>

              {loading ? (
                <p>Loading...</p>
              ) : scps.length === 0 ? (
                <p>No SCPs found</p>
              ) : (
                scps.map((scp) => (
                  <Link key={scp.id} className="sidebar-link scp" to={`/scp/${scp.id}`}>
                    {scp['scp-id']}
                  </Link>
                ))
              )}
            </>
          )}
        </nav>

        {/* Mobile sidebar */}
        {mobileOpen && (
          <nav className="mobile-sidebar">
            <button className="mobile-close" onClick={toggleMobileSidebar}>✖ Close</button>
            <Link className="sidebar-link create" to="/create" onClick={() => setMobileOpen(false)}>➕ Create New SCP</Link>
            <Link className="sidebar-link home" to="/" onClick={() => setMobileOpen(false)}>🏠 Home</Link>
            {loading && <p>Loading...</p>}
            {!loading && scps.map((scp) => (
              <Link key={scp.id} className="sidebar-link scp" to={`/scp/${scp.id}`} onClick={() => setMobileOpen(false)}>
                {scp['scp-id']}
              </Link>
            ))}
          </nav>
        )}

        {/* Hamburger for mobile */}
        <button className="mobile-hamburger" onClick={toggleMobileSidebar}>☰</button>

        {/* Main content */}
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <div className="home-box">
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
