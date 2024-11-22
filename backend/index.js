const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require('fs');
const SSLCommerzPayment = require('sslcommerz-lts');
// require('dotenv').config();

const { log } = require("console");
const { url } = require("inspector");

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
  const {username, fullname, email, mobile, password } = req.body;

  // Validate input
  if ( !fullname || !username || !email || !mobile || !password) {
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
      const insertQuery = `INSERT INTO users (fullname, username, email, mobile, password) VALUES (?, ?, ?, ?, ?)`;
      db.query(insertQuery, [fullname, username, email, mobile, hash], (err, result) => {
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


// =========frontend design ===========
//fetch product keywords and category for seraching
// Route to fetch search suggestions (category and keyword)
app.get("/search-suggestions", (req, res) => {
  const { query } = req.query; // Get the user's search input from the query parameter

  if (!query) {
    return res.status(400).json({ error: "Search query is required" });
  }

  const searchQuery = `
    SELECT DISTINCT category,product_keyword
    FROM product_list
    WHERE category LIKE ? OR product_keyword LIKE ?
  `;
  
  const searchTerm = `%${query}%`; // Add wildcards for partial matches

  db.query(searchQuery, [searchTerm, searchTerm], (err, result) => {
    if (err) {
      console.error("Error fetching search suggestions:", err);
      return res.status(500).json({ error: "Error fetching search suggestions" });
    }

    res.status(200).json(result); // Return the matched categories and keywords
  });
});


// Route to fetch products based on search query or category
app.get("/searched-products", (req, res) => {
  const { query } = req.query; // Get query parameter from URL

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  const searchQuery = `
    SELECT * FROM product_list
    WHERE category LIKE ? OR product_keyword LIKE ?
  `;

  const searchTerm = `%${query}%`;

  db.query(searchQuery, [searchTerm, searchTerm], (err, result) => {
    if (err) {
      console.error("Error fetching products:", err);
      return res.status(500).json({ error: "Error fetching products" });
    }

    res.status(200).json(result); // Return filtered products
  });
});




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

//ssLcommerze sandbox
require('dotenv').config();
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASS;
const is_live = false //true for live, false for sandbox
// console.log(store_id);
// console.log(store_passwd);


//sslcommerze payment method
app.post("/order", async (req, res) => {
  const {userId,shippingAddress, products, totalAmount,totalQuantity} = req.body;

  if (!userId || !shippingAddress || !products || !totalAmount || !totalQuantity) {
    return res.status(400).json({ error: "Missing required fields." });
  }
  const tran_id = "REF" + new Date().getTime();
  
  const products_id_qty =  products.map((p) => `[Product_ID:${p.product_id}, Qty:${p.quantity}]`).join(" ");
  const products_title =  products.map((p) => `[${p.title}]`).join(" ");

  const orderData = {
        total_amount: totalAmount,
        currency: 'BDT',
        tran_id: tran_id, // use unique tran_id for each api call
        success_url: `http://localhost:5002/payment/success/${tran_id}`,
        fail_url: `http://localhost:5002/payment/fail/${tran_id}`,
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: products.map((p) => `Product ID: ${p.product_id}`).join(", "),
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: shippingAddress.name,
        cus_email: 'customer@example.com',
        cus_add1: shippingAddress.address,
        cus_add2: 'Dhaka',
        cus_city: shippingAddress.city,
        cus_state: 'Dhaka',
        cus_postcode: shippingAddress.country,
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: shippingAddress.postalCode,
        ship_country: shippingAddress.country,
  };

  // console.log(orderData);
  
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz
  .init(orderData)
  .then((apiResponse) => {
    // console.log("API Response: ", apiResponse);  // Log the entire API response
    const GatewayPageURL = apiResponse.GatewayPageURL;
    if (!GatewayPageURL) {
      console.error("GatewayPageURL not found in the response");
    } else {
      // console.log("Redirecting to: ", GatewayPageURL);
      res.send({ url: GatewayPageURL });
    }

    const pendingOrderQuery = `
    INSERT INTO pending_orders (transaction_id, user_id, products_id_qty, products_title, total_amount, total_quantity, shipping_address)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(
    pendingOrderQuery,
    [tran_id, userId, products_id_qty, products_title, totalAmount, totalQuantity, JSON.stringify(shippingAddress)],
    (err, result) => {
      if (err) {
        console.error("Error inserting pending order:", err);
        return res.status(500).json({ error: "Failed to save pending order details." });
      }
      console.log("Pending order saved successfully");
    }
  );
  })
  .catch((error) => {
    console.error("SSLCommerz Initialization Error:", error);
    res.status(500).json({ error: "Payment gateway initialization failed" });
  });


app.post('/payment/success/:tranId', async(req,res)=>{

   const transaction_id = req.params.tranId;
   console.log("transaction id after pending: ",transaction_id);
   
    const getOrderQuery = `
    SELECT * FROM pending_orders WHERE transaction_id = ?
  `;
  
  db.query(getOrderQuery, [transaction_id], (err, rows) => {
    if (err || rows.length === 0) {
      console.error("Error fetching pending order:", err || "No data found");
      return res.status(500).json({ error: "Failed to fetch pending order details." });
    }
  
    const { user_id,products_title, total_amount, total_quantity, shipping_address } = rows[0];
  
    // Insert into orders table
    const insertOrderQuery = `
      INSERT INTO orders (user_id, transaction_id, products_title,total_quantity, total_price_amount, shipping_address)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(
      insertOrderQuery,
      [user_id, transaction_id,products_title,total_quantity,total_amount, shipping_address],
      (err, result) => {
        if (err) {
          console.error("Error inserting order:", err);
          return res.status(500).json({ error: "Failed to save order details." });
        }
  
        // Reset user's cart
        const resetCartQuery = `
          DELETE FROM cart_items WHERE user_id = ?
        `;
        db.query(resetCartQuery, [user_id], (err, result) => {
          if (err) {
            console.error("Error resetting cart:", err);
            return res.status(500).json({ error: "Failed to reset cart." });
          }
  
          console.log("Order processed and cart reset for user:", user_id);
          // res.redirect(`http://localhost:5173/payment/success/${transaction_id}`);
          res.redirect(`http://localhost:5173/payment/result?status=success&tranId=${transaction_id}`);
        });
      }
    );
  });
  
      // res.redirect(`http://localhost:5173/payment/success/${req.params.tranId}`);
  });

  app.post('/payment/fail/:tranId', async(req,res)=>{
    const tran_id = req.params.tranId;
    console.log("transaction_id", tran_id);
    // alert('Payment failed, Try again');
    // res.redirect(`http://localhost:5173/payment/fail/${req.params.tranId}`);
    // res.redirect('http://localhost:5173/billing');
    res.redirect(`http://localhost:5173/payment/result?status=fail&tranId=${tran_id}`);

    
  });

});







// Route to fetch user information
app.get("/user/:userId", (req, res) => {
  const { userId } = req.params; // Get the userId from the request parameters

  // Validate input
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  // SQL query to fetch user details based on userId
  const query = `SELECT fullname, username, email, mobile FROM users WHERE user_id = ?`;

  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching user information:", err);
      return res.status(500).json({ error: "Error fetching user information" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(result[0]); // Return the user information
  });
});



// ===============payment gateway implementation================








// ============ Admin Panel Product Routes ============//////////

// Add Product Route (Handles Image Upload)
app.post("/add-product", upload.fields([{ name: 'main_img' }, { name: 'other_images', maxCount: 4 }]), (req, res) => {
  const {
    product_title,
    product_keyword,
    product_description,
    old_price,
    new_price,
    category,
    sub_category,
    product_brand,
    discount_offer,
  } = req.body;

  // Validate input
  if (!product_title || !product_keyword || !product_description || !old_price || !new_price || !category || !sub_category || !product_brand || !req.files.main_img) {
    return res.status(400).json({ error: "All required fields must be filled" });
  }

  const main_img_path = req.files.main_img[0].path; // Path of the main image
  const other_images_paths = req.files.other_images ? req.files.other_images.map(file => file.path) : []; // Paths for other images

  // SQL query to insert product details into the database
  const query = `
    INSERT INTO product_list (title,product_keyword,product_description, old_price, new_price, category, sub_category,product_brand, discount, main_image, other_images) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      product_title,
      product_keyword,
      product_description,
      old_price,
      new_price,
      category,
      sub_category,
      product_brand,
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



// Route to fetch a product by its product_id
app.get("/products/:product_id", (req, res) => {
  const { product_id } = req.params;
 // Get product_id from URL parameters

 console.log('Requested product ID:', product_id);

  // SQL query to fetch product by product_id
  const query = `SELECT * FROM product_list WHERE product_id = ?`;

  db.query(query, [product_id], (err, result) => {
    if (err) {
      console.error("Error fetching product:", err);
      return res.status(500).json({ error: "Error fetching product" });
    }
    // If no product is found with the given product_id
    if (result.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    // Send the product data as a JSON response
    res.status(200).json(result[0]); // result[0] because only one product is expected by product_id
  });
});




//Route to fetch all users info
app.get("/users",(req,res)=>{
  const query = `SELECT * FROM users`;

  db.query(query,(err,result)=>{
    if(err){
      console.error("Error fetching users info",err);
      return res.status(500).json({error:"Error fetching users info"});
    }
    res.status(200).json(result);
  });
});








// Start the server
app.listen(5002, () => {
  console.log("Server running on port 5002");
});