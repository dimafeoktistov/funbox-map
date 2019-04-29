import { connect } from "react-redux";

import * as mapSelectors from "../../selectors/mapSelector";
import * as mapActions from "../../actions/mapActions";
import * as placesListSelectors from "../../selectors/placesListSelector";
import * as placesListActions from "../../actions/placesListActions";

import { App } from './App';

const mapStateToProps = (state) => { 
    const placesList = placesListSelectors.placesListSelector(state);
    const loading = mapSelectors.loadingSelector(state);
    const snackBar = mapSelectors.snackBarSelector(state);
    return { placesList, loading, snackBar }
  };
  
  const mapDispatchToProps = dispatch => ({
    initMap() {
      dispatch(mapActions.initMap());
    },
    addPlace(place) {
      dispatch(placesListActions.addPlace(place));
    },
    deletePlace(place) {
      dispatch(placesListActions.deletePlace(place));
    },
    reorderPlaces(places) {
      dispatch(placesListActions.reorderPlaces(places));
    },
    handleClose(snackBar) {
      dispatch(mapActions.setSnapbar(snackBar))
    }
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(App);