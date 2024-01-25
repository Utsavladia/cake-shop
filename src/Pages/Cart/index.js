import React, { useEffect, useState } from "react";
import "./styles.css";
import { auth, db } from "../../firebase";
import {
  collection,
  query,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import ItemOfCart from "./cartItem";
import { onAuthStateChanged } from "firebase/auth";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import CartProductCard from "./CartProductCard";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalpPrice, setTotalpPrice] = useState(0);
  const [buttonText, setButtonText] = useState("Place Order");
  const [orderPlaced, setOrderPlaced] = useState(false); // Track if the order has been placed
  const [redirectTimer, setRedirectTimer] = useState(null); // Timer for redirection
  const [user, setUser] = useState(null);
  const [productCart, setProductCart] = useState([]);
  const history = useHistory();

  const sendSMS = async (to, body) => {
    try {
      const response = await axios.post(
        "https://us-central1-twilio-backend-fd5ca.cloudfunctions.net/smsFunction",
        {
          to, // Replace with the recipient's phone number
          body, // Replace with your message
        }
      );

      // Check if the response status is successful (HTTP status 200)
      if (response.status === 200) {
        console.log("SMS sent successfully:", response.data.message);
        // Handle success (e.g., show a success message to the user)
      } else {
        console.error("Error sending SMS:", response.statusText);
        // Handle the error (e.g., show an error message to the user)
      }
    } catch (error) {
      console.error("Error sending SMS:", error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  // cakes cart items fetching...
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

  // remove of cake function...
  const removeFromCart = async (itemId, updatedPrice) => {
    try {
      // Check if the user is authenticated
      if (!auth.currentUser) {
        console.log(
          "User is not logged in. Please log in to remove items from the cart."
        );
        return;
      }

      const userId = auth.currentUser.uid;
      const cartItemRef = doc(db, "cart" + userId, itemId);

      // Delete the cart item document
      await deleteDoc(cartItemRef);
      // Update the UI by removing the deleted item from the cartItems state
      setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item.id !== itemId)
      );
      setTotalPrice((prevPrice) => prevPrice - updatedPrice);
      console.log("Item removed from the cart.");
    } catch (error) {
      console.error("Error removing item from the cart:", error);
    }
  };

  useEffect(() => {
    const totalproductcalprice = productCart.reduce(
      (total, product) => total + product.quantity * product.price,
      0
    );
    setTotalpPrice(totalproductcalprice);
  }, [productCart]);

  // remove of product function...
  const removeProduct = async (item) => {
    try {
      if (user) {
        const productdoc = doc(db, "product" + user.uid, item.id);
        const pprice = item.price * item.quantity;
        await deleteDoc(productdoc);
        // setTotalpPrice((lastprice) => lastprice - pprice);
      } else {
        const localproduct = JSON.parse(localStorage.getItem("cart"));
        const updatedproductcart = localproduct.filter(
          (prod) => prod.id !== item.id
        );
        localStorage.setItem("cart", JSON.stringify(updatedproductcart));
        setProductCart(updatedproductcart);
        // const pprice = item.price * item.quantity;
        // setTotalpPrice((lastprice) => lastprice - pprice);
      }
    } catch (error) {
      console.log("error removing product from cart :", error);
    }
  };

  useEffect(() => {
    // Check if the user is authenticated
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log(user);
    });
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    const fetchProductsCart = async () => {
      try {
        if (user) {
          const cartQuery = query(collection(db, "product" + user.uid));
          const unsubscribe = onSnapshot(cartQuery, (snapshot) => {
            const productofcart = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setProductCart(productofcart);
            console.log("product in cart : ", productofcart);
          });
        } else {
          const productlocal = JSON.parse(localStorage.getItem("cart"));
          if (productlocal) {
            setProductCart(productlocal);
            console.log("local product : ", productlocal);
          }
        }
      } catch (error) {
        console.error("error fetching product cart : ", error);
      }
    };
    fetchProductsCart();
  }, [user]);

  const updateTotalPrice = (updatedPrice) => {
    setTotalPrice((prevTotalPrice) => prevTotalPrice + updatedPrice);
  };

  const updateTotalpPrice = (updatedPrice) => {
    setTotalpPrice((prevTotalPrice) => prevTotalPrice + updatedPrice);
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

      const ownerPhoneNumber = "+916205053855"; // Replace with the owner's phone number
      const message = `New order placed by user ${userId}. Total price: ₹${totalPrice}`;

      await sendSMS(ownerPhoneNumber, message);

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
        <div className="price-details">
          <h2>Your Cart</h2>
        </div>

        <ul>
          {cartItems.map((item, index) => (
            <ItemOfCart
              key={item.id}
              item={item}
              onRemove={removeFromCart}
              updateTotalPrice={updateTotalPrice}
            />
          ))}
        </ul>
        {/* <div className="price-details">
          <h2>Added Accessories</h2>
        </div> */}
        <ul className="cart-p-cards">
          {productCart.map((item, index) => (
            <CartProductCard
              product={item}
              removeProduct={removeProduct}
              updateTotalpPrice={updateTotalpPrice}
            />
          ))}
        </ul>
      </div>

      <div className="bill-container">
        <div className="price-details">
          <h2>Price Details</h2>
        </div>
        <div className="cart-total">
          <p className="total-price-p">
            Cakes Price: <span>₹{totalPrice}</span>
          </p>
          <p className="total-price-p">
            Added Accessories price : <span>₹{totalpPrice}</span>
          </p>
          <p className="total-price-p">
            Delivery charges : <span className="free">Free</span>
          </p>
          <p className="total-price-cart">
            Total price : <span>₹{totalPrice + totalpPrice}</span>
          </p>
        </div>
        {orderPlaced ? (
          <button className="order-button-green" disabled>
            Order Placed
          </button>
        ) : (
          <button
            className={`order-button${
              buttonText === "Order Placed" ? " green" : ""
            }`}
            onClick={placeOrder}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;
