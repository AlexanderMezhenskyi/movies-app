import { Routes, Route, useLocation } from 'react-router-dom';
import Favorites from 'src/pages/Favorites';
import Header from 'src/components/Header';
import Home from 'src/pages/Home';
import MovieDetails from 'src/pages/MovieDetails/MovieDetails';
import Sidebar from 'src/components/Sidebar';
import Footer from 'src/components/Footer';
import { FavoritesProvider } from 'src/context/FavoritesProvider';
import './App.scss';

const App = () => {
  const location = useLocation();
  const showSidebar: boolean = location.pathname !== '/favorites';

  return (
    <FavoritesProvider>
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
    </FavoritesProvider>
  );
};

export default App;
