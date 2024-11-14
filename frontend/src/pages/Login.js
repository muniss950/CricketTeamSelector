// import React, { useState } from 'react';
// import userService from '../services/userServices';

// const LoginPage = ({ onLogin }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const user = await userService.login({ username, password });
//       if (user) {
//         onLogin(user); // Set the user session or navigate to the dashboard
//       } else {
//         setError('Invalid username or password');
//       }
//     } catch (err) {
//       setError('Login failed. Please try again.');
//     }
//   };

//   return (
//     <div className="login-page">
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <div>
//           <label>Username:</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//       {error && <p className="error">{error}</p>}
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../services/userServices';

const LoginPage = ({ setIsAdmin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Attempt to fetch all users and validate login
    const users = await userService.getAllUsers();
    if (!users) {
      alert('Error fetching users.');
      return;
    }

    // Check if the user is the admin
    if (username === 'admin' && password === 'admin123') {
      setIsAdmin(true);
      navigate('/admin'); // Redirect to the admin page
    } else {
      // Check if username and password match a user in the users list
      const user = users.find((user) => user.username === username && user.password === password);
      if (user) {
        setIsAdmin(false); // Regular user login
        navigate('/'); // Redirect to the homepage or user-specific page
      } else {
        alert('Invalid credentials');
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
