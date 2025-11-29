import { DeviceBootstrapInfo } from "../devices.types"

export type UpdateDeviceNameResponse={
    "updated": true,
    "device": DeviceBootstrapInfo["device"]
}

export type UpdateDeviceLocationResponse={
    "id": string,
    "name": string,
    "device_password_hash": string,
    "pi_serial": string,
    "location_label": string,
    "location_lat": number,
    "location_lng": number,
    "last_seen_at": string,
    "created_at": string
}

export type UpdateDeviceNameAndPasswordResponse={
    "updated": boolean,
    "device":DeviceBootstrapInfo["device"]
}

export type DeleteDeviceResponse={
    "deleted": boolean,
    "deviceId": string,
    "cascade":string[]
}