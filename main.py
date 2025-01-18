import swisseph as swe
import requests
from datetime import datetime
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

# Define the request model to accept city and state as input
class KundaliRequest(BaseModel):
    dob: str  # Date of birth in YYYY-MM-DD format
    time: str  # Time of birth in HH:MM format
    city: str  # City
    state: str  # State

# Function to fetch latitude and longitude from Nominatim (OpenStreetMap API)
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
                return float(lat), float(lon)  # Return as float for calculation
            else:
                return None, None
        except ValueError:
            print("Error parsing JSON response")
            return None, None
    else:
        print(f"Request failed with status code {response.status_code}")
        return None, None

# Function to generate kundali based on the user's birth details and location coordinates
def generate_kundali(dob, time, city, state):
    # Get latitude and longitude for the city and state
    latitude, longitude = get_lat_lon_nominatim(city, state)
    
    if latitude is None or longitude is None:
        raise HTTPException(status_code=400, detail="Could not retrieve coordinates for the provided city and state.")
    
    # Convert date/time to Julian Day
    try:
        date = datetime.strptime(dob, "%Y-%m-%d")
        time = datetime.strptime(time, "%H:%M")
        julian_day = swe.julday(date.year, date.month, date.day, time.hour + time.minute / 60.0)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date or time format")
    
    # Planet codes (numeric IDs based on Swiss Ephemeris)
    planet_codes = {
        'Sun': 0,
        'Moon': 1,
        'Mars': 3,
        'Mercury': 2,
        'Jupiter': 5,
        'Venus': 4,
        'Saturn': 6,
        'Rahu': 12,
        'Ketu': 13
    }
    
    # Calculate planetary positions
    kundali = {}
    for planet, planet_id in planet_codes.items():
        position, _ = swe.calc_ut(julian_day, planet_id)
        kundali[planet] = position[0]  # Longitude of the planet

    return kundali

# Define the FastAPI POST endpoint to generate the Kundali
@app.post("/kundali")
def kundali_endpoint(request: KundaliRequest):
    # Generate the Kundali using the provided details
    kundali = generate_kundali(request.dob, request.time, request.city, request.state)
    return {"kundali": kundali}
