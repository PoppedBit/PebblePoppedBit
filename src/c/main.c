#include <pebble.h>

// App message keys
#define MESSAGE_KEY_SUBSCRIBER_COUNT 0

static Window *s_main_window;
static TextLayer *s_time_layer;
static TextLayer *s_date_layer;
static TextLayer *s_battery_layer; // Battery text layer
static TextLayer *s_subscriber_layer; // Subscriber count text layer

static int s_subscriber_count = -1; // -1 indicates no data yet

static void update_time()
{
    // Get a tm structure
    time_t temp = time(NULL);
    struct tm *tick_time = localtime(&temp);

    // Write the current hours and minutes into a buffer
    static char s_time_buffer[16];
    strftime(s_time_buffer, sizeof(s_time_buffer),
             clock_is_24h_style() ? "%H:%M" : "%I:%M", tick_time);

    // Display this time on the TextLayer
    text_layer_set_text(s_time_layer, s_time_buffer);

    // Update date
    static char s_date_buffer[16];
    strftime(s_date_buffer, sizeof(s_date_buffer), "%a %b %d", tick_time);
    text_layer_set_text(s_date_layer, s_date_buffer);
}

// Battery update handler
static void battery_callback(BatteryChargeState state)
{
    static char s_battery_buffer[8];
    snprintf(s_battery_buffer, sizeof(s_battery_buffer), "%d%%", state.charge_percent);
    text_layer_set_text(s_battery_layer, s_battery_buffer);
}

// Subscriber count update handler
static void update_subscriber_display()
{
    static char s_subscriber_buffer[16];
    
    if (s_subscriber_count < 0) {
        // No data or error
        snprintf(s_subscriber_buffer, sizeof(s_subscriber_buffer), "---");
    } else if (s_subscriber_count >= 1000000) {
        // Display as M (millions)
        snprintf(s_subscriber_buffer, sizeof(s_subscriber_buffer), "%.1fM", (double)s_subscriber_count / 1000000.0);
    } else if (s_subscriber_count >= 1000) {
        // Display as K (thousands)
        snprintf(s_subscriber_buffer, sizeof(s_subscriber_buffer), "%.1fK", (double)s_subscriber_count / 1000.0);
    } else {
        // Display raw number
        snprintf(s_subscriber_buffer, sizeof(s_subscriber_buffer), "%d", s_subscriber_count);
    }
    
    text_layer_set_text(s_subscriber_layer, s_subscriber_buffer);
}

// AppMessage inbox received callback
static void inbox_received_callback(DictionaryIterator *iterator, void *context)
{
    // Read subscriber count from the message
    Tuple *subscriber_tuple = dict_find(iterator, MESSAGE_KEY_SUBSCRIBER_COUNT);
    
    if (subscriber_tuple) {
        s_subscriber_count = (int)subscriber_tuple->value->int32;
        APP_LOG(APP_LOG_LEVEL_INFO, "Received subscriber count: %d", s_subscriber_count);
        update_subscriber_display();
    }
}

// AppMessage inbox dropped callback
static void inbox_dropped_callback(AppMessageResult reason, void *context)
{
    APP_LOG(APP_LOG_LEVEL_ERROR, "Message dropped: %d", (int)reason);
}

// AppMessage outbox failed callback
static void outbox_failed_callback(DictionaryIterator *iterator, AppMessageResult reason, void *context)
{
    APP_LOG(APP_LOG_LEVEL_ERROR, "Outbox send failed: %d", (int)reason);
}

// AppMessage outbox sent callback
static void outbox_sent_callback(DictionaryIterator *iterator, void *context)
{
    APP_LOG(APP_LOG_LEVEL_INFO, "Outbox send success!");
}

static void tick_handler(struct tm *tick_time, TimeUnits units_changed)
{
    update_time();
}

