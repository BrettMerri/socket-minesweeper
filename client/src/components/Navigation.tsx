import React, { PureComponent } from 'react';
import { Navbar, Alignment, Icon, Spinner } from '@blueprintjs/core';
import { NavLink } from 'react-router-dom';
import { selectUserId, selectUserLoggingIn } from '../redux/selectors/userSelector';
import { RootState } from '../redux/reducers';
import { connect } from 'react-redux';

interface ReduxState {
  userId: string | null;
  userLoggingIn: boolean;
}

type Props = ReduxState;

class Navigation extends PureComponent<Props> {
  renderLoggedInUser() {
    if (this.props.userLoggingIn) {
      return <Spinner size={Spinner.SIZE_SMALL} />;
    }

    if (this.props.userId === null) {
      return 'Not logged in';
    }

    return `Logged in as ${this.props.userId}`;
  }
  render() {
    return (
      <Navbar className="bp3-dark">
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Blueprint</Navbar.Heading>
          <Navbar.Divider />
          <NavLink
            to="/"
            strict
            exact
            role="button"
            className="bp3-button
            bp3-minimal"
            activeClassName="bp3-active"
            tabIndex={0}
          >
            <Icon icon="home" />
            <span className="bp3-button-text">Home</span>
          </NavLink>
          {this.props.userId === null
            ? null
            : (
              <NavLink
                to="/board"
                strict
                exact
                role="button"
                className="bp3-button
                bp3-minimal"
                activeClassName="bp3-active"
                tabIndex={0}
              >
                <Icon icon="grid" />
                <span className="bp3-button-text">Board</span>
              </NavLink>
            )
          }
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Navbar.Heading>
            {this.renderLoggedInUser()}
          </Navbar.Heading>
        </Navbar.Group>
      </Navbar>
    );
  }
}

const mapStateToProps = (rootState: RootState): ReduxState => ({
  userId: selectUserId(rootState),
  userLoggingIn: selectUserLoggingIn(rootState),
});

export default connect(mapStateToProps)(Navigation);
