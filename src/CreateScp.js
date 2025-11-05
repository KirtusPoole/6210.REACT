import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

function CreateScp() {
  const navigate = useNavigate();
  const [newScp, setNewScp] = useState({
    'scp-id': '',
    'object-class': '',
    description: '',
    containment: '',
  });

  const handleAdd = async () => {
    if (!newScp['scp-id']) return alert('SCP ID is required!');
    const { error } = await supabase.from('scp-data').insert([newScp]);
    if (error) console.error('Error adding SCP:', error);
    else {
      alert('New SCP added!');
      setNewScp({ 'scp-id': '', 'object-class': '', description: '', containment: '' });
      navigate('/'); // Go back to home page
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Create New SCP</h2>

      <div style={boxStyle}>
        <input
          placeholder="SCP ID"
          value={newScp['scp-id']}
          onChange={(e) => setNewScp({ ...newScp, 'scp-id': e.target.value })}
          style={inputStyle}
        />
        <input
          placeholder="Object Class"
          value={newScp['object-class']}
          onChange={(e) => setNewScp({ ...newScp, 'object-class': e.target.value })}
          style={inputStyle}
        />
        <textarea
          placeholder="Description"
          value={newScp.description}
          onChange={(e) => setNewScp({ ...newScp, description: e.target.value })}
          style={textAreaStyle}
        />
        <textarea
          placeholder="Containment"
          value={newScp.containment}
          onChange={(e) => setNewScp({ ...newScp, containment: e.target.value })}
          style={textAreaStyle}
        />
        <button onClick={handleAdd} style={btnPrimary}>➕ Add SCP</button>
      </div>
    </div>
  );
}

// Styles
const boxStyle = {
  background: '#f2f2f2',
  padding: '15px',
  borderRadius: '8px',
  marginTop: '10px',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  marginBottom: '8px',
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
  cursor: 'pointer',
};

export default CreateScp;
