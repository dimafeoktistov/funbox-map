import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const snackBar = { open: true };
  ReactDOM.render(<App 
                    placesList={[]}
                    initMap={() => {}}
                    addPlace={() => {}}
                    reorderPlaces={() => {}}
                    snackBar={snackBar}
                    loading
                    />, div);
  ReactDOM.unmountComponentAtNode(div);
});
