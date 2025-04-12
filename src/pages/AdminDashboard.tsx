import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const AdminDashboard = () => {
  const [forms, setForms] = useState<any[]>([]);

  useEffect(() => {
    const fetchForms = async () => {
      const formsCollection = collection(db, 'workshops');
      const formsSnapshot = await getDocs(formsCollection);
      const formsList = formsSnapshot.docs.map(doc => doc.data());
      setForms(formsList);
    };
    fetchForms();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        {forms.map((form, index) => (
          <li key={index}>
            <h3>{form.workshopName}</h3>
            <p>{form.collegeName}</p>
            <p>{form.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
