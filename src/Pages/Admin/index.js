import "./styles.css";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const Admin = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orderQuery = query(
          collection(db, "orders"),
          orderBy("timestamp", "desc")
        );
        const unsubscribe = onSnapshot(orderQuery, (snapshot) => {
          const ordersData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setOrders(ordersData);
        });

        return unsubscribe;
      } catch (error) {
        console.error("Error fetching admin orders data", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="AdminPage">
      {orders.map((order) => (
        <div key={order.id} className="order-admin">
          <span className="order-id-admin">Order ID: {order.id}</span>
          <div className="admin-user-id">
            <span className="admin-userid">User ID: {order.userId}</span>
            <span className="admin-user-time">
              Order Time: {order.timestamp.toDate().toString()}
            </span>
          </div>

          {/* <p>Name: {order.address["name"]}</p> */}
          {/*
          <p>Phone: {order.address.phone}</p>
          <p>Street: {order.address.street}</p>
          <p>City: {order.address.city}</p>
          <p>State: {order.address.state}</p>
          <p>Pincode: {order.address.pincode}</p>
          <h3>Items:</h3> */}
          {/* <ul>
            {order.items.map((item, index) => (
              <li key={index}>
                cake Id: {item.cakeId}, pounds :{item.pounds},{item.message}
              </li>
            ))}
          </ul> */}
          <ul>
            {order.products.map((item, i) => (
              <li
                key={i}
                style={{ display: "flex", gap: "10px", padding: "10px 30px" }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ maxWidth: "100px" }}
                />
                <h4>{item.name}</h4>
                <p>Price: {item.price}</p>
                <p>quantity: {item.quantity}</p>
              </li>
            ))}
          </ul>
          <h3 style={{ paddingLeft: "20px" }}>
            Total Price: {order.totalPrice + order.totalpPrice}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default Admin;
