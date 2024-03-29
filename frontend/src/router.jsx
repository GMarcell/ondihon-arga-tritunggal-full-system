import {createBrowserRouter} from 'react-router-dom'
import GuestLayout from './layout/GuestLayout'
import Home from './views/guest/Home'
import Contact from './views/guest/Contact'
import Service from './views/guest/Service'
import NewsArticle from './views/guest/NewsArticle'
import Customers from './views/guest/Customers'
import AdminLayout from './layout/AdminLayout'
import Dashboard from './views/admin/Dashboard'
import UserManagementList from './views/admin/user-management/list'
import ArticleManagementList from './views/admin/article-management/list'
import CustomerManagementList from './views/admin/customer-management/list'
import NewsManagementList from './views/admin/news-management/list'
import SignIn from './views/guest/SignIn'
import SignUp from './views/guest/SignUp'
import ProductManagementList from './views/admin/product-management/list'
import UserForm from './views/admin/user-management/form'
import NewsForm from './views/admin/news-management/form'
import ArticleForm from './views/admin/article-management/form'
import CustomerForm from './views/admin/customer-management/form'
import ProductForm from './views/admin/product-management/form'
import Products from './views/guest/Products'
import DetailProduct from './views/guest/DetailProduct'

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
      {
        path: '/product/:id',
        element: <Products/>
      },
      {
        path: '/product/detail/:id',
        element: <DetailProduct type={'Product'}/>
      },
      {
        path: '/news/detail/:id',
        element: <DetailProduct key={'news'} type={'News'}/>
      },
      {
        path: '/article/detail/:id',
        element: <DetailProduct key={'article'} type={'Article'}/>
      },
      {
        path: '/signup',
        element: <SignUp/>
      },
      {
        path: '/signin',
        element: <SignIn/>
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
        element: <UserManagementList/>,
      },
      {
        path: '/administrator/user-management/create',
        element: <UserForm/>,
      },
      {
        path: '/administrator/user-management/update-user/:id',
        element: <UserForm key={'userUpdate'}/>,
      },
      {
        path: '/administrator/news-management',
        element: <NewsManagementList/>,
      },
      {
        path: '/administrator/news-management/create',
        element: <NewsForm/>,
      },
      {
        path: '/administrator/news-management/update-news/:id',
        element: <NewsForm key={'newsUpdate'}/>,
      },
      {
        path: '/administrator/article-management',
        element: <ArticleManagementList/>,
      },
      {
        path: '/administrator/article-management/create',
        element: <ArticleForm/>,
      },
      {
        path: '/administrator/article-management/update-article/:id',
        element: <ArticleForm key={'articleUpdate'}/>,
      },
      {
        path: '/administrator/product-management',
        element: <ProductManagementList/>,
      },
      {
        path: '/administrator/product-management/create',
        element: <ProductForm/>,
      },
      {
        path: '/administrator/product-management/update-product/:id',
        element: <ProductForm key={'articleUpdate'}/>,
      },
      {
        path: '/administrator/customer-management',
        element: <CustomerManagementList/>,
      },
      {
        path: '/administrator/customer-management/create',
        element: <CustomerForm/>,
      },
      {
        path: '/administrator/customer-management/update-customer/:id',
        element: <CustomerForm key={'customerUpdate'}/>,
      },
    ]
  }
])

export default router