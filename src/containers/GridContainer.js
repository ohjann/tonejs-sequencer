import { connect } from 'react-redux'
import { toggleCell } from '../actions/matrix';
import Grid from '../components/Grid'

function mapStateToProps(state, props) {
  return {
    matrix: state.matrix.matrix,
    activeColumn: state.matrix.activeColumn,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onSquareClick: (row, col) => {
      dispatch(toggleCell(row,col));
    }
  }
}

const GridContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid)

export default GridContainer;
