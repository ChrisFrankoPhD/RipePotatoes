import './App.css';
import NavBar from './MyNavBar'
import Home from "./MyHome"
import AboutView from "./MyAbout"
import {Switch, Route} from 'react-router-dom'

function AppSwitch() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/" exact>
            <Home />
        </Route>
        <Route path="/about" component={AboutView} />
      </Switch>
    </div>
  );
}

export default AppSwitch;
