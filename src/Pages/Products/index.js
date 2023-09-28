import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import "./styles.css";
import { collection, query, getDocs } from "firebase/firestore";
import ProductCard from "./Productcard"; // Make sure the component name matches the import

export default function Products() {
  const [products, setProducts] = useState([]);

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
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
}
