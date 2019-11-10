import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const ViewMap = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAV3gmAB7j1uedhlo83B1vWymbJrI9CD0Q",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: (
      <div
        style={
          window.innerWidth > 800 ? { height: `300px` } : { height: `200px` }
        }
      />
    ),
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: parseInt(props.lat), lng: parseInt(props.long) }}
  >
    {props.isMarkerShown && (
      <Marker
        position={{ lat: parseInt(props.lat), lng: parseInt(props.long) }}
        onClick={props.onMarkerClick}
      />
    )}
  </GoogleMap>
));

function Map(props) {
  return <ViewMap lat={props.lat} long={props.long} />;
}

export default Map;
