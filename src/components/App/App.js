import './App.css';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import Main from '../Main';
import Personal from '../Personal';

function App() {
  return (
    // <div className={styles.app}>
    <Router>
      {/* <Header /> */}
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/:login/">
          <Personal />
        </Route>
      </Switch>
    </Router>
    // </div>
  );
}

export default App;
