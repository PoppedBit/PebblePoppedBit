// PebbleKit JS for text message indicator
// This script runs on the phone and sends unread message counts to the watch

// Listen for when the watchface is opened
Pebble.addEventListener('ready', function(e) {
  console.log('PebbleKit JS ready!');
  
  // Request initial message count
  updateMessageCount();
});

// Listen for messages from the watch
Pebble.addEventListener('appmessage', function(e) {
  console.log('AppMessage received!');
  updateMessageCount();
});

// Function to get and send message count
function updateMessageCount() {
  // Note: Direct SMS access is not available in PebbleKit JS for privacy/security reasons
  // This is a placeholder that demonstrates the structure
  // In a real implementation, you would need to:
  // 1. Use a companion Android/iOS app with proper permissions
  // 2. Or use notification monitoring (which requires separate setup)
  
  // For demonstration, we'll send a simulated count
  // In production, this would come from a proper notification monitoring service
  var messageCount = 0;
  
  // Try to use Timeline API or notifications if available
  // This is a simplified version - actual implementation would require
  // proper notification access permissions on the phone
  
  console.log('Sending message count: ' + messageCount);
  
  // Send message count to watch using numeric key (must match appinfo.json appKeys)
  Pebble.sendAppMessage({
    0: messageCount  // MessageCount key from appinfo.json
  }, function() {
    console.log('Message count sent successfully');
  }, function(e) {
    console.log('Failed to send message count: ' + JSON.stringify(e));
  });
}

// Update message count periodically (every 5 minutes)
setInterval(updateMessageCount, 5 * 60 * 1000);
