import {createBrowserRouter} from 'react-router-dom'
import GuestLayout from './layout/GuestLayout'
import Home from './views/guest/Home'
import Contact from './views/guest/Contact'
import Service from './views/guest/Service'
import NewsArticle from './views/guest/NewsArticle'
import Customers from './views/guest/Customers'
import AdminLayout from './layout/AdminLayout'
import Dashboard from './views/admin/Dashboard'

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
  {
    path: '/administrator',
    element: <AdminLayout/>,
    children: [
      {
        path: '/administrator/dashboard',
        element: <Dashboard/>,
      },
      {
        path: '/administrator/user-management',
        element: <Dashboard/>,
      },
      {
        path: '/administrator/customer-management',
        element: <Dashboard/>,
      },
      {
        path: '/administrator/news-management',
        element: <Dashboard/>,
      },
      {
        path: '/administrator/article-management',
        element: <Dashboard/>,
      },
    ]
  }
])

export default router