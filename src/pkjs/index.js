// PebbleKit JS for YouTube Subscriber Count

// S3 URL placeholder - USER MUST UPDATE THIS before deploying
// For production, consider using environment variables or a configuration mechanism
// The placeholder URL is intentionally generic and must be replaced with your actual bucket URL
var SUBSCRIBER_URL = 'https://YOUR-S3-BUCKET.s3.amazonaws.com/youtube-subscribers.json';

// App message keys
var MESSAGE_KEY_SUBSCRIBER_COUNT = 0;

// Fetch interval: 15 minutes in milliseconds
var FETCH_INTERVAL_MS = 900000;

// Last known subscriber count
var lastSubscriberCount = null;

// Fetch subscriber count from S3
function fetchSubscriberCount() {
  console.log('Fetching subscriber count from: ' + SUBSCRIBER_URL);
  
  var xhr = new XMLHttpRequest();
  xhr.open('GET', SUBSCRIBER_URL, true);
  xhr.timeout = 10000; // 10 second timeout
  
  xhr.onload = function() {
    if (xhr.status === 200) {
      try {
        var data = xhr.responseText;
        var subscriberCount = null;
        
        // Try to parse as JSON first
        try {
          var jsonData = JSON.parse(data);
          if (jsonData.subscribers !== undefined) {
            subscriberCount = parseInt(jsonData.subscribers);
          }
        } catch (jsonError) {
          // If JSON parsing fails, try to parse as plain number
          subscriberCount = parseInt(data.trim());
        }
        
        if (subscriberCount !== null && !isNaN(subscriberCount)) {
          console.log('Subscriber count: ' + subscriberCount);
          lastSubscriberCount = subscriberCount;
          sendSubscriberCount(subscriberCount);
        } else {
          console.log('Invalid subscriber count format');
          // Send last known value or -1 to indicate error
          sendSubscriberCount(lastSubscriberCount !== null ? lastSubscriberCount : -1);
        }
      } catch (e) {
        console.log('Error parsing subscriber count: ' + e.message);
        sendSubscriberCount(lastSubscriberCount !== null ? lastSubscriberCount : -1);
      }
    } else {
      console.log('HTTP error: ' + xhr.status);
      sendSubscriberCount(lastSubscriberCount !== null ? lastSubscriberCount : -1);
    }
  };
  
  xhr.onerror = function() {
    console.log('Network error fetching subscriber count');
    sendSubscriberCount(lastSubscriberCount !== null ? lastSubscriberCount : -1);
  };
  
  xhr.ontimeout = function() {
    console.log('Request timeout fetching subscriber count');
    sendSubscriberCount(lastSubscriberCount !== null ? lastSubscriberCount : -1);
  };
  
  xhr.send();
}

// Send subscriber count to watch via AppMessage
function sendSubscriberCount(count) {
  var message = {};
  message[MESSAGE_KEY_SUBSCRIBER_COUNT] = count;
  
  Pebble.sendAppMessage(message, 
    function() {
      console.log('Message sent successfully: ' + count);
    },
    function(e) {
      console.log('Message failed: ' + e.error.message);
    }
  );
}

// Listen for when the watchface is opened
Pebble.addEventListener('ready', function() {
  console.log('PebbleKit JS ready!');
  
  // Fetch subscriber count immediately when watch face is opened
  fetchSubscriberCount();
  
  // Set up timer to fetch every 15 minutes
  setInterval(function() {
    fetchSubscriberCount();
  }, FETCH_INTERVAL_MS);
});

// Listen for incoming AppMessages from watch (if needed in future)
Pebble.addEventListener('appmessage', function(e) {
  console.log('AppMessage received: ' + JSON.stringify(e.payload));
});
