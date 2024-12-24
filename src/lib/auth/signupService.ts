import { SignUp } from '@clerk/clerk-react';
import { SignUpData } from '@/types/auth';
import { AuthError, CaptchaError } from './errors';
import { validateRole } from './utils/roleValidation';
import { tempStorage } from './storage';

export async function createUserAccount(signUp: SignUp, data: SignUpData) {
	if (!signUp) {
		throw new AuthError('Signup service not available');
	}

	try {
		// Validate role
		const validatedRole = validateRole(data.role);

		// Store role temporarily
		tempStorage.setRole(validatedRole);

		// Create user with metadata
		const result = await signUp.create({
			emailAddress: data.email,
			password: data.password,
			firstName: data.firstName,
			lastName: data.lastName,
			publicMetadata: {
				role: validatedRole,
			},
		});

		if (!result) {
			throw new Error('Failed to create user account');
		}

		// Log to verify metadata was set
		console.log('User created with metadata:', {
			publicMetadata: result.publicMetadata,
			storedRole: tempStorage.getRole(),
		});

		// If the metadata wasn't set properly, try to update it
		if (!result.publicMetadata?.role) {
			console.log('Metadata not set during creation, attempting update...');
			try {
				await result.update({
					publicMetadata: {
						role: validatedRole,
					},
				});
			} catch (updateError) {
				console.error('Failed to update metadata:', updateError);
			}
		}

		return result;
	} catch (error: any) {
		console.error('Signup error details:', error);

		// Clean up storage
		tempStorage.clearRole();

		if (
			error.code === 'captcha_invalid' ||
			error.code === 'captcha_unavailable'
		) {
			throw new CaptchaError('Security verification failed. Please try again.');
		}

		if (error.errors?.length > 0) {
			throw new AuthError(error.errors[0].message, error.errors[0].code);
		}

		throw new AuthError(
			error.message || 'Failed to create account',
			error.code,
			error,
		);
	}
}
