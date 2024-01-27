import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import SearchBar from "./SearchBar";
import ListItem from "./ListItem";
import dataList from "./Menu";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [selectedPounds, setSelectedPounds] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(true); // Add state to track filter panel visibility

  const [isSearchBarVisible, setIsSearchBarVisible] = useState(true);

  // Add a state variable to track the previous scroll position
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const filterRef = useRef(null);

  // search bar area scrolling effect
  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos > prevScrollPos) {
        // Scrolling down, make the search bar invisible
        setIsSearchBarVisible(false);
      } else {
        // Scrolling up, make the search bar visible
        setIsSearchBarVisible(true);
      }

      // Update the previous scroll position
      setPrevScrollPos(currentScrollPos);
    };

    // Add a scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  // const handleOutsideClick = (event) => {
  //   if (filterRef.current && !filterRef.current.contains(event.target)) {
  //     setIsFilterVisible((prev) => !prev);
  //   }
  // };

  // useEffect(() => {
  //   // Attach the event listener when the component mounts
  //   document.addEventListener("click", handleOutsideClick);

  //   // Detach the event listener when the component unmounts
  //   return () => {
  //     document.removeEventListener("click", handleOutsideClick);
  //   };
  // }, []);

  const handleFlavorButtonClick = (flavor) => {
    if (selectedFlavors.includes(flavor)) {
      setSelectedFlavors(selectedFlavors.filter((f) => f !== flavor));
    } else {
      setSelectedFlavors([...selectedFlavors, flavor]);
    }
  };

  const handleSortChange = (option) => {
    setSortBy(option);
  };

  const handleOccasionButtonClick = (occasion) => {
    if (selectedOccasions.includes(occasion)) {
      setSelectedOccasions(selectedOccasions.filter((o) => o !== occasion));
    } else {
      setSelectedOccasions([...selectedOccasions, occasion]);
    }
  };

  const handlePoundButtonClick = (pound) => {
    if (selectedPounds.includes(pound)) {
      setSelectedPounds(selectedPounds.filter((p) => p !== pound));
    } else {
      setSelectedPounds([...selectedPounds, pound]);
    }
  };

  const filteredItems = dataList.filter((item) => {
    const flavorMatch =
      selectedFlavors.length === 0 || selectedFlavors.includes(item.flavour);
    const occasionMatch =
      selectedOccasions.length === 0 ||
      selectedOccasions.includes(item.occasion);
    const poundMatch =
      selectedPounds.length === 0 || selectedPounds.includes(item.pounds);
    return flavorMatch && occasionMatch && poundMatch;
  });

  let sortedItems = [...filteredItems];

  if (sortBy === "pricelow") {
    sortedItems.sort((a, b) => a.price * a.pounds - b.price * b.pounds);
  } else if (sortBy === "pricehigh") {
    sortedItems.sort((a, b) => b.price * b.pounds - a.price * a.pounds);
  } else if (sortBy === "popularity") {
    sortedItems.sort((a, b) => b.rating - a.rating); // Assuming 'reviews' property represents popularity
  }

  return (
    <div className="cake-page">
      <div className={`search-area ${isSearchBarVisible ? "visible" : ""}`}>
        <button
          className="filter-button"
          onClick={() => setIsFilterVisible(!isFilterVisible)}
        >
          {isFilterVisible ? "Filters" : "Apply"}
        </button>
        <SearchBar onChange={setSearchQuery} />
      </div>

      <div className="cake-area">
        <div
          className={`filter-panel ${isFilterVisible ? "visible" : ""}`}
          ref={filterRef}
        >
          <div className="filter-parts">
            <h1>Flavours</h1>
            <div className="filter-buttons">
              <button
                className={`filter-button ${
                  selectedFlavors.includes("Chocolate") ? "filled" : ""
                }`}
                onClick={() => handleFlavorButtonClick("Chocolate")}
              >
                Chocolate
              </button>
              <button
                className={`filter-button ${
                  selectedFlavors.includes("Vanilla") ? "filled" : ""
                }`}
                onClick={() => handleFlavorButtonClick("Vanilla")}
              >
                Vanilla
              </button>
              <button
                className={`filter-button ${
                  selectedFlavors.includes("Strawberry") ? "filled" : ""
                }`}
                onClick={() => handleFlavorButtonClick("Strawberry")}
              >
                Strawberry
              </button>
              <button
                className={`filter-button ${
                  selectedFlavors.includes("Butterscotch") ? "filled" : ""
                }`}
                onClick={() => handleFlavorButtonClick("Butterscotch")}
              >
                Butterscotch
              </button>
              <button
                className={`filter-button ${
                  selectedFlavors.includes("Black Forest") ? "filled" : ""
                }`}
                onClick={() => handleFlavorButtonClick("Black Forest")}
              >
                Black Forest
              </button>
              <button
                className={`filter-button ${
                  selectedFlavors.includes("Red Valvet") ? "filled" : ""
                }`}
                onClick={() => handleFlavorButtonClick("Red Valvet")}
              >
                Red Valvet
              </button>
              <button
                className={`filter-button ${
                  selectedFlavors.includes("Pineapple") ? "filled" : ""
                }`}
                onClick={() => handleFlavorButtonClick("Pineapple")}
              >
                Pineapple
              </button>
            </div>
          </div>

          <div className="filter-parts">
            <h1>Occasion</h1>
            <div className="filter-buttons">
              <button
                className={`filter-button ${
                  selectedOccasions.includes("Birthday") ? "filled" : ""
                }`}
                onClick={() => handleOccasionButtonClick("Birthday")}
              >
                Birthday
              </button>
              <button
                className={`filter-button ${
                  selectedOccasions.includes("Anniversary") ? "filled" : ""
                }`}
                onClick={() => handleOccasionButtonClick("Anniversary")}
              >
                Anniversary
              </button>
            </div>
          </div>

          <div className="filter-parts">
            <h1>Pounds</h1>
            <div className="filter-buttons">
              <button
                className={`filter-button ${
                  selectedPounds.includes(1) ? "filled" : ""
                }`}
                onClick={() => handlePoundButtonClick(1)}
              >
                1 pound
              </button>
              <button
                className={`filter-button ${
                  selectedPounds.includes(2) ? "filled" : ""
                }`}
                onClick={() => handlePoundButtonClick(2)}
              >
                2 pounds
              </button>
              <button
                className={`filter-button ${
                  selectedPounds.includes(3) ? "filled" : ""
                }`}
                onClick={() => handlePoundButtonClick(3)}
              >
                More
              </button>
            </div>
          </div>

          <div className="filter-parts">
            <h1>Sort By</h1>
            <div className="filter-buttons">
              <button
                className={`filter-button ${
                  sortBy === "pricelow" ? "filled" : ""
                }`}
                onClick={() => handleSortChange("pricelow")}
              >
                Price-- Low to High
              </button>
              <button
                className={`filter-button ${
                  sortBy === "pricehigh" ? "filled" : ""
                }`}
                onClick={() => handleSortChange("pricehigh")}
              >
                Price-- High to Low
              </button>
              <button
                className={`filter-button ${
                  sortBy === "popularity" ? "filled" : ""
                }`}
                onClick={() => handleSortChange("popularity")}
              >
                Popularity
              </button>
            </div>
          </div>
        </div>
        <div className="cake-list-wrapper">
          <ListItem filteredItems={sortedItems} searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
};

export default Home;
