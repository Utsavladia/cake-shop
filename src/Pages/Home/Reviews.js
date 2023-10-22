import React from "react";
import "./homestyles.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import RatingStars from "./Ratingstar";
import "./reviews.css";

const reviews = [
  {
    id: 1,
    name: "Riya",
    text: "The cake was absolutely delicious! It had a wonderful blend of flavors, and the frosting was simply divine. I couldn't stop savoring every bite. I highly recommend this cake to anyone who loves sweet treats. It's a true delight, and I'm giving it a solid 5-star rating.",
    stars: 5,
    img: "https://sawariyabakers.vercel.app/static/media/choco_chips.42f9efb6.jpg",
  },
  {
    id: 2,
    name: "Vikram",
    text: "I was completely blown away by the cake's taste. It's not often you come across something so scrumptious. The cake was rich, moist, and full of delightful flavors. I must say, it was an absolute treat to my taste buds. I'm rating it a perfect 5 stars!",
    stars: 5,
    img: "https://assets.winni.in/product/primary/2023/6/85584.jpeg?dpr=1&w=400",
  },
  {
    id: 3,
    name: "Neha",
    text: "The cake was a true masterpiece. The combination of flavors was outstanding, and the texture was perfectly moist. It was evident that it was made with care and high-quality ingredients. I'm delighted to have tried it and would definitely recommend it to others. A 5-star rating from me!",
    stars: 5,
    img: "https://assets.winni.in/product/primary/2014/8/41916.jpeg?dpr=1&w=400",
  },
  {
    id: 4,
    name: "Aryan",
    text: "The cake was a flavor explosion in my mouth. I couldn't get enough of it. The sweetness was just right, and the presentation was top-notch. I'll certainly be returning for another slice. 5 stars without a doubt!",
    stars: 5,
    img: "https://sawariyabakers.vercel.app/static/media/choco_chips.42f9efb6.jpg",
  },
  {
    id: 5,
    name: "Aisha",
    text: "The cake was beyond amazing. It was so tasty that I'd rate it 5 stars in a heartbeat. The balance of flavors was exquisite, and the quality was evident. I'm truly impressed by the cake, and I look forward to trying more from this bakery.",
    stars: 5,
    img: "https://5.imimg.com/data5/ECOM/Default/2022/12/UE/HT/II/22435492/frill-dress-barbie-cake-500x500.jpg",
  },
  {
    id: 6,
    name: "Rajesh",
    text: "I thoroughly enjoyed the cake. It's not often that you come across something this delightful. The taste was simply divine, and I couldn't have asked for a better treat. I'll gladly rate it a 5-star experience!",
    stars: 5,
    img: "https://assets.winni.in/product/primary/2022/9/73561.jpeg?dpr=1&w=400",
  },
  {
    id: 7,
    name: "Sneha",
    text: "The cake was a true delight. It had an amazing flavor profile that I appreciated. I'd rate it a solid 4 stars. It was good, though there's always room for improvement.",
    stars: 4,
    img: "https://assets.winni.in/product/primary/2022/10/76504.jpeg?dpr=1&w=400",
  },
  {
    id: 8,
    name: "Priya",
    text: "The cake was indeed tasty. It was quite satisfying, and I'd give it a 4-star rating. I appreciated the overall quality and taste, but there's a little room for enhancement.",
    stars: 4,
    img: "https://assets.winni.in/product/primary/2023/8/88014.jpeg?dpr=1&w=400",
  },
  {
    id: 9,
    name: "Aman",
    text: "I found the cake to be delightful. The taste was good, and I was fully satisfied. It deserves a 4-star rating. I would recommend it to others as well.",
    stars: 4,
    img: "https://assets.winni.in/product/primary/2022/9/73522.jpeg?dpr=1&w=400",
  },
  {
    id: 10,
    name: "Sarika",
    text: "The cake was delicious, and I'm looking forward to more. I'd rate it 4/5 stars. It was a treat for the senses, and I'll definitely be a repeat customer.",
    stars: 4,
    img: "https://sawariyabakers.vercel.app/static/media/choco_chips.42f9efb6.jpg",
  },
];

export default function Reviews() {
  return (
    <div className="part2 reviews">
      <div className="heading">
        <h1>What customers tell about us</h1>
      </div>
      <div className="review-section">
        <Carousel
          showArrows={true}
          showThumbs={true}
          infiniteLoop={true}
          autoPlay={true}
          interval={5000}
          showStatus={false}
        >
          {reviews.map((review) => (
            <div className="review-card">
              <div className="review-img">
                <img src={review.img} alt="cake-image" />
              </div>
              <div className="review-content">
                <div className="review-name">{review.name}</div>
                <div className="review-text">{review.text}</div>
                <RatingStars rating={review.stars} />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
