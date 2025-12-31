# Text Message Indicator Setup

## Overview

The watchface now includes a text message indicator at the bottom of the screen. When you have unread text messages, it will display the count (e.g., "3 texts").

## How It Works

The watchface uses Pebble's AppMessage API to receive unread message counts from a companion phone app. The indicator:

- Shows at the bottom of the screen in gold text
- Displays the count when you have unread messages (e.g., "1 text" or "5 texts")
- Hides when there are no unread messages
- Updates automatically when the count changes

## Implementation Details

### Watch-Side (C)
- Added a TextLayer at the bottom of the screen
- Implemented AppMessage handlers to receive message counts
- Updates display based on received count

### Phone-Side (JavaScript)
- `src/pkjs/index.js` runs on the connected phone
- Sends message count updates to the watch
- Updates every 5 minutes and when requested

## Important Notes

⚠️ **Notification Access Limitation**: Direct SMS access is not available through PebbleKit JS due to privacy and security restrictions. To get actual unread message counts, you would need to:

1. **Android**: Create a companion Android app with `READ_SMS` permission and NotificationListenerService
2. **iOS**: Use the Notification Center API (limited access)
3. **Alternative**: Monitor notification events through Pebble's Timeline API

The current implementation provides the framework and structure. The JavaScript file includes a placeholder that always returns 0 messages. To make it functional, you would need to implement one of the solutions above.

## Testing

You can test the display by modifying the `messageCount` variable in `src/pkjs/index.js` to a non-zero value:

```javascript
var messageCount = 3; // This will show "3 texts" on the watch
```

## Future Enhancements

Possible improvements:
- Add an icon or symbol for visual indication
- Different colors based on urgency
- Tap to view message preview (requires additional implementation)
- Support for other notification types (email, missed calls, etc.)
