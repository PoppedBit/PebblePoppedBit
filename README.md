# Simple Watchface

A minimalist digital watch face for Pebble smartwatches, implemented in C.

## Description

This watchface features a clean, simple design with:

- **Digital time display** in bold, easy-to-read format
- **Minimalist color scheme**: White time, gold date on black background
- **Date display**: Day and date below the time
- **YouTube subscriber count**: Displays subscriber count in the upper left corner (updates every 15 minutes)
- **Battery indicator**: Shows battery percentage in the upper right corner

## Design Elements

The watchface features:
- Clean black background
- White time display for maximum readability
- Gold date accent
- Centered layout focused on essential information
- Unobtrusive status indicators in corners

## Features

- 24-hour and 12-hour time format support
- Automatic date updates
- Battery level indicator
- YouTube subscriber count display with smart formatting (K for thousands, M for millions)
- Compatible with multiple Pebble models (Aplite, Basalt, Chalk, Diorite, Emery)
- Implemented in C for native performance
- Minimalist, distraction-free design

## YouTube Subscriber Count

The watchface fetches and displays YouTube subscriber count from an S3 bucket. See [YOUTUBE_SUBSCRIBER_FEATURE.md](YOUTUBE_SUBSCRIBER_FEATURE.md) for configuration details.

## Installation

1. Install the Pebble SDK
2. Clone this repository
3. Configure the S3 URL in `src/pkjs/index.js` (see [YOUTUBE_SUBSCRIBER_FEATURE.md](YOUTUBE_SUBSCRIBER_FEATURE.md))
4. Build the project:
   ```bash
   pebble build
   ```
5. Install on your Pebble watch:
   ```bash
   sudo pebble install --emulator basalt
   # or
   pebble install --phone <phone_ip>
   ```

## Development

The watchface uses:
- **C**: Native implementation in `src/c/main.c`
- **JavaScript**: PebbleKit JS in `src/pkjs/index.js` for HTTP requests
- **Pebble SDK 3**: Compatible with all Pebble watch models

## Files

- `src/c/main.c` - C watch face implementation
- `src/pkjs/index.js` - JavaScript for fetching subscriber count
- `appinfo.json` - Pebble app metadata
- `wscript` - Build configuration
- `YOUTUBE_SUBSCRIBER_FEATURE.md` - Documentation for the subscriber count feature