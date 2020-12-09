import styles from './index.module.css';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import Main from '../Main';
import Personal from '../Personal';
import Repositories from '../Repos';
import Header from '../Header';

function App() {
  return (
    <div className={styles.app}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/:login/">
            <Personal />
          </Route>
          <Route exact path="/:login/:repos">
            <Repositories />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
