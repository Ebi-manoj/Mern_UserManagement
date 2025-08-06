import z from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'password required'),
});

export const signSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Min 3 characters required')
      .regex(
        /^(?!_+$)[a-zA-Z0-9_]+$/,
        'Enter characters,only special characters not allowed'
      ),
    email: z.string().email('Enter a valid email'),
    password: z.string().min(6, 'Password must be 6 characters length'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password == data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password dont match',
  });

export const editSchema = z.object({
  username: z
    .string()
    .min(3, 'Min 3 characters required')
    .regex(
      /^(?!_+$)[a-zA-Z0-9_]+$/,
      'Enter characters,only special characters not allowed'
    ),
  email: z.string().email('Enter a valid email'),
});
