import requests

def get_lat_lon_nominatim(city, state):
    base_url = "https://nominatim.openstreetmap.org/search"
    address = f"{city}, {state}"
    params = {
        "q": address,
        "format": "json"
    }
    headers = {
        "User-Agent": "YourAppName/1.0 (shresawnt2011@gmail.com)"  # Replace with your own contact info
    }
    response = requests.get(base_url, params=params, headers=headers)
    
    if response.status_code == 200:
        try:
            result = response.json()
            if result:
                lat = result[0]["lat"]
                lon = result[0]["lon"]
                return lat, lon
            else:
                return None, None
        except ValueError:
            print("Error parsing JSON response")
            return None, None
    else:
        print(f"Request failed with status code {response.status_code}")
        return None, None


# city = "Lokpuram"
# state = "Maharashtra"
# latitude, longitude = get_lat_lon_nominatim(city, state)

# if latitude and longitude:
#     print(f"Latitude: {latitude}, Longitude: {longitude}")
# else:
#     print("Could not get the coordinates.")