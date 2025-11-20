const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Product = require('../models/Product');
const connectDB = require('../config/db');

const products = [
  // Traditional Sweets
  {
    name: "Besan Ladoo",
    category: "Traditional Sweets",
    price: 350,
    description: "Classic ladoo made with roasted gram flour and desi ghee",
    rating: 4.8,
    image_url: "https://via.placeholder.com/300?text=Besan+Ladoo"
  },
  {
    name: "Motichoor Ladoo",
    category: "Traditional Sweets",
    price: 380,
    description: "Tiny boondi pearls in sweet sugar syrup",
    rating: 4.7,
    image_url: "https://via.placeholder.com/300?text=Motichoor+Ladoo"
  },
  {
    name: "Gulab Jamun",
    category: "Traditional Sweets",
    price: 400,
    description: "Soft milk solids dumplings in rose-flavored syrup",
    rating: 4.9,
    image_url: "https://via.placeholder.com/300?text=Gulab+Jamun"
  },
  {
    name: "Jalebi",
    category: "Traditional Sweets",
    price: 320,
    description: "Crispy spiral-shaped sweet soaked in sugar syrup",
    rating: 4.6,
    image_url: "https://via.placeholder.com/300?text=Jalebi"
  },
  
  // Dry Fruits Sweets
  {
    name: "Kaju Katli",
    category: "Dry Fruits Sweets",
    price: 650,
    description: "Premium cashew fudge with edible silver leaf",
    rating: 5.0,
    image_url: "https://via.placeholder.com/300?text=Kaju+Katli"
  },
  {
    name: "Pista Barfi",
    category: "Dry Fruits Sweets",
    price: 600,
    description: "Rich pistachio fudge with authentic flavor",
    rating: 4.8,
    image_url: "https://via.placeholder.com/300?text=Pista+Barfi"
  },
  {
    name: "Badam Halwa",
    category: "Dry Fruits Sweets",
    price: 550,
    description: "Creamy almond pudding with pure ghee",
    rating: 4.7,
    image_url: "https://via.placeholder.com/300?text=Badam+Halwa"
  },
  {
    name: "Dry Fruit Ladoo",
    category: "Dry Fruits Sweets",
    price: 580,
    description: "Mixed dry fruits and dates energy balls",
    rating: 4.9,
    image_url: "https://via.placeholder.com/300?text=Dry+Fruit+Ladoo"
  },

  // Milk-based Sweets
  {
    name: "Milk Cake",
    category: "Milk-based Sweets",
    price: 420,
    description: "Traditional milk cake with caramelized texture",
    rating: 4.6,
    image_url: "https://via.placeholder.com/300?text=Milk+Cake"
  },
  {
    name: "Rabri",
    category: "Milk-based Sweets",
    price: 380,
    description: "Thickened sweetened milk with dried fruits",
    rating: 4.7,
    image_url: "https://via.placeholder.com/300?text=Rabri"
  },
  {
    name: "Kalakand",
    category: "Milk-based Sweets",
    price: 400,
    description: "Soft milk cake with granular texture",
    rating: 4.8,
    image_url: "https://via.placeholder.com/300?text=Kalakand"
  },
  {
    name: "Peda",
    category: "Milk-based Sweets",
    price: 360,
    description: "Traditional milk sweet flavored with cardamom",
    rating: 4.5,
    image_url: "https://via.placeholder.com/300?text=Peda"
  },

  // Bengali Sweets
  {
    name: "Rasgulla",
    category: "Bengali Sweets",
    price: 340,
    description: "Spongy cottage cheese balls in sugar syrup",
    rating: 4.8,
    image_url: "https://via.placeholder.com/300?text=Rasgulla"
  },
  {
    name: "Sandesh",
    category: "Bengali Sweets",
    price: 380,
    description: "Delicate cottage cheese sweet with subtle sweetness",
    rating: 4.7,
    image_url: "https://via.placeholder.com/300?text=Sandesh"
  },
  {
    name: "Rasmalai",
    category: "Bengali Sweets",
    price: 420,
    description: "Cottage cheese discs in thickened milk",
    rating: 4.9,
    image_url: "https://via.placeholder.com/300?text=Rasmalai"
  },
  {
    name: "Chomchom",
    category: "Bengali Sweets",
    price: 360,
    description: "Oval-shaped sweet with coconut coating",
    rating: 4.6,
    image_url: "https://via.placeholder.com/300?text=Chomchom"
  },

  // Festival Special
  {
    name: "Gujiya",
    category: "Festival Special",
    price: 400,
    description: "Crescent-shaped pastry filled with khoya and dry fruits",
    rating: 4.8,
    image_url: "https://via.placeholder.com/300?text=Gujiya"
  },
  {
    name: "Puran Poli",
    category: "Festival Special",
    price: 350,
    description: "Sweet flatbread with lentil and jaggery filling",
    rating: 4.7,
    image_url: "https://via.placeholder.com/300?text=Puran+Poli"
  },
  {
    name: "Modak",
    category: "Festival Special",
    price: 380,
    description: "Steamed dumplings with coconut and jaggery",
    rating: 4.9,
    image_url: "https://via.placeholder.com/300?text=Modak"
  },
  {
    name: "Shankarpali",
    category: "Festival Special",
    price: 280,
    description: "Crispy diamond-shaped sweet snack",
    rating: 4.5,
    image_url: "https://via.placeholder.com/300?text=Shankarpali"
  },

  // Samosas & Kachoris
  {
    name: "Classic Samosa",
    category: "Samosas & Kachoris",
    price: 200,
    description: "Crispy triangular pastry with spiced potato filling",
    rating: 4.8,
    image_url: "https://via.placeholder.com/300?text=Classic+Samosa"
  },
  {
    name: "Punjabi Samosa",
    category: "Samosas & Kachoris",
    price: 220,
    description: "Large crispy samosa with authentic Punjabi spices",
    rating: 4.7,
    image_url: "https://via.placeholder.com/300?text=Punjabi+Samosa"
  },
  {
    name: "Aloo Tikki",
    category: "Samosas & Kachoris",
    price: 150,
    description: "Spiced potato patties, crispy on the outside",
    rating: 4.6,
    image_url: "https://via.placeholder.com/300?text=Aloo+Tikki"
  },
  {
    name: "Kachori",
    category: "Samosas & Kachoris",
    price: 180,
    description: "Round, crispy pastry with spicy dal filling",
    rating: 4.8,
    image_url: "https://via.placeholder.com/300?text=Kachori"
  },

  // Namkeens
  {
    name: "Bhujia",
    category: "Namkeens",
    price: 250,
    description: "Thin, crispy chickpea noodles with spices",
    rating: 4.7,
    image_url: "https://via.placeholder.com/300?text=Bhujia"
  },
  {
    name: "Moong Dal Namkeen",
    category: "Namkeens",
    price: 280,
    description: "Roasted moong dal with aromatic spices",
    rating: 4.6,
    image_url: "https://via.placeholder.com/300?text=Moong+Dal"
  },
  {
    name: "Chikhalwali",
    category: "Namkeens",
    price: 220,
    description: "Traditional Bengal gram snack",
    rating: 4.5,
    image_url: "https://via.placeholder.com/300?text=Chikhalwali"
  },

  // Chaklis & Murukku
  {
    name: "Chakli",
    category: "Chaklis & Murukku",
    price: 300,
    description: "Spiral-shaped savory snack made with rice flour",
    rating: 4.8,
    image_url: "https://via.placeholder.com/300?text=Chakli"
  },
  {
    name: "Murukku",
    category: "Chaklis & Murukku",
    price: 320,
    description: "Twisted, crispy savory snack from South India",
    rating: 4.7,
    image_url: "https://via.placeholder.com/300?text=Murukku"
  }
];

async function seedProducts() {
  try {
    await connectDB();
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Insert new products
    const createdProducts = await Product.insertMany(products);
    console.log(`Successfully seeded ${createdProducts.length} products`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();
