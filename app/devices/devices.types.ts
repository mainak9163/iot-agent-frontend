export type DeviceBootstrapInfo = {
    "device": {
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
}

export type ClaimDeviceResponse={
    "status": string,
    "deviceId": string,
    "homeId": string
}

export type ListAllDevicesResponse = DeviceBootstrapInfo[]