import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PatientLogin = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    // Simulate authentication (replace with API call)
    if (formData.email && formData.password) {
      alert(isLogin ? 'Login successful!' : 'Account created!');
      navigate('/patients'); // Redirect to patient dashboard
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          {isLogin ? 'Sign in to your account' : 'Create new account'}
        </h2>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label htmlFor="name" className="sr-only">Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="Full Name"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-[#fbc2eb] focus:border-[#fbc2eb]"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              type="email"
              placeholder="Email address"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-[#fbc2eb] focus:border-[#fbc2eb]"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-[#fbc2eb] focus:border-[#fbc2eb]"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white font-medium rounded-md bg-gradient-to-r from-[#fbc2eb] to-[#a6c1ee] hover:opacity-90"
          >
            {isLogin ? 'Sign in' : 'Sign up'}
          </button>
        </form>

        <div className="text-center">
          <button className="text-[#a6c1ee] hover:text-[#fbc2eb]" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientLogin;
