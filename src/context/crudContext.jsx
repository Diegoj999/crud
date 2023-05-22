import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { createContext, useState } from "react";
import { db } from "../services/firebase";
import PropTypes from "prop-types";

export const CrudContext = createContext();

export const CrudContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const usersCollection = collection(db, "users");

  const getUsers = async () => {
    const data = await getDocs(usersCollection);
    const usersData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setUsers(usersData);
  };


  const deleteUsers = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    getUsers();
  };

  const createUser = async (name, dni, date) => {
    await addDoc(usersCollection, { name: name, dni: dni, date: date });
  };

  const updateUser = async (id, data) => {
    const user = doc(db, "users", id);
    await updateDoc(user, data);
  };

  const getUserById = async (id) => {
    const user = await getDoc(doc(db, "users", id));
    if (user.exists()) {
      return user.data();
    } else {
      console.log("This user not found");
    }
  };


  return (
    <CrudContext.Provider value={{ getUsers, createUser, updateUser, deleteUsers, getUserById,  users }}>
      {children} 
    </CrudContext.Provider>
  );
};

CrudContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};