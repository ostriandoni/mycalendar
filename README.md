# My Calendar Apps

## How to run
```
git clone git@github.com:ostriandoni/mycalendar.git
npm install
npm start
```
## API Documentation

### Registration
endpoint: `/register`

method: `POST`

payload:
```
{
  "firstName": "donny", 
  "lastName": "123", 
  "email": "donny@mailinator.com", 
  "username": "donny123",
  "password": "password123"
}
```

response:
```
{
  "user": {
    "calendars": [
      "5cbf2c6adffbf84d35222a82"
    ],
    "_id": "5cbf2c6adffbf84d35222a81",
    "firstName": "donny",
    "lastName": "123",
    "email": "donny@mailinator.com",
    "username": "donny123",
    "password": "$2b$10$0fB/if5iw64AkWlxFOF04OGRI0Yk3FCctTjLJeQwgxQGv8Q3z7qfy",
    "__v": 0,
    "id": "5cbf2c6adffbf84d35222a81"
  }
}
```

### Login
endpoint: `/login`

method: `POST`

payload:
```
{
  "username": "donny123",
  "password": "password123"
}
```

response:
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRvbm55MTIzIiwicGFzc3dvcmQiOiJoYWhhaGEiLCJpYXQiOjE1NTYwMzI3NzYsImV4cCI6MTU1NjAzNjM3Nn0.d4oy7LM4j1NROpozCwF7ebKcBlWCosM4le2lrrUsvoY"
}
```

### Get User
endpoint: `/users/:id`

method: `GET`

payload: -

response:
```
{
  "user": {
    "calendars": [
      {
        "events": [],
        "_id": "5cbf2c6adffbf84d35222a82",
        "name": "donny123-calendar",
        "owner": "5cbf2c6adffbf84d35222a81",
        "id": "5cbf2c6adffbf84d35222a82"
      }
    ],
    "_id": "5cbf2c6adffbf84d35222a81",
    "firstName": "donny",
    "lastName": "123",
    "email": "donny@mailinator.com",
    "username": "donny123",
    "password": "$2b$10$0fB/if5iw64AkWlxFOF04OGRI0Yk3FCctTjLJeQwgxQGv8Q3z7qfy",
    "__v": 0,
    "id": "5cbf2c6adffbf84d35222a81"
  }
}
```

### Get Calendar
endpoint: `/calendars/:id`

method: `GET`

payload: -

response:
```
{
  "calendar": {
    "members": [
      {
        "_id": "5cbf2c6adffbf84d35222a81",
        "firstName": "donny",
        "lastName": "123",
        "username": "donny123",
        "id": "5cbf2c6adffbf84d35222a81"
      }
    ],
    "events": [],
    "_id": "5cbf2c6adffbf84d35222a82",
    "name": "donny123-calendar",
    "owner": {
      "_id": "5cbf2c6adffbf84d35222a81",
      "firstName": "donny",
      "lastName": "123",
      "username": "donny123",
      "id": "5cbf2c6adffbf84d35222a81"
    },
    "__v": 0,
    "id": "5cbf2c6adffbf84d35222a82"
  }
}
```

### Create Event
endpoint: `/events`

method: `POST`

payload:
```
{
  "calendarId": "5cbf2c6adffbf84d35222a82",
  "name": "golf",
  "usersInTheEvent": [
    "5cbf2f2edffbf84d35222a83"
  ],
  "startDateTime": "2019-04-22T01:00:00.842Z",
  "endDateTime": "2019-04-22T05:00:00.842Z",
  "location": "localhost"
}
```

response:
```
{
  "event": {
    "usersInTheEvent": [
      "5cbf2f2edffbf84d35222a83",
      "5cbf2c6adffbf84d35222a81"
    ],
    "lastModified": null,
    "_id": "5cbf2f5ddffbf84d35222a85",
    "name": "golf",
    "owner": "5cbf2c6adffbf84d35222a81",
    "startDateTime": "2019-04-22T01:00:00.842Z",
    "endDateTime": "2019-04-22T05:00:00.842Z",
    "location": "localhost",
    "calendar": "5cbf2c6adffbf84d35222a82",
    "__v": 0,
    "id": "5cbf2f5ddffbf84d35222a85"
  }
}
```

### Update Event
endpoint: `/events/:id`

method: `PUT`

payload:
```
{
  "calendarId": "5cbf2c6adffbf84d35222a82",
  "name": "golf and mounted",
  "usersInTheEvent": [
    "5cbf2f2edffbf84d35222a83"
  ],
  "startDateTime": "2019-04-22T01:00:00.842Z",
  "endDateTime": "2019-04-22T05:00:00.842Z",
  "location": "peninsula club"
}
```

response:
```
{
  "event": {
    "usersInTheEvent": [
      "5cbf2f2edffbf84d35222a83",
      "5cbf2c6adffbf84d35222a81"
    ],
    "_id": "5cbf2f5ddffbf84d35222a85",
    "name": "golf and mounted",
    "owner": "5cbf2c6adffbf84d35222a81",
    "startDateTime": "2019-04-22T01:00:00.842Z",
    "endDateTime": "2019-04-22T05:00:00.842Z",
    "location": "peninsula club",
    "calendar": "5cbf2c6adffbf84d35222a82",
    "__v": 0,
    "id": "5cbf2f5ddffbf84d35222a85"
  }
}
```

### Delete Event
endpoint: `/events/:id`

method: `DELETE`

payload: -

response:
```
{
  "event": "5cbf2f5ddffbf84d35222a85",
  "deleted": true
}
```
