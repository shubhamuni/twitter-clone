import mongoose, { model, models, Schema } from "mongoose";

const PostSchema = new Schema({
    author: { type: mongoose.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
    text: { type: String, required: true },
    likesCount: {type: Number, default: 0}
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Check if the Post model already exists in mongoose models, if not, create it
const Post = models.Post || model('Post', PostSchema);

export default Post;
