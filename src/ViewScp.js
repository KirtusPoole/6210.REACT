import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

function ViewScp() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scp, setScp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchScp = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('scp-data')
        .select('*')
        .eq('id', id)
        .single();
      if (error) console.error('Error fetching SCP:', error);
      else {
        setScp(data);
        setEditData(data);
      }
      setLoading(false);
    };

    fetchScp();
  }, [id]);

  const handleUpdate = async () => {
    const { error } = await supabase.from('scp-data').update(editData).eq('id', id);
    if (error) {
      console.error('Error updating SCP:', error);
      alert('Failed to update SCP.');
    } else {
      alert('SCP updated!');
      setIsEditing(false);
      window.scrollTo(0, 0);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this SCP?')) return;
    const { error } = await supabase.from('scp-data').delete().eq('id', id);
    if (error) console.error('Error deleting SCP:', error);
    else {
      alert('SCP deleted!');
      navigate('/');
    }
  };

  if (loading) return <p>Loading SCP...</p>;
  if (!scp) return <p>SCP not found.</p>;

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '15px' }}>{scp['scp-id']}</h1>

      {isEditing ? (
        <>
          <div className="scp-box">
            <h3>SCP ID</h3>
            <input
              type="text"
              className="scp-input"
              value={editData['scp-id'] || ''}
              onChange={(e) => setEditData({ ...editData, 'scp-id': e.target.value })}
            />
          </div>

          <div className="scp-box">
            <h3>Object Class</h3>
            <input
              type="text"
              className="scp-input"
              value={editData['object-class'] || ''}
              onChange={(e) => setEditData({ ...editData, 'object-class': e.target.value })}
            />
          </div>

          <div className="scp-box">
            <h3>Description</h3>
            <textarea
              className="scp-textarea"
              value={editData.description || ''}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            />
          </div>

          <div className="scp-box">
            <h3>Containment</h3>
            <textarea
              className="scp-textarea"
              value={editData.containment || ''}
              onChange={(e) => setEditData({ ...editData, containment: e.target.value })}
            />
          </div>

          <div style={{ textAlign: 'center' }}>
            <button onClick={handleUpdate} className="btn-primary">💾 Save</button>
            <button onClick={() => setIsEditing(false)} className="btn-cancel">✖ Cancel</button>
          </div>
        </>
      ) : (
        <>
          <div className="scp-box">
            <h3>SCP ID</h3>
            <p className="scp-text">{scp['scp-id']}</p>
          </div>

          <div className="scp-box">
            <h3>Object Class</h3>
            <p className="scp-text">{scp['object-class']}</p>
          </div>

          <div className="scp-box">
            <h3>Description</h3>
            <p className="scp-text">{scp.description}</p>
          </div>

          <div className="scp-box">
            <h3>Containment</h3>
            <p className="scp-text">{scp.containment}</p>
          </div>

          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <button onClick={() => setIsEditing(true)} className="btn-primary">✏️ Edit</button>
            <button onClick={handleDelete} className="btn-danger">🗑️ Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default ViewScp;
