import React from "react";
import Typed from "typed.js";
import "./homestyles.css";

function Bakers() {
  // Create reference to store the DOM element containing the animation
  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Cakes..",
        "Sweets..",
        "Namkeens..",
        "Fast-foods..",
        "Accessories..",
      ],
      typeSpeed: 100,
      backSpeed: 100,
      loop: true,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  return (
    <>
      <div>
        Delicious and best quality
        <br></br>products like
        <span className="bakers-text" ref={el} />
      </div>
    </>
  );
}

export default Bakers;
