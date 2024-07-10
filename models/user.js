import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: null
    },

    events: [{ type: Schema.Types.ObjectId, ref: "Events", default: [] }], // Event is optional, default to an empty array
    topics: [{ type: Schema.Types.ObjectId, ref: "Topic", default: [] }], // Topics is optional, default to an empty array
}, {
    timestamps: true,
}
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
