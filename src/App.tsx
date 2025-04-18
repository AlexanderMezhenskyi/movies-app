import { Routes, Route, useLocation } from 'react-router-dom';
import Favorites from './pages/Favorites';
import Header from './components/Header';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails/MovieDetails.tsx';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import './App.scss';

const App = () => {
  const location = useLocation();
  const showSidebar: boolean = location.pathname !== '/favorites';

  return (
    <>
      <Header />
      <div className={showSidebar ? 'main-container' : 'main-container full-width'}>
        {showSidebar && <Sidebar />}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default App;
