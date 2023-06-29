import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
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

  const checkDniExists = async (dni) => {
    const dniQuery = query(collection(db, "users"), where("dni", "==", dni));
    const querySnapshot = await getDocs(dniQuery);

    return !querySnapshot.empty;
  };

  const createUser = async (data) => {
    const dniExists = await checkDniExists(data.dni);

    if (dniExists) {
      throw new Error("Ya existe un usuario con ese DNI");
    }
    await addDoc(usersCollection, data );
  };

  const updateUser = async (id, data) => {
    const user = doc(db, "users", id);
    const userSnapshot = await getDoc(user);
    const userData = userSnapshot.data();

    if (data.dni && data.dni !== userData.dni) {
      const dniExists = await checkDniExists(data.dni);

      if (dniExists) {
        throw new Error("Ya existe un usuario con ese DNI");
      }
    }
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
    <CrudContext.Provider
      value={{
        getUsers,
        createUser,
        updateUser,
        deleteUsers,
        getUserById,
        users,
      }}
    >
      {children}
    </CrudContext.Provider>
  );
};

CrudContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
