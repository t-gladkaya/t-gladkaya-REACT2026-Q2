import { z } from 'zod';

export const countries = ["Belarus", "Poland", "Georgia", "Germany", "Armenia", "Lithuania"];

const MAX_IMAGE_SIZE = 1024 * 1024;

const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg"];

const isValidEmail = (email: string) => {
  const parts = email.split("@");

  if (parts.length !== 2) return false;

  const [localPart, domain] = parts;

  if (!localPart || !domain) return false;
  if (!domain.includes(".")) return false;

  return true;
};

export const createFormSchema = (storedCountries: readonly string[] = countries) => z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(50, "Name must be at most 50 characters")
      .refine((value) => value[0] === value[0]?.toUpperCase(), {
        message: "Name must start with a capital letter",
      }),
    
    age: z.preprocess(
      (value) => (value === "" ? undefined : value),
      z.coerce
        .number({
          message: "Age is required and must be a number",
        })
        .min(0, "Age cannot be negative")
    ),

    email: z
      .string()
      .min(1, "Please enter a valid email address")
      .refine(isValidEmail, {
        message: "Email must contain one @ and a domain with a dot",
      }),

    gender: z
      .enum(["male", "female", "other"], {
        message: "Please select a gender",
      }),

    terms: z.literal(true, {
      message: "You must accept Terms and Conditions",
    }),

    password: z
      .string()
      .min(1, "Password is required"),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),

    country: z
      .string()
      .refine((value) => storedCountries.includes(value), {
        message: "Please select a country from the list",
      }),

    image: z
      .instanceof(File, { message: "Image is required" })
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: "Only PNG and JPEG images are allowed",
      })
      .refine((file) => file.size <= MAX_IMAGE_SIZE, {
        message: "Image must be smaller than 1MB",
      }),
    })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const formSchema = createFormSchema();
export type FormValues = z.infer<typeof formSchema>;
