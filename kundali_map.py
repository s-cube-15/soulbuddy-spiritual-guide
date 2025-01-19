import matplotlib.pyplot as plt
import numpy as np

def plot_kundali(kundali):
    # Define the houses (12 zodiac houses)
    houses = ['1st House', '2nd House', '3rd House', '4th House', '5th House', '6th House',
              '7th House', '8th House', '9th House', '10th House', '11th House', '12th House']
    
    # Define the positions for each house in a 360-degree circle
    angles = np.linspace(0, 2 * np.pi, 13)  # 13 because we are closing the circle
    planet_positions = []  # List to store the positions of planets in their respective houses
    
    for planet, position in kundali.items():
        # Normalize the planet's longitude (in degrees) to fit into the circle
        planet_angle = np.deg2rad(position)
        planet_positions.append(planet_angle)
    
    # Create the plot
    fig, ax = plt.subplots(figsize=(8, 8), subplot_kw={'projection': 'polar'})
    
    # Plot the houses as sectors
    ax.set_theta_offset(np.pi / 2)  # Rotate to make 1st house at the top
    ax.set_theta_direction(-1)  # Make the circle clockwise
    
    # Plot the house boundaries
    ax.set_thetagrids(np.degrees(angles[:-1]), labels=houses)
    ax.set_rmax(1)  # Set radial limit
    ax.set_rticks([])  # Remove radial ticks
    
    # Plot each planet
    for i, (planet, angle) in enumerate(zip(kundali.keys(), planet_positions)):
        ax.plot(angle, 1, 'o', label=planet, markersize=8)
    
    ax.legend(loc='upper right', bbox_to_anchor=(1.1, 1.1))
    
    # Display the diagram
    plt.title("Kundali (Astrological Birth Chart)", size=16)
    plt.show()

# Example Kundali (planet longitudes in degrees)
kundali = {
    "Sun": 5.0,    # Position of Sun in degrees
    "Moon": 25.5,   # Position of Moon in degrees
    "Mars": 50.0,   # Position of Mars in degrees
    "Mercury": 120.0, # Position of Mercury in degrees
    "Jupiter": 150.0, # Position of Jupiter in degrees
    "Venus": 200.0,  # Position of Venus in degrees
    "Saturn": 300.0,  # Position of Saturn in degrees
    "Rahu": 240.0,    # Position of Rahu in degrees
    "Ketu": 60.0      # Position of Ketu in degrees
}

# Plot the Kundali diagram
plot_kundali(kundali)
