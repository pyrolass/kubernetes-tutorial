const jwt = require("jsonwebtoken");
const db = require("../db/pyroshipping");

const authenticate = async (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  const parts = token ? token.split(" ") : [];

  try {
    jwt.verify(parts[1], process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }

      const user = await db("customers")
        .where({ customer_id: decoded.id, deleted: 0 })
        .first();
      req.user = user;

      if (!user) return res.status(401).send({ message: "Unauthorized!" });

      next();
    });
  } catch (err) {
    return res.status(401).json({
      message: err.toString(),
    });
  }
};

const authorize = async (req, res, next) => {
  const { customer_id } = req.user;

  try {
    const customer = await db("customers").where({ customer_id }).first();

    if (customer.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  authenticate,
  authorize,
};
