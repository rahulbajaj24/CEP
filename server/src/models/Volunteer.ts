import mongoose, { Schema, Document } from 'mongoose';

export interface IVolunteer extends Document {
  name: string;
  email: string;
  phone: string;
  interest: 'Education' | 'Healthcare' | 'Food';
  location: string;
  createdAt: Date;
}

const volunteerSchema = new Schema<IVolunteer>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    interest: {
      type: String,
      required: [true, 'Interest is required'],
      enum: {
        values: ['Education', 'Healthcare', 'Food'],
        message: '{VALUE} is not a valid interest. Choose from Education, Healthcare, or Food.',
      },
    },
    location: {
      type: String,
      default: 'Nigdi',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IVolunteer>('Volunteer', volunteerSchema);
