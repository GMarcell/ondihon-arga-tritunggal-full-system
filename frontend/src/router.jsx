import {createBrowserRouter} from 'react-router-dom'
import Home from './views/Home'
import Service from './views/Service'
import Contact from './views/Contact'
import NewsArticle from './views/NewsArticle'
import Customers from './views/Customers'
import GuestLayout from './layout/GuestLayout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/service',
        element: <Service/>
      },
      {
        path: '/contacts',
        element: <Contact/>
      },
      {
        path: '/news-article',
        element: <NewsArticle/>
      },
      {
        path: '/customers',
        element: <Customers/>
      },
    ]
  },
])

export default router