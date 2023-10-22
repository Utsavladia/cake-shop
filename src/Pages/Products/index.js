import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import "./styles.css";
import {
  collection,
  query,
  getDocs,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import ProductCard from "./Productcard"; // Make sure the component name matches the import

export default function Products() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Check if the user is authenticated
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const addToCart = async (product, quantity) => {
    if (!user) {
      // Check if the user is authenticated
      console.log(
        "User is not logged in. Please log in to add items to the cart."
      );
      return;
    }

    // Add the product to the user's cart as a new document
    const cartItem = {
      // Define the properties you want to store in the cart item
      name: product.name,
      price: product.price,
      quantity: quantity, // You can adjust this based on your requirements
      Image: product.image,
    };

    const cartRef = collection(db, "product" + user.uid);
    try {
      await addDoc(cartRef, cartItem);
      console.log("Product added to cart");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "products"));
        const querySnapshot = await getDocs(q);
        const productsData = [];
        querySnapshot.forEach((doc) => {
          const product = {
            id: doc.id,
            ...doc.data(),
          };
          productsData.push(product);
        });

        const shuffledProducts = shuffleArray(productsData);
        setProducts(shuffledProducts);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once, similar to componentDidMount

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  return (
    <div className="products-page">
      <div className="product-cards">
        {products.map((prod) => (
          <ProductCard key={prod.id} product={prod} onAddToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}
