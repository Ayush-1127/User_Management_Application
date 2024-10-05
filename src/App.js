import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import UserDetails from './UserDetails'; // This should be the component for displaying user details

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/:id" element={<UserDetails />} />
    </Routes>
  );
}

export default App;
