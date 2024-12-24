import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';
import { ClerkSetup } from './components/auth/ClerkSetup';
import { SignIn } from './components/auth/SignIn';
import { SignUp } from './components/auth/SignUp';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';
import { UpdatePasswordPage } from './pages/auth/UpdatePasswordPage';
import { CompleteProfilePage } from './pages/auth/CompleteProfilePage';
import { AuthenticatedRoute } from './components/auth/AuthenticatedRoute';
import DoctorDashboard from './pages/doctor/Dashboard';
import CHWDashboard from './pages/chw/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import { Toaster } from './components/ui/toaster';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/update-password" element={<UpdatePasswordPage />} />
            <Route
              path="/complete-profile"
              element={
                <AuthenticatedRoute>
                  <CompleteProfilePage />
                </AuthenticatedRoute>
              }
            />
            
            <Route
              path="/doctor/*"
              element={
                <AuthenticatedRoute allowedRoles={['doctor']}>
                  <DoctorDashboard />
                </AuthenticatedRoute>
              }
            />
            
            <Route
              path="/chw/*"
              element={
                <AuthenticatedRoute allowedRoles={['chw']}>
                  <CHWDashboard />
                </AuthenticatedRoute>
              }
            />
            
            <Route
              path="/admin/*"
              element={
                <AuthenticatedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </AuthenticatedRoute>
              }
            />
            
            <Route path="/" element={<ClerkSetup />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;