const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require('fs');

const app = express();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse incoming requests with JSON payloads
app.use(express.static(path.join(__dirname, "uploads"))); // Serve static files like images from uploads

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Change this to your MySQL password if necessary
  database: "asbab_ecommerce_website", // Replace with your database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    process.exit(1); // Exit on database connection error
  }
  console.log("Connected to MySQL database");
});

//upload images to database
const uploadDir = path.join(__dirname, 'uploads/images');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage configuration for multer to save images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images"); // Specify your upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Use current timestamp to avoid name conflicts
  },
});

const upload = multer({ storage });


// ============user authentication=========

// SignUp Route
app.post("/signup", (req, res) => {
  const { fullname, email, mobile, password } = req.body;

  // Validate input
  if (!fullname || !email || !mobile || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Check if email already exists
  const checkEmailQuery = `SELECT * FROM users WHERE email = ?`;
  db.query(checkEmailQuery, [email], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Server error" });
    }

    if (result.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hashing the password before storing it
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({ error: "Server error during password encryption" });
      }

      // Insert the new user into the database
      const insertQuery = `INSERT INTO users (fullname, email, mobile, password) VALUES (?, ?, ?, ?)`;
      db.query(insertQuery, [fullname, email, mobile, hash], (err, result) => {
        if (err) {
          return res.status(500).json({ error: "Error registering user" });
        }
        res.status(201).json({ message: "User registered successfully" });
      });
    });
  });
});

// Login Route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  // Check if user exists
  const query = `SELECT * FROM users WHERE email = ?`;
  db.query(query, [email], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Server error" });
    }

    if (result.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const user = result[0];

    // Compare the hashed password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: "Server error during password comparison" });
      }

      if (!isMatch) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      // Generate JWT token
      const userToken = jwt.sign(
        { userId: user.user_id },
        process.env.JWT_SECRET || "your_jwt_secret",
        { expiresIn: "1h" } // Token valid for 1 hour
      );

      res.status(200).json({
        message: "Login successful",
        userToken, // Send token in response as expected by frontend
        userId: user.user_id, // Optional: Send user ID if needed on frontend
      });
    });
  });
});





// ============ Admin Panel Product Routes ============

// Add Product Route (Handles Image Upload)
app.post("/add-product", upload.fields([{ name: 'main_img' }, { name: 'other_images', maxCount: 4 }]), (req, res) => {
  const {
    product_title,
    old_price,
    new_price,
    category,
    sub_category,
    discount_offer,
  } = req.body;

  // Validate input
  if (!product_title || !old_price || !new_price || !category || !req.files.main_img) {
    return res.status(400).json({ error: "All required fields must be filled" });
  }

  const main_img_path = req.files.main_img[0].path; // Path of the main image
  const other_images_paths = req.files.other_images ? req.files.other_images.map(file => file.path) : []; // Paths for other images

  // SQL query to insert product details into the database
  const query = `
    INSERT INTO product_list (title, old_price, new_price, category, sub_category, discount, main_image, other_images) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      product_title,
      old_price,
      new_price,
      category,
      sub_category,
      discount_offer,
      main_img_path,
      JSON.stringify(other_images_paths), // Store other images as a JSON array
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting product:", err);
        return res.status(500).json({ error: "Error adding product" });
      }
      res.status(201).json({ message: "Product added successfully" });
    }
  );
});
// Serve all files in the "uploads" folder (this includes the "uploads/images" folder)
app.use('/uploads', express.static('uploads'));
// Route to fetch all products
app.get("/products", (req, res) => {
  const query = `SELECT * FROM product_list`;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching products:", err);
      return res.status(500).json({ error: "Error fetching products" });
    }
    res.status(200).json(result); // Return the products as JSON
  });
});


// =========frontend design ===========

// Route to add an item to the cart
app.post("/cart", (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || !quantity) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Check if product exists in the user's cart
  const checkCartQuery = `SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?`;

  db.query(checkCartQuery, [userId, productId], (err, result) => {
    if (err) {
      console.error("Error checking cart:", err); // Log error details
      return res.status(500).json({ error: "Error checking cart" });
    }

    if (result.length > 0) {
      // If product is already in the cart, update the quantity
      const updateQuery = `UPDATE cart_items SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?`;

      db.query(updateQuery, [quantity, userId, productId], (err, updateResult) => {
        if (err) {
          console.error("Error updating cart:", err); // Log the error here
          return res.status(500).json({ error: "Error updating cart" });
        }
        return res.status(200).json({ message: "Cart updated successfully" });
      });
    } else {
      // If product is not in the cart, insert a new entry
      const insertQuery = `INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)`;

      db.query(insertQuery, [userId, productId, quantity], (err, insertResult) => {
        if (err) {
          console.error("Error adding to cart:", err); // Log the error here
          return res.status(500).json({ error: "Error adding to cart" });
        }
        return res.status(201).json({ message: "Item added to cart" });
      });
    }
  });
});

// Route to get all items from the user's cart
app.get("/cart/:userId", (req, res) => {
  const { userId } = req.params;

  // Validate input
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  // Fetch all items in the user's cart
  const query = `SELECT ci.product_id, ci.quantity, p.title, p.new_price, p.main_image
                 FROM cart_items ci
                 JOIN product_list p ON ci.product_id = p.product_id
                 WHERE ci.user_id = ?`;

  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching cart items:", err);
      return res.status(500).json({ error: "Error fetching cart items" });
    }

    res.status(200).json(result); // Return the cart items
  });
});

// Route to delete an item from the cart
app.delete("/cart", (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ error: "User ID and Product ID are required" });
  }

  const deleteQuery = `DELETE FROM cart_items WHERE user_id = ? AND product_id = ?`;

  db.query(deleteQuery, [userId, productId], (err, result) => {
    if (err) {
      console.error("Error deleting item from cart:", err);
      return res.status(500).json({ error: "Error deleting item from cart" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    res.status(200).json({ message: "Item deleted from cart successfully" });
  });
});



// Start the server
app.listen(5002, () => {
  console.log("Server running on port 5002");
});
