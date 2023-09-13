import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import { collection, query, getDocs, where } from "firebase/firestore"; // Import the necessary Firestore functions
import "./styles.css";
import ItemOfOrders from "./ItemOfOrders"

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    // Add an authentication state change listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is logged in, fetch customer orders
        const userId = user.uid;
        
        const ordersCollectionRef = collection(db, "orders");
        const q = query(ordersCollectionRef, where("userId", "==", userId));
        
        getDocs(q)
          .then((querySnapshot) => {
            const customerOrders = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setOrders(customerOrders);
          })
          .catch((error) => {
            console.error("Error fetching customer orders:", error);
          });
      }
    });
    
    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="Order-page">
      <div className="order-history"><h2 >Order History</h2></div>
      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <div className="order-details">
            <span><p className="order-id">Order ID: {order.id}</p></span>
            <span><p>Date: {order.timestamp.toDate().toLocaleDateString()}</p></span>
          </div>

          <div >
          <ul className="order-items">
            {order.items.map((item) => (
              <ItemOfOrders key={item.id} item={item}  />
              
                
            ))}
          </ul>

          </div>
          
          <div className="order-details-bottom">
          <h3 >Total Price: ₹{order.totalPrice}</h3>
          </div>
          
          {/* You can add more order details here */}
        </div>
      ))}
    </div>
  );
};

export default OrderHistoryPage;
