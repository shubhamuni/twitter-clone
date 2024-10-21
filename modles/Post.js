import mongoose, { model, models, Schema } from "mongoose";

const PostSchema = new Schema({
    author: { type: mongoose.Types.ObjectId, ref: 'User' }, // Reference to the User model
    text: { type: String, required: true }                  // Text field with validation
}, {
        timestamps: true
    },
);

// Check if the Post model already exists in mongoose models, if not, create it
const Post = models.Post || model('Post', PostSchema);

export default Post;