static void main_window_load(Window *window)
{
    // Get information about the Window
    Layer *window_layer = window_get_root_layer(window);
    GRect bounds = layer_get_bounds(window_layer);

    // Create the time TextLayer
    s_time_layer = text_layer_create(
        GRect(0, 50, bounds.size.w, 60));
    text_layer_set_background_color(s_time_layer, GColorBlack);
    text_layer_set_text_color(s_time_layer, GColorWhite);
    text_layer_set_text(s_time_layer, "00:00");
    text_layer_set_font(s_time_layer, fonts_get_system_font(FONT_KEY_BITHAM_42_BOLD));
    text_layer_set_text_alignment(s_time_layer, GTextAlignmentCenter);

    // Create the date TextLayer
    s_date_layer = text_layer_create(
        GRect(0, 105, bounds.size.w, 25));
    text_layer_set_background_color(s_date_layer, GColorBlack);
    text_layer_set_text_color(s_date_layer, GColorChromeYellow);
    text_layer_set_font(s_date_layer, fonts_get_system_font(FONT_KEY_GOTHIC_18));
    text_layer_set_text_alignment(s_date_layer, GTextAlignmentCenter);

    // Create the subscriber count TextLayer (top-left corner)
    s_subscriber_layer = text_layer_create(
        GRect(5, 5, 45, 20));
    text_layer_set_background_color(s_subscriber_layer, GColorBlack);
    text_layer_set_text_color(s_subscriber_layer, GColorWhite);
    text_layer_set_font(s_subscriber_layer, fonts_get_system_font(FONT_KEY_GOTHIC_14));
    text_layer_set_text_alignment(s_subscriber_layer, GTextAlignmentLeft);
    text_layer_set_text(s_subscriber_layer, "---");

    // Create the battery TextLayer (top-right corner)
    s_battery_layer = text_layer_create(
        GRect(bounds.size.w - 50, 5, 45, 20));
    text_layer_set_background_color(s_battery_layer, GColorBlack);
    text_layer_set_text_color(s_battery_layer, GColorWhite);
    text_layer_set_font(s_battery_layer, fonts_get_system_font(FONT_KEY_GOTHIC_14));
    text_layer_set_text_alignment(s_battery_layer, GTextAlignmentRight);
    text_layer_set_text(s_battery_layer, "100%");

    // Add child layers to the Window's root layer
    layer_add_child(window_layer, text_layer_get_layer(s_time_layer));
    layer_add_child(window_layer, text_layer_get_layer(s_date_layer));
    layer_add_child(window_layer, text_layer_get_layer(s_battery_layer));
    layer_add_child(window_layer, text_layer_get_layer(s_subscriber_layer));
}

static void main_window_unload(Window *window)
{
    // Destroy TextLayers
    text_layer_destroy(s_time_layer);
    text_layer_destroy(s_date_layer);
    text_layer_destroy(s_battery_layer);
    text_layer_destroy(s_subscriber_layer);
}

static void init()
{
    // Create main Window element and assign to pointer
    s_main_window = window_create();
    window_set_background_color(s_main_window, GColorBlack);

    // Set handlers to manage the elements inside the Window
    window_set_window_handlers(s_main_window, (WindowHandlers){
                                                  .load = main_window_load,
                                                  .unload = main_window_unload});

    // Show the Window on the watch, with animated=true
    window_stack_push(s_main_window, true);

    // Make sure the time is displayed from the start
    update_time();

    // Subscribe to battery service and display initial battery level
    battery_state_service_subscribe(battery_callback);
    battery_callback(battery_state_service_peek());

    // Register with TickTimerService
    tick_timer_service_subscribe(MINUTE_UNIT, tick_handler);

    // Register AppMessage callbacks
    app_message_register_inbox_received(inbox_received_callback);
    app_message_register_inbox_dropped(inbox_dropped_callback);
    app_message_register_outbox_failed(outbox_failed_callback);
    app_message_register_outbox_sent(outbox_sent_callback);

    // Open AppMessage
    const int inbox_size = 128;
    const int outbox_size = 128;
    app_message_open(inbox_size, outbox_size);

    // Initialize subscriber display
    update_subscriber_display();
}

static void deinit()
{
    // Unsubscribe from tick timer service
    tick_timer_service_unsubscribe();

    // Unsubscribe from battery service
    battery_state_service_unsubscribe();

    // Destroy Window
    window_destroy(s_main_window);
}

int main(void)
{
    init();
    app_event_loop();
    deinit();
}