'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginSchema, LoginFormValues } from '../../features/auth/auth-schema';
import { authService } from '../../services/auth.service';
import { useAuth } from '../../features/auth/AuthContext';

// Assets
const logo = '/assets/logos/logo.png';
const illustration = '/assets/illustrations/pablo-sign-in 1.png';

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { login: updateAuthState } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setServerError(null);
      const { user, token } = await authService.login(data);
      updateAuthState(user, token);
      router.push('/dashboard');
    } catch (error) {
      setServerError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="left-side">
        <div className="logo">
          <img src={logo} alt="Lendsqr Logo" />
        </div>
        <div className="illustration">
          <img src={illustration} alt="Login Illustration" />
        </div>
      </div>

      <div className="right-side">
        <div className="form-container">
          <h1>Welcome!</h1>
          <p>Enter details to login.</p>

          {serverError && (
            <div className="error-message" style={{ marginBottom: '1rem', color: '#E4033B' }}>
              {serverError}
            </div>
          )}

          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                {...register('email')}
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}
            </div>

            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                {...register('password')}
                aria-invalid={errors.password ? 'true' : 'false'}
              />
              <button
                type="button"
                className="show-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'HIDE' : 'SHOW'}
              </button>
              {errors.password && (
                <span className="error-message">{errors.password.message}</span>
              )}
            </div>

            <Link href="/forgot-password" title="Forgot password?" className="forgot-password">
              Forgot Password?
            </Link>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Log In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
