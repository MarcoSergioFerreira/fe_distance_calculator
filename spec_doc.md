# Distance Calculator - Full Stack Coding Test

## Backend (Django)

### Overview
Implement the APIs for an Application (backend in Python using Django models).

### Requirements
1. The app asks the user to enter a location (free text entry of an address or a place)
2. The app asks the user to enter a destination (free text entry of an address or a place)
3. Given the "from and destination" addresses, the server uses Google Maps API calls to calculate the distance
4. The app displays the properly formatted address
   - Example: "beverly centre" → "Beverly Centre (8500 Beverly Blvd, Los Angeles, CA 90048)"

### Technical Requirements
- APIs should be performant, efficient, scalable, and robust
- Build database models and queries using Django
- Support multiple databases (MySQL, SQLite, PostgreSQL)
- Optimize for production scale (millions of records, thousands of queries per minute)
- Fully separated backend with RESTful API serving JSON endpoints

### API Endpoints

#### 1. Get Geocode
Example Google API call:
```
https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
```

#### 2. Reverse Geocode
Example Google API call:
```
https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY
```

#### 3. Calculate Geometric Distance
- Calculate geometric distance between two lat/long coordinates
- No Google API endpoint required
- Return distance in units of choice

## Frontend (React)

### Overview
Implement a React app to communicate with the Django API.

### Requirements
1. Allow user to enter a location (free text entry of an address or a place)
2. Allow user to enter a destination (free text entry of an address or a place)
3. Send requests to API to fetch:
   - Correctly formatted addresses
   - Distance between locations
4. Display:
   - Properly formatted "from" and "destination" addresses
   - Distance between locations

### Technical Requirements
- Create data models to adapt API data
- Design intuitive/self-explanatory UI
- Run locally with npm or yarn
- No deployment required

### Notes
- Take liberties with assignment format as long as specifications are met
- Use Google Maps Geocoding API: https://developers.google.com/maps/documentation/geocoding/intro