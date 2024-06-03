import { z } from "zod";
import { patterns } from "../config/constants";

export const schema = z.object({
  firstName: z.string().min(1, { message: "First Name is required!" }),
  lastName: z.string().min(1, { message: "Last Name is required!" }),
  email: z
    .string()
    .min(1, { message: "Email is required!" })
    .refine((value) => patterns.email.test(value), {
      message: "Email not valid!",
    }),
  phoneNumber: z
    .string()
    .min(1, { message: "Phone Number is required!" })
    .max(10, {
      message: "Phone Number can't contains more than 10 characters!",
    }),
  avatar: z.string(),
});

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  avatar: "",
};
