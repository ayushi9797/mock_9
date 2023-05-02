# Social Media App

| METHOD      | ENDPOINT                         | DESCRIPTION                                                                                                             | STATUS CODE |
| ----------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------- |
| POST        | /api/register                    | This endpoint should allow users to register. Hash the password on store.                                               | 201         |
| GET         | /api/users                       | This endpoint should return a list of all registered users.                                                             | 200         |
| GET         | /api/users/:id/friends           | This endpoint should return a list of all friends of a specific user identified by its ID.                              | 200         |
| POST        | /api/users/:id/friends           | This endpoint should allow the user to send a friend request to another user identified by its ID.                      | 201         |
| PUT / PATCH | /api/users/:id/friends/:friendId | This endpoint should allow users to accept or reject friend requests sent to them by another user identified by its ID. | 204         |
| GET         | /api/posts                       | This endpoint should return a list of all posts.                                                                        | 200         |
| POST        | /api/posts                       | This endpoint should allow the user to create a new post.                                                               | 201         |
| PUT / PATCH | /api/posts/:id                   | This endpoint should allow users to update the text or image of a specific post identified by its ID.                   | 204         |
| DELETE      | /api/posts/:id                   | This endpoint should allow users to delete a specific post identified by its ID.                                        | 202         |
| POST        | /api/posts/:id/like              | This endpoint should allow users to like a specific post identified by its ID.                                          | 201         |
| POST        | /api/posts/:id/comment           | This endpoint should allow users to comment on a specific post identified by its ID.                                    | 201         |
| GET         | /api/posts/:id                   | This endpoint should return the details of a specific post identified by its ID.                                        | 200         |

# Register users

# REGISTER ROUTER

API: `http://localhost:8080/user/register`

- UserSchema for Registrations: METHOD "POST"

- USER ONE
{
    "_id": "6450b7052da38cc2513193ec",
    "name": "Ayushi",
    "email": "soniayushi345@gmail.com",
    "password": "$2b$07$.yYv8t/ir1CKlgWrkCFMwu6svbDkQqgxUIMkeb1NBRX0UuOYh9dQi",
    "dob": "2000-03-11T18:30:00.000Z",
    "bio": "I love dancing",
    "posts": [],
    "friends": [],
    "friendRequests": [
      "6450b957aace8e95ad2b1205"
    ],
    "__v": 1
  }

 {
    "_id": "6450bac0e47382495ec54f9c",
    "name": "jack",
    "email": "j123@gmail.com",
    "password": "$2b$04$pP8teRsGsUjkQjgk807T/eLPT1aO.5SO9YEHEKcV11p8o/nWzEvGu",
    "dob": "2000-03-11T18:30:00.000Z",
    "bio": "I love dancing",
    "posts": [],
    "friends": [],
    "friendRequests": [],
    "__v": 0
  }

`{
  "name": "Ayushi",
  "email": "soniayushi345@gmail.com",
  "password": "1234",
  "dob": "03-12-2000",
  "bio": "I love dancing",
  "posts": [],
  " friends": [],
  "friendRequests": []
}`

- User Second

  `{
  "name": "chiku",
  "email": "chiku123@gmail.com",
  "password": "1234",
  "dob": "03-12-2000",
  "bio": "I love dancing",
  "posts": [],
  " friends": [],
  "friendRequests": []
}`

- Get a list of Users METHOD : "GET"

`http://localhost:8080/users/users`

- sending/post friend request

` http://localhost:8080/users/6450b957aace8e95ad2b1205/friends`

req.body
{
"userid":"6450b957aace8e95ad2b1205"
}

- Get All friends of Particular Users METHOD : "GET"

`http://localhost:8080/users/6450b957aace8e95ad2b1205/friends `

- update/patch friend request by id
  `http://localhost:8080/users/6450b957aace8e95ad2b1205/friends `

# POST ROUTER

- CRUD operation

- user allows to create a new post.

`http://localhost:8080/posts/posts `


{
  "user": "6450bac0e47382495ec54f9c",
  "text": "abc",
  "image": "abc",
  "createdAt": "2000-09-2",
  "likes": [],
  "comments": []
}

- User should return a list of all posts.

`http://localhost:8080/posts `

- User should return a list of all posts by id

`http://localhost:8080/posts/posts/:id `

- users to update the text or image of a specific post identified by its ID.

` http://localhost:8080/posts/posts/:id`

- users to delete a specific post identified by its ID.

`http://localhost:8080/posts/posts/:id `

-  users to like a specific post identified by its ID.

http://localhost:8080/posts/6450d2be52a53bdcdda052f4/like

- users to comment on a specific post identified by its ID.
