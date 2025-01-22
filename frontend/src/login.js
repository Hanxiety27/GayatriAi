import { useState, useEffect } from 'react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('login'); // Set default ke login
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  // Cek token saat aplikasi dimuat
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setCurrentPage('main');
    }
  }, []);

  const LoginPage = () => {
    const [formData, setFormData] = useState({
      username: '',
      password: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError('');

      // Validasi input
      if (!formData.username || !formData.password) {
        setError('Username dan password harus diisi');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5173/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Tambahkan ini untuk handle cookies
          body: JSON.stringify(formData)
        });

        // Pastikan response bisa di-parse sebagai JSON
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Login gagal');
        }

        // Simpan token dan user info
        localStorage.setItem('token', data.token);
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        
        setIsAuthenticated(true);
        setCurrentPage('main');
      } catch (err) {
        console.error('Login error:', err);
        setError(err.message || 'Terjadi kesalahan saat login');
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">
              {error}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Username"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                disabled={isLoading}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              className={`w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-200 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setCurrentPage('login');
  };

  // Render conditional berdasarkan state authentication
  return (
    <>
      {currentPage === 'login' ? (
        <LoginPage />
      ) : (
        <MainPage onLogout={handleLogout} />
      )}
    </>
  );
}