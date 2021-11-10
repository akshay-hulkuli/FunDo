import SignUp from "./pages/signup/SignUp";
import SignIn from "./pages/signin/SignIn";
import ForgetEmail from "./pages/forgotEmail/ForgotEmail";
import Reset from "./pages/reset/Reset";
import Dashboard from './pages/dashboard/Dashboard'
import { Router, Route, Switch } from 'react-router-dom';
import History from './history/History';

function App() {
  return (
    <div className="App">
      <Router history={History}>
        <Switch>
          <Route exact path="/signup" component={SignUp}></Route>
          <Route exact path="/" component={SignIn}></Route>
          <Route exact path='/forgotemail' component={ForgetEmail}></Route>
          <Route exact path='/resetpassword' component={Reset}></Route>
          <Route exact path='/dashboard' component={Dashboard}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
