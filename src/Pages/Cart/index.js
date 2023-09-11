import React, { useEffect, useState } from "react";
import "./styles.css";
import { auth, db } from "../../firebase";
import { collection, query, getDocs, deleteDoc, doc } from "firebase/firestore";
import ItemOfCart from "./cartItem"

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Check if the user is authenticated
    if (!auth.currentUser) {
      console.log("User is not logged in. Please log in to view the cart.");
      return;
    }

    const userId = auth.currentUser.uid;
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
  }, []);

  const removeFromCart = async (itemId) => {
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
      console.log("Item removed from the cart.");
    } catch (error) {
      console.error("Error removing item from the cart:", error);
    }
  };

  return (
    <div className="cart-page">
    <div className="cart-container">
       <div className="price-details"><h2 >Your Cart</h2></div>

        <ul>{cartItems.map((item, index) => (
          <ItemOfCart item = {item} onRemove = {removeFromCart} />

        ))}
      </ul>
    </div>


    <div className="bill-container">
    <div className="price-details"><h2>Price Details</h2></div>

      <div className="cart-total">
      <p>added bills</p>
      <p>prices</p>
      </div>

    </div>

    </div>
  );
};

export default Cart;




//  <li key={item.id}>
//             {/* Display the cart item details here */}
//            <div>Cake ID: {item.cakeId}</div>
  //          <div>Pounds: {item.pounds}</div>
          //   <div>Message: {item.message}</div>
          //   <button onClick={() => removeFromCart(item.id)}>Remove</button>
          //   <hr />
          // </li> */}

