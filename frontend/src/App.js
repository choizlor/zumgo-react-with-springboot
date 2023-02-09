import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Root  from './pages/Root';
import Oauth from './pages/Login/Oauth';
import NotFound from './pages/NotFound/NotFound';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Live from './pages/Live';
import LiveRoom from './pages/LiveRoom';
import VideoRoom from './components/LiveRoom/VideoRoom';
import ChatList from './pages/ChatList';
import ChatRoom from './pages/ChatRoom';
import AddProduct from './pages/AddProduct';
import UpdateProduct from './pages/UpdateProduct';
import Login from './pages/Login/Login';
import BuyList from './pages/BuyList';
import SellList from './pages/SellList';
import WishList from './pages/WishList';
import Search from './pages/Search';
import UpdateUserInfo from './pages/UpdateUserInfo';
import UserInfo from './pages/UserInfo';
import AddReview from './pages/AddReview';
import MyReviewList from './pages/MyReviewList';
import Report from './pages/Report/Report';
import UpdateReview from './pages/UpdateReview';

const router = createBrowserRouter([
  {
    path : '/',
    element: <Root />,
    errorElement: <NotFound/>, 
    children : [  
      { index: true, element: <Home/>, },
      { path: '/oauth', element: <Oauth/>, },
      { path: '/live', element: <Live/>, },
      { path: '/live/:productId', element: <VideoRoom />, },
      { path: '/liveroom', element: <LiveRoom/>, },
      { path: '/detail/:productId', element: <Detail/>, },
      { path: '/update/:productId', element: <UpdateProduct/>, },
      { path: '/chatlist', element: <ChatList/>, },
      { path: '/chatroom/:chatroomId', element: <ChatRoom/>, },
      { path: '/addproduct', element: <AddProduct/>, },
      { path: '/review/:productId/create', element: <AddReview/>, },
      { path: '/userinfo/:userId', element: <UserInfo/>, },
      { path: '/userinfo/:userId/update', element: <UpdateUserInfo/>, },
      { path: '/search', element: <Search/>, },
      { path: '/login', element: <Login/>, },
      { path: '/buylist/:userId', element: <BuyList/>, },
      { path: '/selllist/:userId', element: <SellList/>, },
      { path: '/wishlist/:userId', element: <WishList/>, },
      { path: '/myreviewlist', element: <MyReviewList/>, },
      { path: '/report/:userId', element: <Report/>, },
      { path: '/report/:userId', element: <Report/>, },
      { path: '/review/:productId/update', element: <UpdateReview />}
    ]
  },
])

function App() {
  return (
    <div className='app'>
      <RouterProvider router={router} />
    </div>
  );
} 

export default App;
