# YouTube Subscriber Count Feature

This watchface now displays the YouTube subscriber count for the PoppedBitADV channel in the upper left corner.

## Display Layout

```
┌────────────────────────────────────┐
│ 1.2K                          85%  │  <- Subscribers (left) and Battery (right)
│                                    │
│                                    │
│           12:45                    │  <- Time
│                                    │
│       MON DEC 22                   │  <- Date
│                                    │
│                                    │
└────────────────────────────────────┘
```

## Configuration

### Setting Up the S3 URL

The subscriber count is fetched from an S3 bucket. To configure the URL:

1. Open `src/pkjs/index.js`
2. Update line 4 to point to your S3 bucket:
   ```javascript
   var SUBSCRIBER_URL = 'https://your-bucket-name.s3.amazonaws.com/youtube-subscribers.json';
   ```

### S3 File Format

The S3 file should contain JSON in the following format:

```json
{
  "subscribers": 1234
}
```

Alternatively, you can use a plain text file with just the number:

```
1234
```

## Features

- **Automatic Updates**: Fetches new subscriber count every 15 minutes
- **Error Handling**: Shows "---" if data cannot be fetched, or displays the last known value
- **Smart Formatting**: 
  - Numbers < 1,000: Shows raw number (e.g., "123")
  - Numbers 1,000-999,999: Shows in K format (e.g., "1.2K")
  - Numbers ≥ 1,000,000: Shows in M format (e.g., "1.5M")
- **Minimalist Design**: Uses GOTHIC_14 font to maintain the clean aesthetic

## Battery Indicator

The battery indicator is displayed in the upper right corner. It uses the GOTHIC_14 font for consistency with the subscriber count.

## Technical Details

### Communication Flow

1. **JavaScript Side** (`src/pkjs/index.js`):
   - Fetches subscriber count from S3 URL
   - Parses JSON or plain text response
   - Sends data to watch via AppMessage

2. **Watch Side** (`src/c/main.c`):
   - Receives subscriber count via AppMessage
   - Updates the subscriber count TextLayer
   - Formats the number for display

### AppMessage Configuration

- **Message Key**: `SUBSCRIBER_COUNT = 0`
- **Buffer Size**: 128 bytes (inbox and outbox)
- **Capabilities**: `configurable` (enables JavaScript execution)

## Building and Installing

1. Build the watchface:
   ```bash
   pebble build
   ```

2. Install on your Pebble:
   ```bash
   pebble install --emulator basalt
   # or
   pebble install --phone <phone_ip>
   ```

## Troubleshooting

### Subscriber count shows "---"

- Check that the S3 URL is correct in `src/pkjs/index.js`
- Verify the S3 file is publicly accessible
- Check the Pebble app logs for error messages
- Ensure your phone has an active internet connection

### JavaScript not running

- Verify that `appinfo.json` has the `configurable` capability
- Ensure the Pebble app on your phone is running
- Check that Bluetooth is enabled and connected

## Logs

You can view logs from the JavaScript side using the Pebble tool:

```bash
pebble logs --phone <phone_ip>
```

Look for messages like:
- "PebbleKit JS ready!"
- "Fetching subscriber count from: ..."
- "Subscriber count: 1234"
- "Message sent successfully: 1234"
