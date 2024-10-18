// models/Users.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    image: String,
    username: String,
});

// Export the User model, using `mongoose.models` to prevent overwriting
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
