# RaftLabs-assessment

## API Documentation

### Base URL for the API

http://localhost:3000/api/

## Authentication

## Request - Register a user

Method: POST
Endpoint: /register
Content-Type: application/json

{
    "username": "your_username",
    "password": "your_password"
}

📤 Response

Status: 200 OK
Content-Type: application/json

{
    "ok": true,
}

Status: 401 Unauthorized
Content-Type: application/json

{
    "error": "Invalid credentials"
}

## Request - Login user

Method: POST
Endpoint: /login
Content-Type: application/json

{
    "username": "your_username",
    "password": "your_password"
}

📤 Response

Status: 200 OK
Content-Type: application/json

{
    "token": "generated_jwt_token"
}

Status: 401 Unauthorized
Content-Type: application/json

{
    "error": "Invalid credentials"
}

## Resources

## Request - Create a new resource

POST /resources
Create a new resource.

Method: POST
Endpoint: /resources
Content-Type: application/json
Authorization: Bearer generated_jwt_token

{
    "name": "Resource Name",
    "description": "Resource Description"
}

📤 Response

Status: 200 OK
Content-Type: application/json

{
    "_id": "resource_id_here",
    "name": "Resource Name",
    "description": "Resource Description"
}

Status: 401 Unauthorized
Content-Type: application/json

{
    "error": "Invalid or missing JWT token"
}

## Request - Get paginated and sorted list of resources

GET /resources
Get paginated and sorted resources.

Method: GET
Endpoint: /resources
Authorization: Bearer generated_jwt_token

📝 Query Parameters

page (integer, optional, default: 1): Page number
limit (integer, optional, default: 10): Number of resources per page
sortField (string, optional, default: "name"): Field to sort by
sortOrder (string, optional, default: "asc"): Sort order ("asc" or "desc")

📤 Response

Status: 200 OK
Content-Type: application/json

[
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
]

Status: 401 Unauthorized
Content-Type: application/json

{
    "error": "Invalid or missing JWT token"
}

## Request - Get a resource by its ID

GET /resources/:id
Get a resource by ID.

Method: GET
Endpoint: /resources/:id
Authorization: Bearer generated_jwt_token

📝 Path Parameters

id (string): Resource ID

📤 Response

Status: 200 OK
Content-Type: application/json

{
    "_id": "resource_id_here",
    "name": "Resource Name",
    "description": "Resource Description"
}

Status: 404 Not Found
Status: 401 Unauthorized
Content-Type: application/json

{
    "error": "Invalid or missing JWT token"
}

## Request - Update a resource

PUT /resources/:id
Update a resource by ID.

Method: PUT
Endpoint: /resources/:id
Content-Type: application/json
Authorization: Bearer generated_jwt_token

📝 Path Parameters

id (string): Resource ID

{
    "name": "Updated Resource Name",
    "description": "Updated Resource Description"
}

📤 Response

Status: 200 OK
Content-Type: application/json

{
    "_id": "resource_id_here",
    "name": "Updated Resource Name",
    "description": "Updated Resource Description"
}

Status: 404 Not Found
Status: 401 Unauthorized
Content-Type: application/json

{
    "error": "Invalid or missing JWT token"
}

## Request - Delete a resource

DELETE /resources/:id
Delete a resource by ID.

Method: DELETE
Endpoint: /resources/:id
Authorization: Bearer generated_jwt_token

📝 Path Parameters

id (string): Resource ID

📤 Response

Status: 204 No Content
Status: 404 Not Found
Status: 401 Unauthorized
Content-Type: application/json

{
    "error": "Invalid or missing JWT token"
}
