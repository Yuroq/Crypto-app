const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const portSchema = new Schema({
  name: { type: String, default: undefined },
  image: {
    type: String,
    default: undefined,
  },
  price: {
    type: String,
    default: undefined,
  },
  userEmail: {
    type: String,
    default: undefined,

    validate: {
      validator: function (v) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  id: {
    type: Number,
    default: undefined,
  },
  quanity: {
    type: Number,
    default: undefined,
  },
});

module.exports = mongoose.model("Port", portSchema);
