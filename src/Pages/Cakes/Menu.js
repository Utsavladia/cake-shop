const dataList = [
  {
    id: 1,
    name: "Chocolate Delight",
    flavour: "Chocolate",
    occasion: "Birthday",
    price: 450,
    rating: 5.0,
    pounds: 1,
    image: require("./images/chocolate_loaded.jpg")
  },
  {
    id: 2,
    name: "Butter Scotch",
    flavour: "Butterscotch",
    occasion: "Anniversary",
    price: 300,
    rating: 4.0,
    pounds: 1,
    image: require("./images/butterscotch_3.jpg")
  },
  {
    id: 3,
    name: "Pink Doll",
    flavour: "Strawberry",
    occasion: "Birthday",
    price: 475,
    rating: 4.9,
    pounds: 2,
    image: require("./images/pink_doll.jpg")
  },
  {
    id: 4,
    name: "Kitkat chocolate",
    flavour: "Chocolate",
    occasion: "Birthday",
    price: 450,
    rating: 3.8,
    pounds: 2,
    image: require("./images/kitkat.jpg")
  },
  {
    id: 5,
    name: "Choco chips",
    flavour: "Chocolate",
    occasion: "Birthday",
    price: 450,
    rating: 4.7,
    pounds: 1,
    image: require("./images/choco_chips.jpg")
  },
  {
    id: 6,
    name: "Lavender vanilla",
    flavour: "vanilla",
    occasion: "Birthday",
    price: 350,
    rating: 4.1,
    pounds: 1,
    image: require("./images/lavender_vanila.jpg")
  },
  {
    id: 7,
    name: "Rasmalai",
    flavour: "Rasmalai",
    occasion: "Birthday",
    price: 500,
    rating: 4.4,
    pounds: 1,
    image: require("./images/rasmalai.jpg")
  },
  {
    id: 8,
    name: "Spiderman cake",
    flavour: "Chocolate",
    occasion: "Birthday",
    price: 400,
    rating: 4.9,
    pounds: 1,
    image: require("./images/spider_1.jpg")
  },
  {
    id: 9,
    name: "Rainbow Fantasy",
    flavour: "Vanilla",
    occasion: "Birthday",
    price: 400,
    rating: 4.9,
    pounds: 2,
    image:
      "https://assets.winni.in/product/primary/2021/8/53453.jpeg?dpr=1&w=300"
  },
  {
    id: 10,
    name: "Heart Pinata",
    flavour: "Chocolate",
    occasion: "Anniversary",
    price: 600,
    rating: 4.3,
    pounds: 2,
    image:
      "https://assets.winni.in/product/primary/2022/9/73558.jpeg?dpr=1&w=400"
  },
  // ... Repeat the structure for the remaining cakes
  {
    id: 11,
    name: "Hear Pinata",
    flavour: "Vanilla",
    occasion: "Anniversary",
    price: 600,
    rating: 4.5,
    pounds: 2,
    image:
      "https://assets.winni.in/product/primary/2022/3/58341.jpeg?dpr=1&w=400"
  },
  {
    id: 12,
    name: "Pink Heart",
    flavour: "Vanilla",
    occasion: "Anniversary",
    price: 450,
    rating: 4.0,
    pounds: 2,
    image:
      "https://assets.winni.in/product/primary/2023/1/82282.jpeg?dpr=1&w=400"
  },
  {
    id: 13,
    name: "Minion Cake",
    flavour: "chocolate",
    occasion: "Birthday",
    price: 400,
    rating: 4.2,
    pounds: 2,
    image:
      "https://assets.winni.in/product/primary/2014/8/41916.jpeg?dpr=1&w=400"
  },
  {
    id: 14,
    name: "Doraemon cake",
    flavour: "chocolate",
    occasion: "Birthday",
    price: 400,
    rating: 4.8,
    pounds: 1,
    image:
      "https://assets.winni.in/product/primary/2014/6/25972.jpeg?dpr=1&w=400"
  },
  {
    id: 15,
    name: "Captain America ",
    flavour: "chocolate",
    occasion: "Birthday",
    price: 400,
    rating: 4.7,
    pounds: 1,
    image:
      "https://assets.winni.in/product/primary/2022/8/72706.jpeg?dpr=1&w=400"
  },
  {
    id: 16,
    name: "Pink 2tier",
    flavour: "chocolate",
    occasion: "Birthday",
    price: 400,
    rating: 4.1,
    pounds: 3,
    image:
      "https://assets.winni.in/product/primary/2014/8/42597.jpeg?dpr=1&w=400"
  },
  {
    id: 17,
    name: "Doll cake",
    flavour: "Chocolate",
    occasion: "Birthday",
    price: 450,
    rating: 4.4,
    pounds: 2,
    image:
      "https://5.imimg.com/data5/ECOM/Default/2022/12/UE/HT/II/22435492/frill-dress-barbie-cake-500x500.jpg"
  },
  {
    id: 18,
    name: "Guchhi cake",
    flavour: "vanilla",
    occasion: "Birthday",
    price: 600,
    rating: 4.2,
    pounds: 3,
    image:
      "https://assets.winni.in/product/primary/2021/10/55194.jpeg?dpr=1&w=400"
  },
  {
    id: 19,
    name: "Rainbow Unicorn",
    flavour: "Chocolate",
    occasion: "Birthday",
    price: 600,
    rating: 4.9,
    pounds: 3,
    image:
      "https://assets.winni.in/product/primary/2021/8/53310.jpeg?dpr=1&w=400"
  },
  {
    id: 20,
    name: "Rose cake",
    flavour: "vanilla",
    occasion: "Anniversary",
    price: 400,
    rating: 4.3,
    pounds: 2,
    image:
      "https://assets.winni.in/product/primary/2014/8/40394.jpeg?dpr=1&w=400"
  },
  {
    id: 21,
    name: "Wedding 3-story ",
    flavour: "Chocolate",
    occasion: "Anniversary",
    price: 350,
    rating: 4.5,
    pounds: 7,
    image:
      "https://assets.winni.in/product/primary/2022/10/76498.jpeg?dpr=1&w=400"
  },
  {
    id: 22,
    name: "Fruit Cake",
    flavour: "Black Forest",
    occasion: "Birthday",
    price: 500,
    rating: 4.0,
    pounds: 1,
    image:
      "https://assets.winni.in/product/primary/2022/10/75596.jpeg?dpr=1&w=400"
  },
  {
    id: 23,
    name: "Black Forest",
    flavour: "Black Forest",
    occasion: "Birthday",
    price: 350,
    rating: 4.2,
    pounds: 1,
    image:
      "https://assets.winni.in/product/primary/2023/8/88965.jpeg?dpr=1&w=400"
  },
  {
    id: 24,
    name: "Redvalvet",
    flavour: "Red Valvet",
    occasion: "Anniversary",
    price: 500,
    rating: 4.8,
    pounds: 1,
    image:
      "https://assets.winni.in/product/primary/2014/6/27732.jpeg?dpr=1&w=400"
  },
  {
    id: 25,
    name: "Strawberry flower",
    flavour: "Strawberry",
    occasion: "Birthday",
    price: 350,
    rating: 4.7,
    pounds: 1,
    image:
      "https://assets.winni.in/product/primary/2021/9/53489.jpeg?dpr=1&w=400"
  },
  {
    id: 26,
    name: "Pineapple",
    flavour: "Pineapple",
    occasion: "Birthday",
    price: 350,
    rating: 4.1,
    pounds: 1,
    image:
      "https://assets.winni.in/product/primary/2023/6/85584.jpeg?dpr=1&w=400"
  },
  {
    id: 27,
    name: "Red valvet",
    flavour: "Red Valvet",
    occasion: "Anniversary",
    price: 500,
    rating: 4.4,
    pounds: 1,
    image:
      "https://assets.winni.in/product/primary/2022/9/74479.jpeg?dpr=1&w=400"
  },
  {
    id: 28,
    name: "Pineapple",
    flavour: "Pineapple",
    occasion: "Birthday",
    price: 350,
    rating: 4,
    pounds: 1,
    image:
      "https://assets.winni.in/product/primary/2022/9/73522.jpeg?dpr=1&w=400"
  },
  {
    id: 29,
    name: "Butterscotch",
    flavour: "Butterscotch",
    occasion: "Birthday",
    price: 350,
    rating: 4.9,
    pounds: 1,
    image:
      "https://assets.winni.in/product/primary/2022/9/74609.jpeg?dpr=1&w=400"
  },
  {
    id: 30,
    name: "Red Valvet heart",
    flavour: "Red Valvet",
    occasion: "Anniversary",
    price: 450,
    rating: 4.3,
    pounds: 2,
    image:
      "https://assets.winni.in/product/primary/2022/12/80571.jpeg?dpr=1&w=400"
  },
  {
    id: 31,
    name: "Pineapple",
    flavour: "Pineapple",
    occasion: "Birthday",
    price: 350,
    rating: 4,
    pounds: 3,
    image:
      "https://assets.winni.in/product/primary/2022/10/76504.jpeg?dpr=1&w=400"
  },
  {
    id: 32,
    name: "Vanilla",
    flavour: "Vanilla",
    occasion: "Birthday",
    price: 350,
    rating: 4,
    pounds: 1,
    image:
      "https://assets.winni.in/product/primary/2014/6/31158.jpeg?dpr=1&w=400"
  },
  {
    id: 33,
    name: "Black Forest",
    flavour: "Black Forest",
    occasion: "Birthday",
    price: 350,
    rating: 4,
    pounds: 1,
    image:
      "https://assets.winni.in/product/primary/2022/9/73561.jpeg?dpr=1&w=400"
  },
  {
    id: 34,
    name: "Vanilla",
    flavour: "Vanilla",
    occasion: "Birthday",
    price: 350,
    rating: 4,
    pounds: 1,
    image:
      "https://assets.winni.in/product/primary/2023/8/88014.jpeg?dpr=1&w=400"
  }
];

export default dataList;
