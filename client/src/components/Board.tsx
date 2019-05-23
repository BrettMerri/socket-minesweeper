import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  webSocketConnectAction,
  webSocketDisconnectAction,
  startGameAction,
} from '../redux/actions/reduxWebSocketActions';
import { selectUserId } from '../redux/selectors/userSelector';
import { RootState } from '../redux/reducers';
import { withRouter, RouteComponentProps, StaticContext } from 'react-router';
import {
  selectReduxWebSocketConnected,
  selectReduxWebSocketConnecting,
} from '../redux/selectors/reduxWebSocketSelector';
import { selectBoardWidth, selectBoardHeight } from '../redux/selectors/boardSelector';
import Cell from './Cell';

interface ReduxState {
  userId: string | null;
  webSocketConnected: boolean;
  websocketConnecting: boolean;
  boardWidth: number;
  boardHeight: number;
}

interface DispatchableActions {
  webSocketConnectAction: () => void;
  webSocketDisconnectAction: () => void;
  startGameAction: (width: number, height: number, mineCount: number) => void;
}

type RouterProps = Readonly<RouteComponentProps<{ id: string }, StaticContext, any>>;
type Props = ReduxState & DispatchableActions & RouterProps;

class Board extends PureComponent<Props> {
  componentDidMount() {
    const {
      userId,
      history,
      webSocketConnectAction,
    } = this.props;

    if (userId === null) {
      history.replace('/');
      return;
    }

    webSocketConnectAction();
  }

  componentWillUnmount() {
    const {
      webSocketConnected,
      websocketConnecting,
      webSocketDisconnectAction,
    } = this.props;

    if (webSocketConnected || websocketConnecting) {
      webSocketDisconnectAction();
    }
  }

  handleStartGameClick = () => {
    this.props.startGameAction(8, 8, 10);
  }

  renderBoardRows() {
    return Array(this.props.boardHeight).fill(null).map((_, heightIndex) => (
      <div className="boardRow" key={heightIndex}>
        {this.renderBoardCells(heightIndex)}
      </div>
    ));
  }

  renderBoardCells(heightIndex: number) {
    return Array(this.props.boardWidth).fill(null).map((_, widthIndex) => (
      <Cell key={widthIndex} index={heightIndex * widthIndex + widthIndex} />
    ));
  }

  renderBoard() {
    return (
      <div className="boardContainer">
        {this.renderBoardRows()}
      </div>
    );
  }

  render() {
    return (
      <div className="board-component">
        <button onClick={this.handleStartGameClick}>Start game</button>
        {this.renderBoard()}
      </div>
    );
  }
}

const mapStateToProps = (rootState: RootState): ReduxState => ({
  userId: selectUserId(rootState),
  webSocketConnected: selectReduxWebSocketConnected(rootState),
  websocketConnecting: selectReduxWebSocketConnecting(rootState),
  boardWidth: selectBoardWidth(rootState),
  boardHeight: selectBoardHeight(rootState),
});

const mapDispatchToProps: DispatchableActions = {
  webSocketConnectAction,
  webSocketDisconnectAction,
  startGameAction,
};

const BoardWithRouter = withRouter(Board);

export default connect(mapStateToProps, mapDispatchToProps)(BoardWithRouter);
