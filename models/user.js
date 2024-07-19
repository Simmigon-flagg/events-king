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
    admin: {
        type: Boolean,
        default: false
    },
    
        
    

    firstname: String,
    lastname: String,
    title: String,
    phone: String,
    aboutme: String,
    company: String,
    description: String,
    presentation: String,
   
    events: [{ type: Schema.Types.ObjectId, ref: "Events", default: [] }], // Event is optional, default to an empty array
    topics: [{ type: Schema.Types.ObjectId, ref: "Topic", default: [] }], // Topics is optional, default to an empty array
}, {
    timestamps: true,
}
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
