import React, { useEffect, useState } from "react";
import "./styles.css";
import { auth, db } from "../../firebase";
import { collection, query, getDocs, deleteDoc, doc, addDoc, serverTimestamp } from "firebase/firestore";
import ItemOfCart from "./cartItem"
import { onAuthStateChanged } from "firebase/auth";
import { Link, useHistory } from "react-router-dom"

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [buttonText, setButtonText] = useState("Place Order");
  const [orderPlaced, setOrderPlaced] = useState(false); // Track if the order has been placed
  const [redirectTimer, setRedirectTimer] = useState(null); // Timer for redirection
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in, fetch cart data
        const userId = user.uid;
        const cartCollectionRef = collection(db, "cart" + userId);

        // Create a query to get all documents in the user's cart collection
        const q = query(cartCollectionRef);

        // Fetch the cart items
        getDocs(q)
          .then((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
              // Extract the data for each cart item and include the document ID
              const cartItem = { id: doc.id, ...doc.data() };
              items.push(cartItem);
            });
            setCartItems(items);
          })
          .catch((error) => {
            console.error("Error getting cart items:", error);
          });
      }
    });

    // Don't forget to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);

  const removeFromCart = async (itemId , updatedPrice) => {
    try {
      // Check if the user is authenticated
      if (!auth.currentUser) {
        console.log("User is not logged in. Please log in to remove items from the cart.");
        return;
      }

      const userId = auth.currentUser.uid;
      const cartItemRef = doc(db, "cart" + userId, itemId);

      // Delete the cart item document
      await deleteDoc(cartItemRef);
      // Update the UI by removing the deleted item from the cartItems state
      setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== itemId));
      setTotalPrice((prevPrice) => prevPrice - updatedPrice)
      console.log("Item removed from the cart.");
    } catch (error) {
      console.error("Error removing item from the cart:", error);
    }
  };


  const updateTotalPrice = (updatedPrice) => {
    setTotalPrice((prevTotalPrice) => prevTotalPrice + updatedPrice);
  };


  const placeOrder = async () => {
    try {
      // Check if the user is authenticated
      if (!auth.currentUser) {
        console.log("User is not logged in. Please log in to place an order.");
        return;
      }

      const userId = auth.currentUser.uid;

      // Create a new order document in the "orders" collection
      const orderRef = await addDoc(collection(db, "orders"), {
        userId: userId,
        items: cartItems, // Assuming cartItems contains the items in the cart
        totalPrice: totalPrice,
        timestamp: serverTimestamp(), // You can use Firestore's server timestamp
      });

      setButtonText("Order Placed");
      setOrderPlaced(true); // Set orderPlaced to true when the order is placed

      // Optionally, you can clear the cart after placing the order
      // Clear the cart in Firestore (delete all documents in the user's cart collection)
      const cartCollectionRef = collection(db, "cart" + userId);
      const cartQuerySnapshot = await getDocs(cartCollectionRef);
      cartQuerySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      // Clear the cart items in the component state
      setCartItems([]);
      setTotalPrice(0);

      // Set up a timer to redirect after 2 seconds
      const timer = setTimeout(() => {
        history.push("/orders"); // Redirect to the orders page
      }, 2000);
      setRedirectTimer(timer);
    } catch (error) {
      console.error("Error placing the order:", error);
    }
  };

  useEffect(() => {
    // Clear the timer when the component unmounts or when the order is placed
    return () => {
      if (redirectTimer) {
        clearTimeout(redirectTimer);
      }
    };
  }, [redirectTimer]);

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="price-details"><h2>Your Cart</h2></div>
        <ul>
          {cartItems.map((item, index) => (
            <ItemOfCart key={item.id} item={item} onRemove={removeFromCart} updateTotalPrice={updateTotalPrice} />
          ))}
        </ul>
      </div>

      <div className="bill-container">
        <div className="price-details"><h2>Price Details</h2></div>
        <div className="cart-total">
          <p>Adding all items</p>
          <p>Total Price: ₹{totalPrice}</p>
        </div>
        {orderPlaced ? (
          <button className="order-button-green" disabled>
            Order Placed
          </button>
        ) : (
          <button className={`order-button${buttonText === "Order Placed" ? " green" : ""}`} onClick={placeOrder}>
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;
