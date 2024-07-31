import mongoose, { Document, Schema } from 'mongoose';

export interface IForm {
  name: string;
}

export interface FormDocument extends IForm, Document {
  createdAt: Date;
  updatedAt: Date;
}

const formSchema = new Schema(
  {
    name: { type: String },
  },
  {
    timestamps: true,
  }
);

export const FormModel = mongoose.model<FormDocument>('form', formSchema);
