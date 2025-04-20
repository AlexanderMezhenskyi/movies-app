import { Suspense } from 'react'
import { useLocation, useRoutes } from 'react-router-dom'
import Header from 'src/components/Header'
import Loader from 'src/components/Loader'
import Sidebar from 'src/components/Sidebar'
import Footer from 'src/components/Footer'
import routes from 'src/routes'
import { FavoritesProvider } from 'src/context/FavoritesProvider'
import './App.scss'

const App = () => {
  const routing = useRoutes(routes)
  const location = useLocation()
  const showSidebar: boolean = location.pathname !== '/favorites'

  return (
    <FavoritesProvider>
      <Header />
      <div className={showSidebar ? 'main-container' : 'main-container full-width'}>
        {showSidebar && <Sidebar />}
        <main>
          <Suspense fallback={<Loader />}>{routing}</Suspense>
        </main>
      </div>
      <Footer />
    </FavoritesProvider>
  )
}

export default App
