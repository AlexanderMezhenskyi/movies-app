import { lazy, Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import Home from 'src/pages/Home'
import Loader from 'src/components/Loader'

const Favorites = lazy(() => import('src/pages/Favorites'))
const MovieDetails = lazy(() => import('src/pages/MovieDetails'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/movie/:id',
    element: (
      <Suspense fallback={<Loader />}>
        <MovieDetails />
      </Suspense>
    ),
  },
  {
    path: '/favorites',
    element: (
      <Suspense fallback={<Loader />}>
        <Favorites />
      </Suspense>
    ),
  },
] as RouteObject[]

export default routes
