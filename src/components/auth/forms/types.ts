import { z } from 'zod';
import { signUpSchema } from './validation';

export type SignUpFormData = z.infer<typeof signUpSchema>;