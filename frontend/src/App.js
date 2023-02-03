import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Root  from './pages/Root';
import Oauth from './components/Login/Oauth';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Live from './pages/Live';
import LiveRoom from './pages/LiveRoom';
import VideoRoom from './components/LiveRoom/test/VideoRoom';
import ChatList from './pages/ChatList';
import ChatRoom from './pages/ChatRoom';
import AddProduct from './pages/AddProduct';
import UpdateProduct from './pages/UpdateProduct';
import Login from './pages/Login';
import BuyList from './pages/BuyList';
import SellList from './pages/SellList';
import PickList from './pages/PickList';
import Search from './pages/Search';
import SearchList from './pages/SearchList';
import UpdateUserInfo from './pages/UpdateUserInfo';
import UserInfo from './pages/UserInfo';
import AddReview from './pages/AddReview';
import MyReviewList from './pages/MyReviewList';
import Report from './pages/Report';
import StompChat from './pages/StompChat';
import TestChat from './pages/TestChat';

const router = createBrowserRouter([
  {
    path : '/',
    element: <Root />,
    errorElement: <NotFound/>, 
    children : [
      { index: true, element: <Home/>, },
      { path: '/oauth', element: <Oauth/>, },
      { path: '/live', element: <Live/>, },
      { path: '/live/:productId', element: <VideoRoom/>, },
      { path: '/liveroom', element: <LiveRoom/>, },
      { path: '/detail/:productId', element: <Detail/>, },
      { path: '/update/:productId', element: <UpdateProduct/>, },
      { path: '/chatlist', element: <ChatList/>, },
      { path: '/chatroom/:chatroomId', element: <ChatRoom/>, },
      { path: '/addproduct', element: <AddProduct/>, },
      { path: '/review/:productId/create', element: <AddReview/>, },
      { path: '/userinfo/:userId', element: <UserInfo/>, },
      { path: '/userinfo/:userId/update', element: <UpdateUserInfo/>, },
      { path: '/searchlist/:word', element: <SearchList/>, },
      { path: '/search', element: <Search/>, },
      { path: '/login', element: <Login/>, },
      { path: '/buylist/:userId', element: <BuyList/>, },
      { path: '/selllist/:userId', element: <SellList/>, },
      { path: '/picklist/:userId', element: <PickList/>, },
      { path: '/myreviewlist/:userId', element: <MyReviewList/>, },
      { path: '/report/:userId', element: <Report/>, },
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
