/**
 * Error Codes
 * 
 * Error code constants và user-friendly messages (VN).
 */

/**
 * Error code constants
 */
export const ERROR_CODES = {
  VALIDATION_ERROR: "VALIDATION_ERROR",
  BOT_SUSPECTED: "BOT_SUSPECTED",
  RATE_LIMITED: "RATE_LIMITED",
  DUPLICATE_LEAD: "DUPLICATE_LEAD",
  INTERNAL_ERROR: "INTERNAL_ERROR",
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

/**
 * Error messages (Vietnamese)
 */
const ERROR_MESSAGES: Record<ErrorCode, string> = {
  [ERROR_CODES.VALIDATION_ERROR]:
    "Thông tin không hợp lệ. Vui lòng kiểm tra lại các trường bắt buộc.",
  [ERROR_CODES.BOT_SUSPECTED]:
    "Không thể xác thực. Vui lòng thử lại sau.",
  [ERROR_CODES.RATE_LIMITED]:
    "Bạn thao tác quá nhanh. Vui lòng đợi một chút rồi thử lại.",
  [ERROR_CODES.DUPLICATE_LEAD]:
    "Thông tin đã được gửi. Chúng tôi sẽ liên hệ với bạn sớm nhất.",
  [ERROR_CODES.INTERNAL_ERROR]:
    "Có lỗi xảy ra. Vui lòng thử lại sau hoặc liên hệ hỗ trợ.",
};

/**
 * Get user-friendly error message
 */
export function getErrorMessage(code: string): string {
  return (
    ERROR_MESSAGES[code as ErrorCode] ||
    ERROR_MESSAGES[ERROR_CODES.INTERNAL_ERROR]
  );
}

