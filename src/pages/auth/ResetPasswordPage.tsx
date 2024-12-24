import { Link } from 'react-router-dom';
import { Stethoscope } from 'lucide-react';
import { ResetPassword } from '@/components/auth/ResetPassword';

export function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Stethoscope className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Reset your password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email to receive reset instructions
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <ResetPassword />
          
          <div className="mt-4 text-center">
            <Link
              to="/sign-in"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}