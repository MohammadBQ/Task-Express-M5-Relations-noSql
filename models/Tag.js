const { model, Schema } = require("mongoose");

const tagSchema = new Schema({
  name: String,
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

module.exports = model("Tag", tagSchema);