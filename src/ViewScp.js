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
    fetchScp();
  }, [id]);

  const fetchScp = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('scp-data').select('*').eq('id', id).single();
    if (error) console.error('Error fetching SCP:', error);
    else {
      setScp(data);
      setEditData(data);
    }
    setLoading(false);
  };

  const handleUpdate = async () => {
    const { error } = await supabase.from('scp-data').update(editData).eq('id', id);
    if (error) {
      console.error('Error updating SCP:', error);
      alert('Failed to update SCP.');
    } else {
      alert('SCP updated!');
      setIsEditing(false);

      // If scp-id changed, refresh page URL to reflect the new entry if needed
      fetchScp();
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
      <h1 style={{ textAlign: 'center' }}>{scp['scp-id']}</h1>

      {isEditing ? (
        <>
          <div style={boxStyle}>
            <h3>SCP ID</h3>
            <input
              type="text"
              value={editData['scp-id'] || ''}
              onChange={(e) => setEditData({ ...editData, 'scp-id': e.target.value })}
              style={inputStyle}
            />
          </div>

          <div style={boxStyle}>
            <h3>Object Class</h3>
            <input
              type="text"
              value={editData['object-class'] || ''}
              onChange={(e) => setEditData({ ...editData, 'object-class': e.target.value })}
              style={inputStyle}
            />
          </div>

          <div style={boxStyle}>
            <h3>Description</h3>
            <textarea
              value={editData.description || ''}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              style={textAreaStyle}
            />
          </div>

          <div style={boxStyle}>
            <h3>Containment</h3>
            <textarea
              value={editData.containment || ''}
              onChange={(e) => setEditData({ ...editData, containment: e.target.value })}
              style={textAreaStyle}
            />
          </div>

          <div style={{ textAlign: 'center' }}>
            <button onClick={handleUpdate} style={btnPrimary}>💾 Save</button>
            <button onClick={() => setIsEditing(false)} style={btnCancel}>✖ Cancel</button>
          </div>
        </>
      ) : (
        <>
          <div style={boxStyle}>
            <h3>SCP ID</h3>
            <p>{scp['scp-id']}</p>
          </div>
          <div style={boxStyle}>
            <h3>Object Class</h3>
            <p>{scp['object-class']}</p>
          </div>
          <div style={boxStyle}>
            <h3>Description</h3>
            <p style={{ textAlign: 'justify' }}>{scp.description}</p>
          </div>
          <div style={boxStyle}>
            <h3>Containment</h3>
            <p style={{ textAlign: 'justify' }}>{scp.containment}</p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button onClick={() => setIsEditing(true)} style={btnPrimary}>✏️ Edit</button>
            <button onClick={handleDelete} style={btnDanger}>🗑️ Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

const boxStyle = {
  background: '#f2f2f2',
  padding: '15px',
  marginBottom: '15px',
  borderRadius: '8px',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const textAreaStyle = {
  width: '100%',
  minHeight: '100px',
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  resize: 'vertical',
  textAlign: 'justify',
};

const btnPrimary = {
  background: '#4CAF50',
  color: 'white',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '5px',
  marginRight: '10px',
  cursor: 'pointer',
};

const btnDanger = {
  background: '#d9534f',
  color: 'white',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const btnCancel = {
  background: '#999',
  color: 'white',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default ViewScp;
