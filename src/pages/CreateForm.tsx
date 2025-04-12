import React, { useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const CreateForm = () => {
  const [workshopName, setWorkshopName] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [date, setDate] = useState('');

  const handleCreateForm = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDoc(collection(db, 'workshops'), {
      workshopName,
      collegeName,
      date,
      status: 'inactive',
    });
  };

  return (
    <div>
      <h1>Create New Workshop Form</h1>
      <form onSubmit={handleCreateForm}>
        <input
          type="text"
          placeholder="Workshop Name"
          value={workshopName}
          onChange={(e) => setWorkshopName(e.target.value)}
        />
        <input
          type="text"
          placeholder="College Name"
          value={collegeName}
          onChange={(e) => setCollegeName(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Create Form</button>
      </form>
    </div>
  );
};

export default CreateForm;
