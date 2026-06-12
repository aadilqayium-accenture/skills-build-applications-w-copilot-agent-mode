import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  exercises: Array<{ name: string; reps?: number; sets?: number; durationMinutes?: number }>;
  date: Date;
}

const WorkoutSchema: Schema = new Schema<IWorkout>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  exercises: [{ name: String, reps: Number, sets: Number, durationMinutes: Number }],
  date: { type: Date, default: () => new Date() },
});

export default mongoose.models.Workout || mongoose.model<IWorkout>('Workout', WorkoutSchema);
