
import { db } from './firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export const saveFormData = async (data: any) => {
  const formRef = collection(db, 'workshops');
  await addDoc(formRef, data);
};

export const fetchWorkshops = async () => {
  const querySnapshot = await getDocs(collection(db, 'workshops'));
  const workshops = querySnapshot.docs.map(doc => doc.data());
  return workshops;
};
