import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages Import කරගන්න
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Dining from './pages/Dining';
import Facilities from './pages/Facilities';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      {/* Navbar එක Routes වලට උඩින් තිබිය යුතුය */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/dining" element={<Dining />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;