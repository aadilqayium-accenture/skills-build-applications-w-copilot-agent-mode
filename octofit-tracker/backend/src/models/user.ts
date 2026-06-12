import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  createdAt: Date;
  team?: mongoose.Types.ObjectId;
}

const UserSchema: Schema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: () => new Date() },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
