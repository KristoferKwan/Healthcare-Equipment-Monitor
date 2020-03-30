import React from "react";
import {
  GoogleApiWrapper,
  Map,
  Marker,
} from "google-maps-react";
import Hospital from "./Hospital";
import axios from "axios";
import MapInfoBox from "./MapInfoBox";

const style = {
  width: "80%",
  height: "80%"
};

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    const bounds = new this.props.google.maps.LatLngBounds();
    this.state = {
      hospitals: [],
      bounds
    };
  }

  componentDidMount() {
    // setTimeout(
    //   () => {
    //     const hospitals = this.state.hospitals
    //         .concat(new Hospital("location1", "test", 42.02, -77.01))
    //         .concat(new Hospital("location2", "Example Hospital", 41.00, -77.01))
    //
    //     const newBounds = new this.props.google.maps.LatLngBounds();
    //     hospitals.forEach(hospital => newBounds.extend({lat: hospital.position.lat, lng: hospital.position.lng}));
    //
    //     this.setState({
    //       hospitals,
    //       bounds: newBounds
    //     });
    //   }, 3000
    // );

    axios.get("/api/hospital")
        .then(response => {
          const hospitals = response.data.map(hospital =>
              new Hospital(
                  hospital.hospitalId,
                  hospital.name,
                  hospital.location.latitude,
                  hospital.location.longitude
              )
          );

          const newBounds = new this.props.google.maps.LatLngBounds();
          hospitals.forEach(hospital => newBounds.extend({lat: hospital.position.lat, lng: hospital.position.lng}));

          this.setState({
            hospitals,
            bounds: newBounds
          });
        }, error => {
          window.alert("Unable to load hospital locations. Please try again.");
          console.log(error);
        });
  }

  // onMarkerHover(props, marker, e) {
  //   this.infoBox.current.onMarkerHover(props, marker, e);
  // }
  //
  // onMarkerHoverOut(props, marker, e) {
  //   this.infoBox.current.onMarkerHoverOut(props, marker, e);
  // }

  onMarkerClick(props, marker, e) {
    // https://github.com/fullstackreact/google-maps-react/issues/202
    window.location = window.location.origin.toString() + "/info/" + props.id;
  }

  render() {
    return (
      <Map
          google={this.props.google}
          style={style}
          initialCenter={{
            lat: 42.02,
            lng: -77.01
          }}
          bounds={this.state.bounds}
      >
        {this.state.hospitals.map(hospital => (
          <Marker
            key={hospital.id}
            id={hospital.id}
            title={hospital.name + " (Click to see more info)"}
            position={hospital.position}
            onClick={this.onMarkerClick.bind(this)}
          />
        ))}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCxEJO9cFv1Hm6-l65Wwf3xTehfYOUC5vs"
})(MapContainer);
