# Blood Angels Watchface - Visual Design

## Layout

```
┌────────────────────────────────────┐
│                            85%     │  <- Battery % (top-right, white)
│                                    │
│                                    │
│           12:45                    │  <- White text, large bold font
│                                    │
│       MON DEC 22                   │  <- Gold text (#FFD700)
│                                    │
│                                    │
│                                    │
│          3 texts                   │  <- Gold text, message indicator
└────────────────────────────────────┘
     Black background (#000000)
```

## Color Scheme

- **Background**: Black (#000000) - Clean and simple
- **Text (Time)**: White (#FFFFFF) - High contrast for readability
- **Text (Date)**: Gold (#FFD700) - Accent color

## Design Elements

### Layout Philosophy
- **Minimalist**: Clean, uncluttered design focused on essential information
- **Centered**: Time prominently displayed in the middle
- **Practical**: Easy-to-read digital time with date below

### Typography
- Time: BITHAM 42 BOLD (largest, most prominent)
- Date: GOTHIC 18

## Features
- Automatic time updates every minute
- 12/24 hour format support (based on watch settings)
- Date display with day name abbreviation
- Battery percentage indicator (top-right)
- Text message count indicator (bottom, shown only when messages exist)
- Minimalist design for quick glanceability
- Low power consumption (updates only when needed)
- AppMessage integration for phone communication

## Compatibility
- Pebble Classic (Aplite) - Black & White
- Pebble Steel (Aplite) - Black & White  
- Pebble Time (Basalt) - Color display
- Pebble Time Round (Chalk) - Color, round display
- Pebble 2 (Diorite) - Black & White
