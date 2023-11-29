const express = require("express");
const router = express.Router();
const {
  PortCoin,
  unPortCoin,
  checkPortStatus,
  getListOfLikedPort,
} = require("../controllers/portfolioController");

router.post("/portfolio", PortCoin);
router.delete("/remove", unPortCoin);
router.get("/check", checkPortStatus);
router.get("/portfoliolist/:email", getListOfLikedPort);

module.exports = router;
