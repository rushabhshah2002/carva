import logo from './logo.svg';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginSignup from './LoginSignup/LoginSignup';
import ProfilePage from './Profile/profile';
import ForgotPassword from './LoginSignup/forgotpassword';
import AddPost from './homePage/addPost';
import ConnectID from './connect';
import HomePage from './homePage/homepage';
import './App.css';

function App() {
  return (
    <div className="App">

<BrowserRouter><Switch>
        <Route path="/forgot"  component={ForgotPassword}></Route>
        <Route path="/profile" component={ProfilePage}></Route>
        <Route path="/home" component={HomePage}></Route>
        <Route path='/connect/:connectid' component={ConnectID}></Route>
      <Route exact path ="/" component = {LoginSignup}></Route>
      
       
        </Switch></BrowserRouter>

     {/* <LoginSignup/> */}
     {/* <ProfilePage/> */}
     {/* <ForgotPassword/> */}
    </div>
  );
}

export default App;
