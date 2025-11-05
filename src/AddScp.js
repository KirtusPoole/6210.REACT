import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

function AddScp({ onChange }) {
    const navigate = useNavigate();
    const [newScp, setNewScp] = useState({ 'scp-id': '', 'object-class': '', description: '', containment: '' });

    const handleAdd = async () => {
    if (!newScp['scp-id']) return alert('SCP ID is required!');
    const { error } = await supabase.from('scp-data').insert([newScp]);
    if (error) console.error('Error adding SCP:', error);
    else {
        alert('New SCP added!');
        setNewScp({ 'scp-id': '', 'object-class': '', description: '', containment: '' });
        onChange();
        navigate('/');
    }
    };

    return (
    <div>
        <h1>Add New SCP</h1>
        <div style={boxStyle}>
        <input placeholder="SCP ID" value={newScp['scp-id']} onChange={e => setNewScp({ ...newScp, 'scp-id': e.target.value })} style={inputStyle} />
        <input placeholder="Object Class" value={newScp['object-class']} onChange={e => setNewScp({ ...newScp, 'object-class': e.target.value })} style={inputStyle} />
        <textarea placeholder="Description" value={newScp.description} onChange={e => setNewScp({ ...newScp, description: e.target.value })} style={textAreaStyle} />
        <textarea placeholder="Containment" value={newScp.containment} onChange={e => setNewScp({ ...newScp, containment: e.target.value })} style={textAreaStyle} />
        <button onClick={handleAdd} style={btnPrimary}>➕ Add SCP</button>
        </div>
    </div>
    );
}

// Styling (same as ViewScp)
const boxStyle = { background: '#f2f2f2', padding: '15px', marginBottom: '15px', borderRadius: '8px', textAlign: 'justify' };
const inputStyle = { width: '100%', padding: '8px', marginBottom: '8px', borderRadius: '4px', border: '1px solid #ccc' };
const textAreaStyle = { width: '100%', minHeight: '100px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical', textAlign: 'justify' };
const btnPrimary = { background: '#4CAF50', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '5px', marginRight: '10px', cursor: 'pointer' };

export default AddScp;
