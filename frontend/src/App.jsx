// // src/App.jsx
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Check from './components/Check';
import History from './components/History';
import ProtectedLanding from './page/ProtectedLanding';

// const PrivateRoute = ({ element, ...rest }) => {
//   const { user } = useAuth();
//   return user ? element : <Navigate to="/" />;
// };

function App() {
  return (
    <ChakraProvider>
        <Router>
          <Routes>
            <Route path="/his" element={<History />} />
            <Route path="/check" element={<Check />} />
            <Route path="/protected-landing" element={<ProtectedLanding />} />
            <Route path="/" element={<ProtectedLanding />} />
          </Routes>
        </Router>
    </ChakraProvider>
  );
}

export default App;















// src/App.jsx
// import React from 'react';
// import { ChakraProvider } from '@chakra-ui/react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Landing from './page/Landing';
// import Check from './components/Check';
// import History from './components/History';
// import Login from './components/Login';
// import ProtectedLanding from './page/ProtectedLanding';
// import { AuthProvider, useAuth } from './utils/AuthContext'; // Import the AuthProvider and useAuth

// const PrivateRoute = ({ element, ...rest }) => {
//   const { user } = useAuth();
//   return user ? element : <Navigate to="/" />;
// };

// function App() {
//   return (
//     <ChakraProvider>
//       <AuthProvider>
//         <Router>
//           <Routes>
//             <Route path="/" element={<Landing />} />
//             <Route path="/landing" element={<Landing />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/his" element={<History />} />
//             <Route path="/check" element={<Check />} />
//             <Route path="/protected-landing" element={<PrivateRoute element={<ProtectedLanding />} />} />
//           </Routes>
//         </Router>
//       </AuthProvider>
//     </ChakraProvider>
//   );
// }

// export default App;
