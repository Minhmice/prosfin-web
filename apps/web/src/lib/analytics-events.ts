/**
 * Analytics Events Taxonomy
 * 
 * Enum map for event taxonomy to ensure consistency.
 */

/**
 * Analytics event types
 */
export enum AnalyticsEvent {
  // Lead generation
  VIEW_SERVICES_LIST = "view_services_list",
  APPLY_FILTER = "apply_filter",
  APPLY_PRESET = "apply_preset",
  CLICK_SERVICE_CARD = "click_service_card",
  OPEN_COMPARE = "open_compare",
  OPEN_LEAD_MODAL = "open_lead_modal",
  SUBMIT_LEAD_STEP1 = "submit_lead_step1",
  SUBMIT_LEAD_STEP2 = "submit_lead_step2",
  
  // Legacy events (keep for backward compatibility)
  LEAD_CHECKLIST_SUBMIT = "lead_checklist_submit",
  BOOK_CALL_CLICK = "book_call_click",
  FORM_ERROR = "form_error",
  SCROLL_50 = "scroll_50",
  SCROLL_90 = "scroll_90",
  SERVICES_FILTER_CHANGED = "services_filter_changed",
  SERVICES_PRESET_APPLIED = "services_preset_applied",
  SERVICE_CARD_CLICKED = "service_card_clicked",
  COMPARE_OPENED = "compare_opened",
  CTA_MODAL_OPENED = "cta_modal_opened",
  
  // Tool events
  TOOL_VIEW = "tool_view",
  TOOL_INPUT_CHANGED = "tool_input_changed",
  TOOL_SCENARIO_APPLIED = "tool_scenario_applied",
  TOOL_EXPORT_CLICKED = "tool_export_clicked",
  TOOL_LEAD_MAGNET_OPENED = "tool_lead_magnet_opened",
  TOOL_LEAD_MAGNET_COMPLETED = "tool_lead_magnet_completed",
  TOOL_BOOK_CALL_CLICKED = "tool_book_call_clicked",
}

/**
 * Get event name from enum
 */
export function getEventName(event: AnalyticsEvent): string {
  return event;
}

