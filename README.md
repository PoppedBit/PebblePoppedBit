# Blood Angels Watchface

A Warhammer 40K Blood Angels themed digital watch face for Pebble smartwatches, implemented in C.

## Description

This watchface honors the legendary Blood Angels chapter of Space Marines with a gothic, militaristic design featuring:

- **Digital time display** in bold, easy-to-read format
- **Blood Angels color scheme**: Crimson red, gold accents on black background
- **Chapter identification**: "BLOOD ANGELS" title
- **Chapter motto**: "For Sanguinius!" 
- **Date display**: Day and date in gothic styling

## Theme Elements

The Blood Angels are one of the First Founding Space Marine Chapters from Warhammer 40,000. This watchface captures their aesthetic with:
- Deep red (#DC143C) representing their chapter color
- Gold accents (#FFD700) for Imperial honors
- Black background for the gothic, grimdark atmosphere
- Battle-ready, no-nonsense digital time format

## Features

- 24-hour and 12-hour time format support
- Automatic date updates
- Compatible with multiple Pebble models (Aplite, Basalt, Chalk, Diorite)
- Implemented in C for native performance

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

## For Sanguinius! For the Emperor!

*In the grim darkness of the far future, there is only war... and telling the time.*