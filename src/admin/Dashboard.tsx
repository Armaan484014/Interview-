import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Dashboard = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      const snapshot = await getDocs(collection(db, "workshops"));
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setForms(list);
    };
    fetchForms();
  }, []);

  return (
    <div>
      <h2>All Workshop Forms</h2>
      <ul>
        {forms.map((form: any) => (
          <li key={form.id}>
            {form.workshopName} - {form.collegeName} ({form.status ? "Active" : "Inactive"})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
