const express = require('express');
const http = require('http');
const mqtt = require('mqtt');
const cors = require('cors');

// Create an Express app
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {cors: {origin: "*"}});

// Use CORS middleware allow every request to the server
app.use(cors());

// MQTT client setup
const mqttClient = mqtt.connect('mqtt://localhost'); // Replace with your MQTT broker URL
const topic = 'realtime/data'; // Replace with your topic

// MQTT subscription
mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
  mqttClient.subscribe(topic, (err) => {
    if (!err) {
      console.log(`Subscribed to topic: ${topic}`);
    }
  });
});

// Handling incoming MQTT messages
mqttClient.on('message', (topic, message) => {
  const dataPoint = message.toString();
  console.log('Received message:', dataPoint);

  // Emit the data to the client through Socket.io
  io.emit('newData', dataPoint);
});

app.get('/', (req, res) => {
    console.log('GET /');
});

// Start the server
server.listen(6996, () => {
  console.log('Server running on http://localhost:6996');
});
