# API Documentation

## Base URL for the API

http://localhost:3000/api/

## Register a user

- Method: POST
- Endpoint: /register

`{
    "username": "your_username",
    "password": "your_password"
}`

### Response

1. Status: 200 OK

`{
    "ok": true,
}`

2. Status: 401 Unauthorized

`{
    "error": "Invalid credentials"
}`

## Login user

- Method: POST
- Endpoint: /login

`{
    "username": "your_username",
    "password": "your_password"
}`

### Response

1. Status: 200 OK

`{
    "token": "generated_jwt_token"
}`

2. Status: 401 Unauthorized

{
    "error": "Invalid credentials"
}

## Create a new resource

- Method: POST
- Endpoint: /resources
- Authorization: Bearer generated_jwt_token

`{
    "name": "Resource Name",
    "description": "Resource Description"
}`

### Response

1. Status: 200 OK

`{
    "_id": "resource_id_here",
    "name": "Resource Name",
    "description": "Resource Description"
}`

2. Status: 401 Unauthorized

`{
    "error": "Invalid or missing JWT token"
}`

##  Get paginated and sorted list of resources

- Method: GET
- Endpoint: /resources
- Authorization: Bearer generated_jwt_token

### Query Parameters

- page (integer, optional, default: 1): Page number
- limit (integer, optional, default: 10): Number of resources per page
- sortField (string, optional, default: "name"): Field to sort by
- sortOrder (string, optional, default: "asc"): Sort order ("asc" or "desc")

### Response

1. Status: 200 OK

`[
{
    "_id": "resource_id_1",
    "name": "Resource 1",
    "description": "Description of Resource 1"
},
{
    "_id": "resource_id_2",
    "name": "Resource 2",
    "description": "Description of Resource 2"
},
// ...
]`

2. Status: 401 Unauthorized

`{
    "error": "Invalid or missing JWT token"
}`

## Get a resource by its ID

- Method: GET
- Endpoint: /resources/:id
- Authorization: Bearer generated_jwt_token

### Path Parameters

- id (string): Resource ID

### Response

1. Status: 200 OK

`{
    "_id": "resource_id_here",
    "name": "Resource Name",
    "description": "Resource Description"
}`

2. Status: 404 Not Found
3. Status: 401 Unauthorized

`{
    "error": "Invalid or missing JWT token"
}`

## Update a resource

- Method: PUT
- Endpoint: /resources/:id
- Authorization: Bearer generated_jwt_token

### Path Parameters

- id (string): Resource ID

`{
    "name": "Updated Resource Name",
    "description": "Updated Resource Description"
}`

### Response

1. Status: 200 OK

`{
    "_id": "resource_id_here",
    "name": "Updated Resource Name",
    "description": "Updated Resource Description"
}`

2. Status: 404 Not Found
3. Status: 401 Unauthorized

`{
    "error": "Invalid or missing JWT token"
}`

## Delete a resource

- Method: DELETE
- Endpoint: /resources/:id
- Authorization: Bearer generated_jwt_token

### Path Parameters

- id (string): Resource ID

### Response

1. Status: 204 No Content
2. Status: 404 Not Found
3. Status: 401 Unauthorized

`{
    "error": "Invalid or missing JWT token"
}`
