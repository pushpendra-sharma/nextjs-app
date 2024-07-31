import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import { FormModel, IForm } from '@/models/formModel';

export async function connectToDB() {
  const dbUri = 'mongodb://127.0.0.1:27017/FormDB';

  try {
    await mongoose.connect(dbUri);
    console.log('Connected to DB...');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Connection to DB Failed!', error.message);
    }
  }
}

export const validateFormDetails = async (data: IForm) => {
  const { name } = data;
  if (name) {
    return true;
  }
  return false;
};

export async function createForm(input: IForm) {
  try {
    const result = await FormModel.create(input);
    return result;
  } catch (e) {
    throw e;
  }
}

export default async function formHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const isValidForm = await validateFormDetails(req.body);
    await connectToDB();
    if (isValidForm) {
      await createForm(req.body);

      res.status(201).json({
        success: true,
        message: 'Form submitted successfully!',
      });
    } else {
      throw new Error('Invalid details.');
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
}
