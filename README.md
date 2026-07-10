Real-Time Marine Monitoring Dashboard

Made by Darshil pasad and keval patel

This project is a Real-Time Marine Monitoring Dashboard developed using HTML, CSS, JavaScript, Bootstrap, and Chart.js. It retrieves live marine and weather data from external APIs and displays important ocean conditions in a user-friendly dashboard.

Features
Displays Sea Surface Temperature
Displays Wave Height
Displays Wind Wave Height
Displays Wave Direction
Displays Air Temperature
Displays Humidity
Displays Wind Speed
Displays Atmospheric Pressure
Displays Sunrise and Sunset Time
Shows Latitude and Longitude of the selected location
Visualizes the data using a responsive bar chart
Displays loading and status messages during data retrieval
Technologies Used
HTML5
CSS3
JavaScript (ES6)
Bootstrap 5
Chart.js
Open-Meteo Marine API
Open-Meteo Weather API
How the Program Works
The webpage loads and initializes an empty bar chart.
The user selects a location from the dropdown menu.
The program extracts the latitude and longitude of the selected location.
Marine and weather data are requested from the respective APIs.
The received data is converted from JSON format into JavaScript objects.
The dashboard updates all marine and weather information.
The bar chart is refreshed to display the latest values.
A success message and the last updated time are displayed.
If an error occurs, an appropriate error message is shown.
Project Structure
project/
│── index.html        # Main webpage
│── style.css         # Styling
│── script.js         # JavaScript logic
│── README.md         # Project documentation
APIs Used
Open-Meteo Marine API – Provides marine data such as sea temperature, wave height, wind wave height, and wave direction.
Open-Meteo Weather API – Provides weather data such as air temperature, humidity, wind speed, pressure, sunrise, and sunset.
Output

The dashboard displays:

Live marine conditions
Live weather conditions
Graphical visualization of key parameters
Status messages indicating successful updates or errors
Future Enhancements
Add automatic data refresh at regular intervals.
Include additional marine parameters such as ocean currents and tides.
Display historical data using line charts.
Integrate interactive maps for location selection.
Export monitoring data as CSV or PDF reports.
Author

Project: Real-Time Marine Monitoring Dashboard
Language: JavaScript
Visualization: Chart.js
Purpose: To monitor and visualize real-time marine and weather conditions through an interactive web dashboard.
