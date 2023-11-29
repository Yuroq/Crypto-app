// const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

// const portfolioSchema = new Schema({
//     name: { type: String, required:false },
//     image: {
//       type: String,
//       required: false,
//     },
//     userEmail: {
//       type: String,
//       required: false,
//       validate: {
//         validator: function (v) {
//           return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
//         },
//         message: (props) => `${props.value} is not a valid email address!`,
//       },
//     },
//   });
  
//   module.exports = mongoose.model("Portfolio", portfolioSchema);