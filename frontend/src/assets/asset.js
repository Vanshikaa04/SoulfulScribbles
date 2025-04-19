import clock1 from "../assets/Resin/clock (1).jpg";
import clock2 from "../assets/Resin/clock (2).jpg";
import clock3 from "../assets/Resin/clock (3).jpg";

import jewel1 from "../assets/Resin/jewel(1).jpg";
import jewel2 from "../assets/Resin/jewel (2).jpg";
import jewel3 from "../assets/Resin/jewel (3).jpg";
import jewel4 from "../assets/Resin/jewel (4).jpg";

import keychain1 from "../assets/Resin/keychain (1).jpg";
import keychain2 from "../assets/Resin/keychain (2).jpg";
import keychain3 from "../assets/Resin/keychain (3).jpg";

import wall1 from "../assets/Wall/wallart (1).jpg";
import wall2 from "../assets/Wall/wallart (2).jpg";
import wall3 from "../assets/Wall/wallart (3).jpg";
import wall4 from "../assets/Wall/wallart (4).jpg";

import candle1 from "../assets/candle/candle (1).jpg";
import candle2 from "../assets/candle/candle (2).jpg";
import candle3 from "../assets/candle/candle (3).jpg";
import candle4 from "../assets/candle/candle (4).jpg";
import candle5 from "../assets/candle/candle (5).jpg";


import cartoon1 from "../assets/canvas/cartoon (1).jpg";
import cartoon2 from "../assets/canvas/cartoon (2).jpg";
import cartoon3 from "../assets/canvas/cartoon (3).jpg";
import cartoon4 from "../assets/canvas/cartoon (4).jpg";

import spirtual1 from "../assets/canvas/spirtual (1).jpg";
import spirtual2 from "../assets/canvas/spirtual (2).jpg";
import spirtual3 from "../assets/canvas/spirtual (3).jpg";


import aasan1 from "../assets/decor/aasan (1).jpg";
import aasan3 from "../assets/decor/aasan (3).jpg";
import aasan4 from "../assets/decor/aasan (4).jpg";

import diyaa1 from "../assets/decor/diyaa (1).jpg";
import diyaa2 from "../assets/decor/diyaa (2).jpg";
import diyaa3 from "../assets/decor/diyaa (3).jpg";
import diyaa4 from "../assets/decor/diyaa (4).jpg";

import karwa1 from "../assets/decor/karwachauth (1).jpg";
import karwa2 from "../assets/decor/karwachauth (2).jpg";
import karwa3 from "../assets/decor/karwachauth (3).jpg";

import wed1 from "../assets/decor/wedding (1).jpg";
import wed2 from "../assets/decor/wedding (2).jpg";
import wed3 from "../assets/decor/wedding (3).jpg";
import wed4 from "../assets/decor/wedding (4).jpg";

import bot1 from "../assets/glass/bottle (1).jpg";
import bot2 from "../assets/glass/bottle (3).jpg";
import bot3 from "../assets/glass/bottle (2).jpg";


import book1 from "../assets/mandala/book (2).jpg";
import book2 from "../assets/mandala/book (3).jpg";
import book3 from "../assets/mandala/book (1).jpg";


import mand1 from "../assets/mandala/mandalaart (1).jpg";
import mand2 from "../assets/mandala/mandalaart (2).jpg";
import mand3 from "../assets/mandala/mandalaart (3).jpg";
import mand4 from "../assets/mandala/mandalaart (4).jpg";


export const assest = {
  clock1,
  clock2,
  clock3,
  jewel1,
  jewel2,
  jewel3,
  jewel4,
  keychain1,
  keychain2,
  keychain3,
  wall1,
  wall2,
  wall3,
  wall4,
  candle1,
  candle2,
  candle3,
  candle4,
  candle5,
  cartoon1,
  cartoon2,
  cartoon3,
  cartoon4,
 spirtual1,
  spirtual2,
  spirtual3,
 
  aasan1,
  aasan3,
  aasan4,
  diyaa1,
  diyaa2,
  diyaa3,
  diyaa4,
  
  karwa1,
  karwa2,
  karwa3,
 
  wed1,
  wed2,
  wed3,
  wed4,
 
  bot1,
  bot2,
  bot3,
 
  book1,
  book2,
  book3,

  mand1,
  mand2,
  mand3,
  mand4,

};

const commonProperties = {
  description: "Elevate your space with our beautifully handcrafted products",
  sizes: ["4 inch", "5 inch", "6 inch", "8 inch", "10 inch","Default"],
  shape: ["Rectangle", "Circle", "Oval","Default"],
};

