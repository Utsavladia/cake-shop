import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import { collection, query, getDocs, where, orderBy } from "firebase/firestore"; // Import the necessary Firestore functions
import "./styles.css";
import ItemOfOrders from "./ItemOfOrders";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Add an authentication state change listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is logged in, fetch customer orders
        const userId = user.uid;

        const ordersCollectionRef = collection(db, "orders");
        const q = query(
          ordersCollectionRef,
          where("userId", "==", userId),
          orderBy("timestamp", "desc") // Order by timestamp in descending order
        );

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

  const [selectedRating, setSelectedRating] = useState(0);
  const [comment, setComment] = useState("");

  // Function to handle star rating selection
  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
  };

  // Function to handle comment input
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <div className="Order-page">
      <div className="order-history">
        <h2>Order History</h2>
      </div>
      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <div className="order-details">
            <span>
              <p className="order-id">Order ID: {order.id}</p>
            </span>
            <span>
              <p className="order-date">
                Date: {order.timestamp.toDate().toLocaleDateString()}
              </p>
            </span>
          </div>

          <div>
            <ul className="order-items">
              {order.items.map((item) => (
                <ItemOfOrders key={item.id} item={item} />
              ))}
            </ul>
          </div>

          <div className="order-details-bottom">
            <h3>Total Price: ₹{order.totalPrice}</h3>
          </div>

          {/* <div className="order-rating">
            <div className="stars">
              <p>Rate this order:</p>
              {[1, 2, 3, 4, 5].map((rating) => (
                // Inside the star rating system
                <span
                  key={rating}
                  className={"star"}
                  onClick={() => handleRatingChange(rating)}
                >
                  {rating <= selectedRating ? "★" : "☆"}
                </span>
              ))}
            </div>
            <div className="order-comment">
              <label>
                <textarea
                  value={comment}
                  onChange={handleCommentChange}
                  rows="4"
                  placeholder="Tell us about the cake.."
                />
              </label>
            </div>
          </div> */}

          {/* <button
            className="submit-button"
            // onClick={() => submitRatingAndComment(order.id)}
          >
            Submit Rating & Comment
          </button> */}
        </div>
      ))}
    </div>
  );
};

export default OrderHistoryPage;
