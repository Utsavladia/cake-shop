import React, { useEffect, useState } from "react";
import "./styles.css";
import { auth, db } from "../../firebase";
import { collection, query, getDocs, deleteDoc, doc } from "firebase/firestore";
import ItemOfCart from "./cartItem"
import { onAuthStateChanged } from "firebase/auth";


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);
  console.log("calling the use effect to make the cart")

  

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

  return (
    <div className="cart-page">
    <div className="cart-container">
       <div className="price-details"><h2 >Your Cart</h2></div>

        <ul>{cartItems.map((item, index) => (
          <ItemOfCart key = {item.id} item = {item} onRemove = {removeFromCart} 
          updateTotalPrice={updateTotalPrice}

            />

        ))}
      </ul>
    </div>


    <div className="bill-container">
    <div className="price-details"><h2>Price Details</h2></div>

      <div className="cart-total">
      <p>Adding all items</p>
      <p>Total Price: ₹{totalPrice}</p>
      </div>
      <button className="order-button">Place Order</button>

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

