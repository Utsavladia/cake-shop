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
  deleteDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import ProductCard from "./Productcard"; // Make sure the component name matches the import
import { skeletonClasses } from "@mui/material";

const LOCAL_STORAGE_KEY = "cart";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [cartp, setCartp] = useState([]);

  useEffect(() => {
    // Check if the user is authenticated
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log(user);
    });
    return () => unsubscribe();
  }, [user]);

  const addToCart = async (product, quantity) => {
    if (user) {
      // Add the product to the user's cart as a new document
      const cartItem = {
        // Define the properties you want to store in the cart item
        name: product.name,
        price: product.price,
        quantity: quantity, // You can adjust this based on your requirements
        image: product.image, // Corrected from 'Image' to 'image'
      };

      if (quantity === 0) {
        const cartProductRef = doc(db, "products" + user.uid, product.id);
        await deleteDoc(cartProductRef);
      } else if (quantity === 1) {
        const userproductcollection = collection(db, "product" + user.uid);
        const newcartref = doc(userproductcollection, product.id);
        await setDoc(newcartref, cartItem);
      } else {
        const cartProductRef = collection(db, "product" + user.uid);
        const newupdate = doc(cartProductRef, product.id);
        await updateDoc(newupdate, { quantity: quantity });
      }
    } else {
      const localcart =
        JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image,
      };
      const localProductIndex = localcart.findIndex(
        (item) => item.id === product.id
      );
      if (quantity === 0) {
        localcart.splice(localProductIndex, 1);
      }
      // product found in the local cart
      else if (quantity === 1) {
        localcart.push(cartItem);
      } else {
        localcart[localProductIndex].quantity = quantity;
      }

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localcart));
      setCartp(localcart);
      console.log("product added to local storage and user is not logged in");
      console.log(localcart);
    }
  };

  // fetch product data from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all products
        const productsQuery = query(collection(db, "products"));
        const productsSnapshot = await getDocs(productsQuery);
        const allProducts = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          quantity: 0,
          ...doc.data(),
        }));
        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchData();
  }, []);

  //fetch cart products of the users if logged in or not
  useEffect(() => {
    const fetchCartdata = async () => {
      try {
        // Fetch products already in the cart of the user if logged in
        if (user) {
          const cartQuery = query(collection(db, "product" + user.uid));

          const unsubscribe = onSnapshot(cartQuery, (snapshot) => {
            const cartProducts = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setCartp(cartProducts);
            console.log("the cart product is ", cartProducts);
          });
        } else {
          const localcart = localStorage.getItem("cart");
          if (localcart) {
            const localcartp = JSON.parse(localcart);
            setCartp(localcartp);
          }
          console.log("user is not logged in for the products");
        }
      } catch (error) {
        console.error("error fetching the user product cart data", error);
      }
    };
    fetchCartdata();
  }, [user]);

  //filter out product in the cart to show the quantity
  useEffect(() => {
    const updatedProduct = products.map((prod) => {
      const cp = cartp.find((item) => item.id === prod.id);
      return {
        ...prod,
        quantity: cp ? cp.quantity : 0,
      };
    });
    setProducts(updatedProduct);
  }, [cartp]);

  console.log("Updated Products:", products);

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
