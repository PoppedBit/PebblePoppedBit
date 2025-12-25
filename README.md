# Simple Watchface

A minimalist digital watch face for Pebble smartwatches, implemented in C.

## Description

This watchface features a clean, simple design with:

- **Digital time display** in bold, easy-to-read format
- **Minimalist color scheme**: White time, gold date on black background
- **Date display**: Day and date below the time

## Design Elements

The watchface features:
- Clean black background
- White time display for maximum readability
- Gold date accent
- Centered layout focused on essential information

## Features

- 24-hour and 12-hour time format support
- Automatic date updates
- Compatible with multiple Pebble models (Aplite, Basalt, Chalk, Diorite, Emery)
- Implemented in C for native performance
- Minimalist, distraction-free design

## Installation

1. Install the Pebble SDK
2. Clone this repository
3. Build the project:
   ```bash
   pebble build
   ```
4. Install on your Pebble watch:
   ```bash
   sudo pebble install --emulator basalt
   # or
   pebble install --phone <phone_ip>
   ```

## Development

The watchface uses:
- **C**: Native implementation in `src/c/main.c`
- **Pebble SDK 3**: Compatible with all Pebble watch models

## Files

- `src/c/main.c` - C watch face implementation
- `appinfo.json` - Pebble app metadata
- `wscript` - Build configuration