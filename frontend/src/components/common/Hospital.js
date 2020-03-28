export default class Hospital {
    constructor(name, latitude, longitude) {
        this._name = name;
        this._latitude = latitude;
        this._longitude = longitude;
    }

    get name() {
        return this._name;
    }

    get position() {
        return { lat: this._latitude, lng: this._longitude };
    }

}