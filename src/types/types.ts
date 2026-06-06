export type Submission = {
  id: string;
  source: 'controlled' | 'uncontrolled';
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  createdAt: string;
}