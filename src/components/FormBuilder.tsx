
import React, { useState } from 'react';
import { db } from './firebaseConfig'; // Firebase firestore setup

const FormBuilder = () => {
  const [formData, setFormData] = useState({
    collegeName: '',
    workshopName: '',
    date: '',
    instructions: '',
    status: 'off',
  });

  const handleSubmit = async () => {
    await db.collection('workshops').add(formData);
    alert('Form created successfully!');
  };

  return (
    <div>
      <input type="text" placeholder="College Name" value={formData.collegeName} onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })} />
      <input type="text" placeholder="Workshop Name" value={formData.workshopName} onChange={(e) => setFormData({ ...formData, workshopName: e.target.value })} />
      <input type="datetime-local" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
      <textarea value={formData.instructions} onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}></textarea>
      <button onClick={handleSubmit}>Create Form</button>
    </div>
  );
};
