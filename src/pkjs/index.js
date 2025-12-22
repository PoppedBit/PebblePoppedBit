/**
 * Blood Angels Watchface - Warhammer 40K themed digital watch
 * "For Sanguinius! For the Emperor!"
 */

// Import Pebble module
var UI = require('ui');
var Vector2 = require('vector2');

// Blood Angels color scheme
var COLORS = {
  background: 'black',
  primary: '#DC143C',      // Crimson Red (Blood Angels chapter color)
  secondary: '#FFD700',    // Gold (accent color)
  text: '#FFFFFF'          // White text
};

// Create a more elaborate UI window for better styling
var wind = new UI.Window({
  fullscreen: true,
  backgroundColor: COLORS.background
});

// Title text - Chapter name
var titleText = new UI.Text({
  position: new Vector2(0, 10),
  size: new Vector2(144, 30),
  text: 'BLOOD ANGELS',
  font: 'gothic-18-bold',
  color: COLORS.primary,
  textAlign: 'center',
  backgroundColor: COLORS.background
});

// Time display
var timeText = new UI.Text({
  position: new Vector2(0, 50),
  size: new Vector2(144, 60),
  text: '00:00',
  font: 'bitham-42-bold',
  color: COLORS.text,
  textAlign: 'center',
  backgroundColor: COLORS.background
});

// Date display
var dateText = new UI.Text({
  position: new Vector2(0, 115),
  size: new Vector2(144, 25),
  text: '',
  font: 'gothic-18',
  color: COLORS.secondary,
  textAlign: 'center',
  backgroundColor: COLORS.background
});

// Chapter motto
var mottoText = new UI.Text({
  position: new Vector2(0, 145),
  size: new Vector2(144, 20),
  text: 'For Sanguinius!',
  font: 'gothic-14',
  color: COLORS.primary,
  textAlign: 'center',
  backgroundColor: COLORS.background
});

// Add all elements to the window
wind.add(titleText);
wind.add(timeText);
wind.add(dateText);
wind.add(mottoText);

// Function to format time
function formatTime(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  
  // Add leading zeros
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  
  return hours + ':' + minutes;
}

// Function to format date
function formatDate(date) {
  var days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 
                'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  
  var dayName = days[date.getDay()];
  var monthName = months[date.getMonth()];
  var day = date.getDate();
  
  return dayName + ' ' + monthName + ' ' + day;
}

// Update the time display
function updateTime() {
  var now = new Date();
  
  // Update time
  timeText.text(formatTime(now));
  
  // Update date
  dateText.text(formatDate(now));
}

// Show the window
wind.show();

// Update time immediately
updateTime();

// Update time every minute
setInterval(function() {
  updateTime();
}, 60000);

// Listen for when the window is shown
wind.on('show', function() {
  console.log('Blood Angels Watchface displayed - For the Emperor!');
  updateTime();
});

// Handle AppMessage events
Pebble.addEventListener('ready', function(e) {
  console.log('Blood Angels Watchface ready!');
  updateTime();
});
