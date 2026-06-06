export type Gender = 'male' | 'female' | 'other';

export type Submission = {
  id: string;
  source: 'uncontrolled' | 'react-hook-form';
  name: string;
  age: number;
  email: string;
  gender: Gender;
  terms: boolean;
  image: string;
  password: string;
  confirmPassword: string;
  country: string;
  createdAt: string;
}

export type FormType = 'uncontrolled' | 'react-hook-form' | null;
export type FormSource = Exclude<FormType, null>;

export type FormProps = {
  onSuccess: () => void;
}