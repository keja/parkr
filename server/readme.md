https://docs.google.com/document/d/1ZpVinN_jl-26V763sq2jFlYgEiE6hxTZQpv8rJbPSTY/edit

#Endpoints
**List all users GET** 
http://188.166.1.167/api/v1/users

**Create a user POST** 
http://188.166.1.167/api/v1/user
Takes data as {"name": "<str>", "email": "<str>", "username": "<str>", "password": "<str>"}

**Log a user in POST**
http://188.166.1.167/api/v1/user/login
Return the user-object (save the id locally for reuse as “token”)
Takes data as {"email": "<str>", "password": "<str>"}

**List all vehicles by user GET** 
http://188.166.1.167/api/v1/user/<id>/vehicles 

**List all active logs by user GET**
http://188.166.1.167/api/v1/user/<id>/active

**List all old logs by user GET**
http://188.166.1.167/api/v1/user/<id>/history

**List all vehicles GET** 
http://188.166.1.167/api/v1/vehicles 

**Create new vehicle POST** 
http://188.166.1.167/api/v1/vehicle
Takes data as {"title": "<str>", "plate": "<str>", "owner_id": <int>}
Note: owner_id = the currently logged in users id

**Delete a vehicle DEL** 
http://188.166.1.167/api/v1/vehiclevehicle/<id>

**List all locations GET** 
http://188.166.1.167/api/v1/locations

**Get location by id GET**
http://188.166.1.167/api/v1/location/<id>
Returns an object: {locationObject, isLocationFree (bool)}

**Create a location POST** 
http://188.166.1.167/api/v1/location 
Takes data as {"zone": "<str>", "price": <int>, "lat": <float>, "long": <float>}

**List all log-entries GET** 
http://188.166.1.167/api/v1/logs

**Create a log-entry, used when parking POST** 
http://188.166.1.167/api/v1/log
Takes data as {"location_id": <int>, "owner_id": <int>, "vehicle_id": <int>, "expires": "<timestamp>"}

#HTTP Response Codes
HTTP GET returns 200 on ok
HTTP POST returns 201 on successful create
HTTP POST return 422 on unsuccesful requests
