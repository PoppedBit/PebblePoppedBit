# Visual Design - Text Message Indicator

## Watchface Layout with Message Indicator

### Layout Diagram
```
┌────────────────────────────────────┐
│                            85%     │ ← Battery (top-right, white, 18pt)
│                                    │
│                                    │
│           12:45                    │ ← Time (center, white, 42pt bold)
│                                    │
│       MON DEC 22                   │ ← Date (center, gold, 18pt)
│                                    │
│                                    │
│                                    │
│          3 texts                   │ ← Message Count (bottom, gold, 14pt)
└────────────────────────────────────┘
```

## Display States

### State 1: No Messages (Default)
```
┌────────────────────────────────────┐
│                            85%     │
│                                    │
│                                    │
│           12:45                    │
│                                    │
│       MON DEC 22                   │
│                                    │
│                                    │
│                                    │
│                                    │ ← Empty (no text shown)
└────────────────────────────────────┘
```

### State 2: One Message
```
┌────────────────────────────────────┐
│                            85%     │
│                                    │
│                                    │
│           12:45                    │
│                                    │
│       MON DEC 22                   │
│                                    │
│                                    │
│                                    │
│           1 text                   │ ← Singular form
└────────────────────────────────────┘
```

### State 3: Multiple Messages
```
┌────────────────────────────────────┐
│                            85%     │
│                                    │
│                                    │
│           12:45                    │
│                                    │
│       MON DEC 22                   │
│                                    │
│                                    │
│                                    │
│          5 texts                   │ ← Plural form
└────────────────────────────────────┘
```

## Technical Specifications

### Text Layer Properties
- **Position**: Bottom of screen (bounds.size.h - 25 pixels)
- **Height**: 25 pixels (MESSAGE_LAYER_HEIGHT constant)
- **Width**: Full screen width
- **Background**: Black (GColorBlack)
- **Text Color**: Gold/Chrome Yellow (GColorChromeYellow)
- **Font**: GOTHIC_14
- **Alignment**: Center

### Text Format
- **0 messages**: Empty string (layer hidden)
- **1 message**: "1 text"
- **N messages**: "N texts" (where N > 1)

## Color Compatibility

### Color Displays (Basalt, Chalk, Emery)
- Battery: White (#FFFFFF)
- Time: White (#FFFFFF)
- Date: Chrome Yellow/Gold
- Message Count: Chrome Yellow/Gold (matches date)

### Black & White Displays (Aplite, Diorite)
- Battery: White
- Time: White
- Date: White (color automatically converted)
- Message Count: White (color automatically converted)

## Spacing & Layout Measurements

```
Screen Height: Varies by model
├─ 0-25px:      Battery indicator zone
├─ 25-50px:     Empty space
├─ 50-110px:    Time display (60px high)
├─ 105-130px:   Date display (25px high)
├─ 130-143px:   Empty space
└─ 143-168px:   Message indicator (25px high)

For 168px tall screen (Basalt/Aplite standard)
```

## Interaction Flow

```
Phone App (JavaScript)
        ↓
    [Monitors notifications]
        ↓
    [Counts unread messages]
        ↓
    [Sends via AppMessage]
        ↓
        ↓
Watch App (C)
        ↓
    [Receives AppMessage]
        ↓
    [Updates message count]
        ↓
    [Refreshes display]
        ↓
    [Shows/hides indicator]
```

## Design Rationale

1. **Bottom Placement**: Doesn't interfere with primary time display
2. **Gold Color**: Matches date color for visual consistency
3. **Smaller Font**: Less prominent than time/date, appropriate for secondary info
4. **Center Aligned**: Balanced, easy to read at a glance
5. **Conditional Display**: Only shows when relevant (messages exist)
6. **Simple Text**: "X text(s)" is clear and concise

## Accessibility

- High contrast (gold on black) for readability
- Simple, clear text format
- Adequate font size (14pt) for glanceability
- Centered placement for easy viewing
- No reliance on icons (text-based)
