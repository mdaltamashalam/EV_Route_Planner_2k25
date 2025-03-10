// Initialize the Map
let map = L.map('map').setView([28.7041, 77.1025], 10); // Default to Delhi
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Layer Groups to Clear Old Routes & Markers
let routeLayer = L.layerGroup().addTo(map);
let chargingLayer = L.layerGroup().addTo(map);

// Custom EV Charging Station Icon
const chargingIcon = L.icon({
    iconUrl: '/Image/Charge Locator.png',  // Ensure this file exists
    iconSize: [30, 30]
});

// Function to Plan Route
async function planRoute() {
    let startLocation = document.getElementById('start').value;
    let destinationLocation = document.getElementById('destination').value;

    if (!startLocation || !destinationLocation) {
        alert("Please enter both start and destination locations.");
        return;
    }

    // Convert Locations to Coordinates
    let startCoords = await getCoordinates(startLocation);
    let destinationCoords = await getCoordinates(destinationLocation);

    if (!startCoords || !destinationCoords) {
        alert("Could not find locations. Try again.");
        return;
    }

    // Clear previous routes and markers
    routeLayer.clearLayers();
    chargingLayer.clearLayers();

    // Get Route & Display on Map
    let routeData = await getRoute(startCoords, destinationCoords);

    if (routeData) {
        L.polyline(routeData, { color: 'blue' }).addTo(routeLayer);

        // Fit map to route
        map.fitBounds(L.latLngBounds(routeData));

        // Find & Add Charging Stations Randomly
        allocateChargingStations(routeData);
    }
}

// Function to Get Coordinates from Address using Nominatim
async function getCoordinates(address) {
    let url = `https://nominatim.openstreetmap.org/search?format=json&q=${address}`;
    let response = await fetch(url);
    let data = await response.json();
    
    if (data.length > 0) {
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    } else {
        return null;
    }
}

// Function to Get Route Using TomTom API
async function getRoute(start, end) {
    let apiKey = "6Hlf1lUoZpUMJPrtAuZ8mqflNTA5pbaR"; // Your TomTom API Key
    let url = `https://api.tomtom.com/routing/1/calculateRoute/${start[0]},${start[1]}:${end[0]},${end[1]}/json?key=${apiKey}&travelMode=car`;

    let response = await fetch(url);
    let data = await response.json();

    if (data.routes && data.routes.length > 0) {
        let routePoints = data.routes[0].legs[0].points.map(point => [point.latitude, point.longitude]);
        return routePoints;
    } else {
        alert("Route not found!");
        return null;
    }
}

// Function to Allocate Charging Stations Randomly Along Route
function allocateChargingStations(route) {
    let minStations = 2;
    let maxStations = 5;
    let numStations = Math.floor(Math.random() * (maxStations - minStations + 1)) + minStations; // Randomly choose between 2 and 5

    let step = Math.floor(route.length / (numStations + 1)); // Spread chargers evenly along route

    for (let i = 1; i <= numStations; i++) {
        let index = i * step; // Get a point along the route
        if (index < route.length) {
            let [lat, lon] = route[index];

            L.marker([lat, lon], { icon: chargingIcon })
                .addTo(chargingLayer)
                .bindPopup(`<b>EV Charging Station</b><br>Randomly Allocated`);
        }
    }
}
