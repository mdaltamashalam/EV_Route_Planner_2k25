# EV Route Planner using TomTom API

## Overview
The **EV Route Planner** is a web-based application that helps electric vehicle (EV) users find the most efficient routes, considering charging station locations along the way. The application integrates with the **TomTom API** to provide real-time navigation, route optimization, and charging station recommendations. It works entirely on **JavaScript** and API calls, making it lightweight and easy to deploy.

## Features
- **EV-Specific Route Planning**: Generates optimized routes with charging station stops.
- **Real-time Traffic Updates**: Fetches live traffic data to avoid congestion.
- **Charging Station Locator**: Displays nearby EV charging stations along the route.
- **Estimated Charging Time Calculation**: Estimates charging time based on vehicle battery level and station power.
- **Interactive Map Interface**: Displays routes and stations on a dynamic map.
- **Distance & Duration Estimation**: Provides estimated travel time and distance.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript (Vanilla JS)
- **Mapping & Navigation**: TomTom Maps API, TomTom Routing API
- **Data Handling**: Fetch API for handling API requests

## Installation
### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, etc.)
- TomTom Developer API Key (Signup at [TomTom Developer](https://developer.tomtom.com/))

### Steps to Set Up
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ev-route-planner.git
   ```
2. Navigate to the project directory:
   ```bash
   cd ev-route-planner
   ```
3. Open `index.html` in your browser.
4. Update `script.js` with your TomTom API key:
   ```js
   const TOMTOM_API_KEY = 'your_api_key_here';
   ```
5. Start using the EV Route Planner!

## Usage
1. Enter your **starting location** and **destination**.
2. The system suggests the best route along with **charging stations**.
3. Click on a charging station for details (power, cost, availability, etc.).
4. Follow the real-time route updates and reach your destination efficiently.

## API Endpoints Used
- **TomTom Routing API**: Provides route suggestions.
- **TomTom Search API**: Retrieves nearby EV charging stations.

## Future Enhancements
- **User Profiles**: Save preferred routes and charging station preferences.
- **Battery Level Tracking**: Adjust route based on real-time battery status.
- **Voice Navigation**: Implement voice-guided navigation.
- **Multi-Stop Route Planning**: Support multiple waypoints in a trip.
