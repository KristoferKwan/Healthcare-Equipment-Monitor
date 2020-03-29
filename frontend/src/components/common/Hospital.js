export default class Hospital {
    constructor(id, name, latitude, longitude) {
        this._id = id;
        this._name = name;
        this._latitude = latitude;
        this._longitude = longitude;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get position() {
        return { lat: this._latitude, lng: this._longitude };
    }

}