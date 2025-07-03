import { Schema, model, InferSchemaType } from "mongoose";

const schemaUser = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["admin", "user"], default: "user" },
});
type IUser = InferSchemaType<typeof schemaUser>;
export default model<IUser>("Users", schemaUser);
