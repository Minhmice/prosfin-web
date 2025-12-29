/**
 * Content Marker Parser
 * 
 * Utility functions để parse markers trong content data và convert thành ReactNode.
 * 
 * Ví dụ: "ClearData{tm}" → "ClearData™" (với TM là superscript)
 */

import * as React from "react";

/**
 * Parse text có marker {tm} thành ReactNode với superscript
 * 
 * @param text - Text có thể chứa marker {tm}
 * @returns ReactNode - Text đã được parse với superscript inline (không có wrapper span)
 * 
 * @example
 * parseMarkers("ClearData{tm} là gì?") 
 * // Returns: ["ClearData", <sup>TM</sup>, " là gì?"]
 */
export function parseMarkers(text: string | React.ReactNode): React.ReactNode {
  if (typeof text !== "string") {
    return text;
  }

  // Check if text contains {tm} marker
  if (!text.includes("{tm}")) {
    return text;
  }

  // Parse {tm} marker and convert to superscript
  const result: React.ReactNode[] = [];
  let remaining = text;
  let keyCounter = 0;

  while (remaining.length > 0) {
    const markerIndex = remaining.indexOf("{tm}");
    
    if (markerIndex === -1) {
      // No more markers, add remaining text and break
      if (remaining.length > 0) {
        result.push(remaining);
      }
      break;
    }
    
    // Add text before marker
    if (markerIndex > 0) {
      result.push(remaining.substring(0, markerIndex));
    }
    
    // Add superscript TM - render directly inline without span wrapper
    result.push(
      <sup 
        key={`tm-${keyCounter++}`} 
        style={{ fontSize: '0.5em', verticalAlign: 'super', lineHeight: 0 }}
      >
        TM
      </sup>
    );
    
    // Continue with remaining text after marker
    remaining = remaining.substring(markerIndex + 4); // 4 = "{tm}".length
  }

  // Return array directly - React will render inline without extra spacing
  return <>{result}</>;
}

