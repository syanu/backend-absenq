import mongoose, { Document } from "mongoose";

interface ISesiAbsensi extends Document {
    user_id: mongoose.Schema.Types.ObjectId;
    name: String;
    location_name: String;
    location_lat: String;
    location_lng: String;
    notes?: String;
    date_start: Date;
    date_end: Date;
    created_at: Date
}

const SesiAbsensiSchema = new mongoose.Schema<ISesiAbsensi>({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    name: { type: String, required: true },
    location_name: { type: String, required: false },
    location_lat: { type: String, required: false },
    location_lng: { type: String, required: false },
    notes: { type: String },
    date_start: { type: Date, required: true },
    date_end: { type: Date, required: true },
    created_at: { type: Date, default: Date.now },
});

export default mongoose.model<ISesiAbsensi>("Sesi_Absensis", SesiAbsensiSchema);