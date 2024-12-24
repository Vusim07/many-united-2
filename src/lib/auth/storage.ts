// Constants for storage keys
const STORAGE_KEYS = {
	TEMP_ROLE: 'temp_user_role',
} as const;

export const tempStorage = {
	setRole: (role: string) => {
		localStorage.setItem('temp_user_role', role);
	},

	getRole: (): string | null => {
		return localStorage.getItem('temp_user_role');
	},

	clearRole: () => {
		localStorage.removeItem(STORAGE_KEYS as any);
	},
};
