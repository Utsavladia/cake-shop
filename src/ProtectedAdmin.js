import { collection, query, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Redirect, Route } from "react-router-dom";

const ProtectedAdmin = ({ component: Component, ...rest }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [admin, setAdmin] = useState("");

  useEffect(() => {
    const fetchadmin = async () => {
      const adminCollectionRef = collection(db, "admin");
      const q = query(adminCollectionRef);
      const adminSnapshot = await getDocs(q);
      adminSnapshot.forEach((a) => {
        setAdmin(a.data().uid);
      });
    };
    fetchadmin();

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("User:", user.uid);
      console.log("Admin UID:", admin);
      if (user && user.uid === admin) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, [admin]);

  return (
    <Route
      {...rest}
      render={(props) => (isAdmin ? <Component {...props} /> : null)}
    />
  );
};

export default ProtectedAdmin;
