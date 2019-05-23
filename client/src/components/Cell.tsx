import React, { PureComponent } from 'react';
import { RootState } from '../redux/reducers';
import { selectBoardCellValuesByIndex } from '../redux/selectors/boardSelector';
import { CellValue } from '../redux/reducers/boardReducer';
import { connect } from 'react-redux';
import { selectCellAction } from '../redux/actions/reduxWebSocketActions';

interface OwnProps {
  index: number;
}

interface ReduxState {
  cellValue: CellValue | undefined;
}

interface DispatchableActions {
  selectCellAction: (index: number) => void;
}

type Props = OwnProps & ReduxState & DispatchableActions;

class Cell extends PureComponent<Props> {
  handleMouseUp = () => {
    this.props.selectCellAction(this.props.index);
  }

  render() {
    const { cellValue } = this.props;
    const cellValueText = cellValue === 9 ? 'Mine' : cellValue === 10 ? 'Flag' : cellValue === 11 ? '' : cellValue

    return (
      <div
        onMouseUp={this.handleMouseUp}
        className="boardCell"
      >
        {cellValueText}
      </div>
    );
  }
}

const mapStateToProps = (rootState: RootState, ownProps: OwnProps): ReduxState => ({
  cellValue: selectBoardCellValuesByIndex(rootState, ownProps.index),
});

const mapDispatchToProps: DispatchableActions = {
  selectCellAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
