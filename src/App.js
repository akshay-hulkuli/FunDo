import SignUp from "./pages/signup/SignUp";
import SignIn from "./pages/signin/SignIn";
import ForgetEmail from "./pages/forgotEmail/ForgotEmail";
import Reset from "./pages/reset/Reset";
import Dashboard from './pages/dashboard/Dashboard'
import Trash from "./pages/trash/Trash";
import Archives from "./pages/archives/Archives";
import { ProtectedRoute } from "./protectedRoute/ProtectedRoute";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* <Router history={History}> */}
      <Router >
        <Switch>
          <Route exact path="/signup" component={SignUp}></Route>
          <Route exact path="/" component={SignIn}></Route>
          <Route exact path='/forgotemail' component={ForgetEmail}></Route>
          <Route path='/resetpassword/:id' component={Reset}></Route>
          <ProtectedRoute path='/dashboard/' component={Dashboard}></ProtectedRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
