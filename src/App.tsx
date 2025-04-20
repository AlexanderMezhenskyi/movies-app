import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from 'src/components/Header'
import Home from 'src/pages/Home'
import Loader from 'src/components/Loader'
import Sidebar from 'src/components/Sidebar'
import Footer from 'src/components/Footer'
import { FavoritesProvider } from 'src/context/FavoritesProvider'
import './App.scss'

const Favorites = lazy(() => import('src/pages/Favorites'))
const MovieDetails = lazy(() => import('src/pages/MovieDetails/MovieDetails'))

const App = () => {
  const location = useLocation()
  const showSidebar: boolean = location.pathname !== '/favorites'

  return (
    <FavoritesProvider>
      <Header />
      <div className={showSidebar ? 'main-container' : 'main-container full-width'}>
        {showSidebar && <Sidebar />}
        <main>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </Suspense>
        </main>
      </div>
      <Footer />
    </FavoritesProvider>
  )
}

export default App