const categories = {
  Resin: {
    Clock: [
      { id: 1, name: "Fairy Beaches", image: [clock1], price: 100 ,bestseller:false,customizable:false},
      { id: 2, name: "Blossoming Peaches", image: [clock2], price: 200 , bestseller: false,customizable:true},
      { id: 3, name: "Crystal Ocean", image: [clock3], price: 150 ,bestseller:true,customizable:false},
    ],
    Jewellery: [
      { id: 4, name:"Starry Night Pendant" , image: [jewel1], price: 50 ,bestseller:false,customizable:false,},
      { id: 5, name: "Combo bracelet", image: [jewel2], price: 70 ,bestseller:false,customizable:false},
      { id: 6, name: "Dark Ocean Earrings", image: [jewel3], price: 100 , bestseller:false,customizable:false, },
      { id: 7, name: "Floral Jewels", image: [jewel4], price: 70 ,bestseller:true ,customizable:false},
     
    ],
    Keychains: [
      { id: 8, name: "Dazzling Alphabet", image: [keychain1], price: 50  ,bestseller:false,customizable:true,},
      { id: 9, name: "Customized Names", image: [keychain2], price: 70  ,bestseller:true,customizable:true,},
      { id: 10, name: "Couple Keychains", image: [keychain3], price: 50  ,bestseller:false,customizable:true},
    ],
  },
  Wall: {
    WallArt: [
      { id: 11, name: "Abstract Shapes", image: [wall1], price: 250 ,bestseller:false ,customizable:true,},
      { id: 12, name: "Feminine Energy", image: [wall2], price: 270 ,bestseller:true,customizable:false },
      { id: 13, name: "Anthophile", image: [wall3], price: 220  ,bestseller:false,customizable:false},
      { id: 14, name:   "Cupid Love", image: [wall4], price: 780 , bestseller:false ,customizable:false},
     
    ],
  },

  Candle: {
    candleart: [
      { id: 15, name: "Beneath the Ocean", image: [candle1], price: 350 ,bestseller:false,customizable:false },
      { id: 16, name: "Rosy", image: [candle2], price: 250,bestseller:false,customizable:false  },  
      { id: 17, name: "Floral", image: [candle3], price: 250 ,bestseller:false ,customizable:false},
      { id: 18, name: "Dreamy Combos", image: [candle4], price: 300 ,bestseller:true,customizable:false },
      { id: 19, name: "Animal Lover ", image: [candle5], price: 450 ,bestseller: false,customizable:true},
     
    ],
  },  

  Canvas: {
    Cartoon: [
      { id: 20, name: "Cute Panda", image: [cartoon1], price: 260 ,bestseller:false,customizable:false },
      { id: 21, name: "Micky Mouse", image: [cartoon2], price: 170 ,bestseller:false ,customizable:false},
      { id: 22, name: "Pokemon", image: [cartoon3], price: 150 ,bestseller:false ,customizable:false},
      { id: 23, name: "Spider Man", image: [cartoon4], price: 200,bestseller:false ,customizable:false },
      
    ],

    SpiritualPaintings: [
      { id: 24, name: "Spiritual Guide", image: [spirtual1], price: 250 ,bestseller:false ,customizable:false},
      { id: 25, name: "Radha Krishna", image: [spirtual2], price: 370,bestseller:false ,customizable:false },
      { id: 26, name: "Gautam Buddha", image: [spirtual3], price: 250, bestseller: true ,customizable:false},
     
    ],
  },

  Glass: {
    BottleDesigns: [
      { id: 27, name: "Floral Set", image: [bot1], price: 250,bestseller:false ,customizable:false },
      { id: 28, name: " Jars", image: [bot2], price: 270 ,bestseller:false ,customizable:false},
      { id: 29, name: "Combo Bottles", image: [bot3], price: 220,bestseller:false ,customizable:false},
      
    ],
  },

  Mandala: {
    Bookmarks: [
      { id: 30, name: "Mandala Book", image: [book1], price: 119,bestseller:false,customizable:false  },
      { id: 31, name: "Mandala Book Mark", image: [book2], price: 79,bestseller:false ,customizable:true },
      { id: 32, name: "Mandala Set ", image: [book3], price: 149,bestseller:false ,customizable:false },
   
    ],

    MandalaArt: [
      { id: 33, name: "Customized Photo Mandala", image: [mand1], price: 250 ,bestseller:false,customizable:true },
      { id: 34, name: "Dot Mandala", image: [mand2], price: 270 ,bestseller:true,customizable:false },
      { id: 35, name: "Mirror Worked Mandala", image: [mand3], price: 220,bestseller:false ,customizable:false },
      { id: 36, name: " Colour Gradient Mandala ", image: [mand4], price: 210,bestseller: false ,customizable:false},
      
    ],
  },

  Decorations: {
    Aasan: [
      { id: 37, name:" Morpankh Special ", image: [aasan1], price: 250,bestseller:false ,customizable:false },
       { id: 38, name: "Pastel Wooden Aasan", image: [aasan3], price: 220,bestseller: true ,customizable:false},
      { id: 39, name: "Wooden Jhula", image: [aasan4], price: 210,bestseller:false,customizable:false },
    ],

    Festive: [
      { id: 40, name: "Rakhi Special", image: [diyaa1], price: 150,bestseller:false,customizable:false },
      { id: 41, name: "Rakhi Special", image: [diyaa2], price: 180,bestseller:true,customizable:false},
      { id: 42, name: "Floral ", image: [diyaa3], price: 250 ,bestseller:false,customizable:false},
      { id: 43, name: "Pooja Thali", image: [diyaa4], price: 200,bestseller:false,customizable:false },
    
    ],
    Karwachauth: [
      { id: 44, name: "Set of 3", image: [karwa1], price: 380,bestseller:false ,customizable:false},
      { id: 45, name: "Set of 5", image: [karwa2], price: 270,bestseller:false,customizable:false },
      { id: 46, name: "Set of 4", image: [karwa3], price: 300,bestseller:true ,customizable:false},
    
    ],

    WeddingBells: [
      { id: 47, name: "Mehndi Special   ", image: [wed1], price: 1450,bestseller:false,customizable:true},
      { id: 48, name: "Engagement Special", image: [wed2], price: 1180,bestseller:false ,customizable:false},
      { id: 49, name: "Wedding Special", image: [wed3], price: 1250 ,bestseller:true,customizable:false},
      { id: 50, name: "Haldi Special", image: [wed4], price: 1209,bestseller:false,customizable:true },
    
    ],
  },
};

// Flatten into a single array for easier use
export const products = Object.entries(categories).flatMap(
  ([category, subcategories]) =>
    Object.entries(subcategories).flatMap(([subcategory, items]) =>
      items.map((product) => ({
        commonProperties,
        product,
        category,
        subcategory,
      }))
    )
);
