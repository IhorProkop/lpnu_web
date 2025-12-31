// src/data/catalogItems.js
import Coke from "../assets/images/CatalogCards/Coke.jpg";
import NutellaImg from "../assets/images/CatalogCards/Nutella.jpg";
import PeanutButterImg from "../assets/images/CatalogCards/Peanut_butter.jpg";
import BurnImg from "../assets/images/CatalogCards/Burn.jpg";

export const INITIAL_CATALOG_ITEMS = [
  {
    id: "coca-cola-330",
    title: "Coca-Cola 330 ml",
    description: "Classic cola taste the world knows. Best served chilled.",
    price: 1.49,
    image: Coke,
    alt: "Red 330 ml can of Coca-Cola",
    type: "drink",
    size: "small",
  },
  {
    id: "nutella-350",
    title: "Nutella 350 g",
    description:
      "Hazelnut cocoa spread, smooth and creamy. Perfect for pancakes and toast.",
    price: 5.99,
    image: NutellaImg,
    alt: "Jar of Nutella hazelnut cocoa spread, 350 g",
    type: "spread",
    size: "medium",
  },
  {
    id: "peanut-butter-340",
    title: "Peanut Butter 340 g",
    description:
      "Classic creamy peanut butter with no palm oil. Great for sandwiches and smoothies.",
    price: 3.79,
    image: PeanutButterImg,
    alt: "Jar of smooth peanut butter, 340 g",
    type: "spread",
    size: "medium",
  },
  {
    id: "burn-500",
    title: "Burn 500 ml",
    description:
      "Energy drink with a bold flavor and caffeine kick to power your day.",
    price: 2.19,
    image: BurnImg,
    alt: "Black and green 500 ml can of Burn energy drink",
    type: "drink",
    size: "large",
  },
];
