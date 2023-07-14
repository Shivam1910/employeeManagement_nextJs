require("./DB/Connect");
const Express = require("express");
const App = Express();
const Model = require("./DB/User");
const Product = require("./DB/Products");
const Cors = require("cors");
App.use(Express.json());
App.use(Cors());

var jwt = require("jsonwebtoken");
const jwtkey = "IAMZUBI";

const Verify = (req, res, next) => {
  const token = req.headers["authorization"];

  if (token) {
    jwt.verify(token, jwtkey, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: "Invalid token" });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ error: "Token not provided" });
  }
};

App.post("/register", async (req, res) => {
  const data = new Model(req.body);
  try {
    const result = await data.save();
    const token = jwt.sign({ Result: result }, jwtkey);
    res.json({ Result: result, Token: token });
  } catch (error) {
    res.status(500).json({ error: "Error occurred while registering" });
  }
});

App.post("/login", async (req, res) => {
  try {
    const data = await Model.findOne(req.body).select("-Password");
    if (data) {
      const token = jwt.sign({ Data: data }, jwtkey);
      res.json({ Result: data, Token: token });
    } else {
      res.status(404).json({ Error: "No Account Available" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error occurred while logging in" });
  }
});

App.post("/add-product", Verify, async (req, res) => {
  const data = new Product(req.body);
  try {
    const result = await data.save();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error occurred while adding product" });
  }
});

App.get("/", Verify, async (req, res) => {
  try {
    const data = await Product.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error occurred while fetching data" });
  }
});

App.delete("/delete/:_id", Verify, async (req, res) => {
  try {
    const data = await Product.deleteOne(req.params);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error occurred while deleting product" });
  }
});

App.put("/update/:_id", Verify, async (req, res) => {
  try {
    const data = await Product.updateOne(req.params, { $set: req.body });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error occurred while updating product" });
  }
});

App.get("/single/:_id", Verify, async (req, res) => {
  try {
    const data = await Product.findOne(req.params);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error occurred while fetching product" });
  }
});

App.listen(4500);
