const Port = require("../models/portfolioModel");

const PortCoin = async (req, res) => {
  try {
    const { name, image, price, userEmail, id, quanity } = req.body;
    const existingLike = await Port.findOne({ userEmail, name });

    // if (existingLike) {
    //   return res.status(400).json({ msg: "You have already liked this coin" });
    // }

    const newLike = new Port({ name, image, price, userEmail, id, quanity });
    await newLike.save();

    res.json({ msg: "Coin liked successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const unPortCoin = async (req, res) => {
  try {
    const { id } = req.body;
    const existingLike = await Port.findOneAndDelete({ id });
    res.json({ msg: "Coin disliked successfully" });
  } catch (err) {
    console.error(err.data);
    res.status(500).send("Server error");
  }
};

const checkPortStatus = async (req, res) => {
  try {
    const { name, userEmail } = req.query; // or req.params, depending on how you set up your route
    const existingLike = await Port.findOne({ userEmail, name });

    // if (!existingLike) {
    //   return res.json({ liked: false, msg: "Coin is not liked" });
    // }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getListOfLikedPort = async (req, res) => {
  try {
    const { email } = req.params;
    const portCoins = await Port.find({ userEmail: email });
    res.json(portCoins);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  PortCoin,
  unPortCoin,
  checkPortStatus,
  getListOfLikedPort,
};
