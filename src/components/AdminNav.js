import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./navstyles.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";
import { collection, getDocs, query } from "firebase/firestore";

const AdminNav = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [admin, setAdmin] = useState("");

  useEffect(() => {
    const fetchadmin = async () => {
      const admincollectionRef = collection(db, "admin");
      const q = query(admincollectionRef);
      const adminSnapShot = await getDocs(q);
      adminSnapShot.forEach((admin) => {
        setAdmin(admin.data().uid);
      });
    };

    fetchadmin();
  }, []);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user.uid == admin) {
      setIsAdmin(true);
      // ...
    } else {
      setIsAdmin(false);
      // User is signed out
      // ...
    }
  });
  return (
    <div>
      {isAdmin && (
        <NavLink to="/adminyash" className="nav-links">
          <i className="fa-solid fa-phone"></i>
          Admin
        </NavLink>
      )}
    </div>
  );
};

export default AdminNav;
