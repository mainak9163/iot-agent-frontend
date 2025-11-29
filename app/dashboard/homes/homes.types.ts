export type CreateHomeResponse = {
    "id": string,
    "user_id": string,
    "name": string,
    "created_at": string
}

export type ListAllHomesResponse = CreateHomeResponse[]

export type DeleteHomeResponse = {
    "deleted": boolean,
    "homeId": string
}