/**
 * @prosfin/ui - Shared UI package
 * 
 * Exports all UI components, wrappers, and utilities
 */

// Utils
export { cn } from "./utils";

// UI Components (shadcn/ui)
export * from "./components/ui/button";
export * from "./components/ui/card";
export * from "./components/ui/table";
export * from "./components/ui/dialog";
export * from "./components/ui/input";
export * from "./components/ui/label";
export * from "./components/ui/sheet";
export * from "./components/ui/badge";
export * from "./components/ui/separator";
export * from "./components/ui/tabs";
export * from "./components/ui/textarea";
export * from "./components/ui/dropdown-menu";
export * from "./components/ui/collapsible";
export * from "./components/ui/radio-group";
export * from "./components/ui/select";
export * from "./components/ui/toggle-group";
export * from "./components/ui/tooltip";
export * from "./components/ui/sidebar";
export * from "./components/ui/avatar";

// Admin-specific components
export * from "./components/admin/admin-page-shell";
export * from "./components/admin/admin-toolbar";
export * from "./components/admin/admin-section-card";
export * from "./components/admin/admin-empty-state";
export * from "./components/admin/admin-skeleton";
export * from "./components/admin/admin-error-state";

// Theme tokens (CSS file) - import directly in CSS files using @import "@prosfin/ui/tokens/theme.css"

