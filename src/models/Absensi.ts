import mongoose, { Document } from "mongoose";

interface IAbsensi extends Document {
    sesi_id: mongoose.Schema.Types.ObjectId;
    user_id: mongoose.Schema.Types.ObjectId;
    created_at: Date;
}

const AbsensiSchema = new mongoose.Schema<IAbsensi>({
    sesi_id: { type: mongoose.Schema.Types.ObjectId, ref: "Sesi_Absensis", required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    created_at: { type: Date, default: Date.now },
});

export default mongoose.model<IAbsensi>("Absensis", AbsensiSchema);