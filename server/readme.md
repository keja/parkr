#Endpoints
###Users

|Description                   | Endpoint                     | Type |  Args                                                                                 | Note                                                            |
|------------------------------|------------------------------|------|---------------------------------------------------------------------------------------|-----------------------------------------------------------------|
| List all users               | /api/v1/users                | GET  | N/A                                                                                   |                                                                 |
| Create a user                | /api/v1/users                | POST | {"name": "\<str\>", "email": "\<str\>", "username": "\<str\>", "password": "\<str\>"} |                                                                 |
| Login                        | /api/v1/user/login           | POST | {"email": "\<str\>", "password": "\<str\>"}                                           | Return the user-object (save the id locally for reuse as “token”|
| List all vehicles by user    | /api/v1/user/\<id\>/vehicles | GET  | id in url                                                                             |                                                                 |
| List all active logs by user | /api/v1/user/\<id\>/active   | GET  | id in url                                                                             |                                                                 |
| List all old logs by user    | /api/v1/user/\<id\>/history  | GET  | id in url                                                                             |                                                                 |

###Vehicles

|Description                   | Endpoint                     | Type |  Args                                                                                 | Note                                                            |
|------------------------------|------------------------------|------|---------------------------------------------------------------------------------------|-----------------------------------------------------------------|
| List all vehicles            | /api/v1/vehicles             | GET  | N/A                                                                                   |                                                                 |
| Create new vehicle           | /api/v1/vehicle              | POST | {"title": "\<str\>", "plate": "\<str\>", "owner_id": \<int\>}                         | owner_id = the currently logged in users id                     |
| Delete a vehicle             | /api/v1/vehicle/\<id\>       | DEL  | id in url                                                                             |                                                                 |

###Locations

|Description                   | Endpoint                     | Type |  Args                                                                                 | Note                                                            |
|------------------------------|------------------------------|------|---------------------------------------------------------------------------------------|-----------------------------------------------------------------|
| List all locations           | /api/v1/locations            | GET  | N/A                                                                                   |                                                                 |
| Get location by id           | /api/v1/location/\<id\>      | GET  | id in url                                                                             | Returns an object: {locationObject, isLocationFree (bool)}      |
| Create a location            | /api/v1/location             | POST | {"zone": "<str>", "price": <int>, "lat": <float>, "long": <float>}                    |                                                                 |

###Log

|Description                            | Endpoint                     | Type |  Args                                                                                            | Note                                                            |
|---------------------------------------|------------------------------|------|--------------------------------------------------------------------------------------------------|-----------------------------------------------------------------|
| List all log-entries                  | /api/v1/logs                 | GET  | N/A                                                                                              |                                                                 |
| Create a log-entry, used when parking | /api/v1/log                  | POST | {"location_id": \<int\>, "owner_id": \<int\>, "vehicle_id": \<int\>, "expires": "\<timestamp\>"} |                                                                 |

#HTTP Response Codes
* HTTP GET returns 200 on ok
* HTTP POST returns 201 on successful create
* HTTP POST return 422 on unsuccesful requests
