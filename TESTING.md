# Testing the Text Message Indicator

## Manual Testing Guide

Since we don't have access to the Pebble SDK or emulator in this environment, here's how to test this feature once you build and install the watchface:

### 1. Build the Watchface

```bash
pebble build
```

### 2. Install on Emulator

```bash
pebble install --emulator basalt
```

Or install on your physical watch:

```bash
pebble install --phone <your_phone_ip>
```

### 3. Test the Message Indicator

To test the text message indicator, modify `src/pkjs/index.js` and change the `messageCount` variable to simulate different message counts:

```javascript
// In the updateMessageCount() function, around line 25:
var messageCount = 3;  // Change this to test different counts
```

Expected behavior:
- **messageCount = 0**: No text shown at bottom
- **messageCount = 1**: "1 text" displayed at bottom in gold
- **messageCount = 3**: "3 texts" displayed at bottom in gold
- **messageCount = 10**: "10 texts" displayed at bottom in gold

### 4. Visual Verification Checklist

When testing, verify:
- [ ] The indicator appears at the bottom of the screen
- [ ] Text color is gold (matches the date color)
- [ ] Text is centered horizontally
- [ ] Font size is appropriate (GOTHIC_14)
- [ ] Singular "text" for 1 message, plural "texts" for multiple
- [ ] Indicator is hidden when messageCount is 0
- [ ] No visual overlap with other elements (time, date, battery)

### 5. AppMessage Testing

Check the Pebble app logs to verify AppMessage communication:

```bash
pebble logs
```

You should see:
- "PebbleKit JS ready!" when the watchface starts
- "Sending message count: X" when updates are sent
- "Message count sent successfully" when watch receives the message

### 6. Production Use

For real message count functionality, you'll need to:

1. **Android**: Create a companion app with NotificationListenerService
2. **iOS**: Use limited notification APIs available through PebbleKit
3. Integrate with a notification monitoring service that has proper permissions

## Testing Scenarios

### Scenario 1: Fresh Install
1. Install watchface
2. Should show no message indicator (0 messages)
3. Battery and time should display correctly

### Scenario 2: Receiving Messages
1. Simulate receiving messages by updating messageCount in JS
2. Rebuild and reinstall
3. Indicator should appear with correct count

### Scenario 3: Clearing Messages
1. Set messageCount back to 0
2. Rebuild and reinstall
3. Indicator should disappear

### Scenario 4: Multiple Updates
1. Test rapid count changes (0 → 5 → 2 → 0)
2. Verify display updates correctly each time
3. Check for memory leaks or display issues

## Common Issues

### Issue: MESSAGE_KEY_MessageCount undefined
**Solution**: Make sure the build system has generated the message keys from appinfo.json. This happens automatically during `pebble build`.

### Issue: Messages not received on watch
**Solution**: 
- Check AppMessage is opened with sufficient buffer size (128 bytes)
- Verify phone Bluetooth connection
- Check Pebble app logs for errors

### Issue: Text not visible
**Solution**:
- Verify text color (GColorChromeYellow) is visible on your Pebble model
- Check layer positioning doesn't place it off-screen
- For black & white models (Aplite, Diorite), color will appear as white

## Performance Testing

Monitor these metrics:
- Memory usage (should not increase over time)
- Battery impact (minimal, updates every 5 minutes)
- Display refresh rate (should be instant on message count change)
