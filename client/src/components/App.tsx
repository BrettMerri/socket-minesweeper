import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Board from './Board';
import Home from './Home';
import Navigation from './Navigation';
import NotFound from './NotFound';
import { connect } from 'react-redux';
import { loginRequestAction } from '../redux/actions/userActions';

interface DispatchableActions {
  loginRequestAction: () => void;
}

type Props = DispatchableActions;

class App extends PureComponent<Props> {
  componentDidMount() {
    this.props.loginRequestAction();
  }

  render() {
    return (
      <div className="app +bg-gray-lightest">
        <Router>
          <Navigation />
          <Switch>
            <Route
              path="/"
              exact
              component={Home}
            />
            <Route
              path="/board"
              exact
              component={Board}
            />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps: DispatchableActions = {
  loginRequestAction,
};

export default connect(null, mapDispatchToProps)(App);
