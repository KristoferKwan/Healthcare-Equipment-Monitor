import React from "react";
import {InfoWindow} from "google-maps-react";

export default class MapInfoBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedPlace: {},
      marker: {},
      visible: false,
    };
  }

  onMarkerHover(props, marker, e) {
    if (!this.state.visible) {
      console.log(props);
      console.log(this.state.selectedPlace);
      if (props !== this.state.selectedPlace) {
        this.setState({
          selectedPlace: props,
          marker: marker,
          visible: true
        });
      }
    }
  }

  onMarkerHoverOut(props, marker, e) {
    console.log("test");
    this.setState({
      selectedPlace: {},
      marker: {},
      visible: false
    });
  }

  render() {
    return (
      <div>
        <InfoWindow
          marker={this.state.marker}
          visible={this.state.visible}
        >
          <div>
            <h1>{this.state.selectedPlace.title}</h1>
            Click for more info.
          </div>
        </InfoWindow>
      </div>

    );
  }

}

