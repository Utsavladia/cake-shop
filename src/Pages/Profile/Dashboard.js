import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useHistory();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  const handleLogout= async () =>{
    try {
        await logout(); // Log out the user using your Firebase logout function
        navigate.push("/"); // Redirect to the login page
        console.log("back to login");
      } catch (error) {
        console.error("Logout error:", error);
      }
  }


  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  
  return (
    <div className="dashboard">
       <div className="dashboard__container">
        Logged in as
         <div className="name">{name}</div>
         <div>{user?.email}</div>
         <button className="dashboard__btn" onClick={handleLogout}>
          Logout
         </button>
       </div>
     </div>
  );
}
export default Dashboard;


