import { Schema, model, Document } from 'mongoose';

export interface UserDocument extends Document {
  email: string;
  name: string;
  age?: number;
  city?: string;
  zipCode: string;
  deleted: boolean;
}

const userSchema = new Schema<UserDocument>({
  email: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number },
  city: { type: String },
  zipCode: { type: String, required: true },
  deleted: { type: Boolean, default: false }
});

export default model<UserDocument>('User', userSchema);
