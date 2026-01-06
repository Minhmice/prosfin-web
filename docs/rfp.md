# RFP (Request Proposal) Form Documentation

## Tổng quan

RFP Form là form "Yêu cầu đề xuất dịch vụ" cho phép khách hàng gửi yêu cầu proposal cho 4 dịch vụ chính của ProsFIN. Form hỗ trợ upload tài liệu và tracking metadata để routing lead.

## Quy ước Field

### Required Fields

- `service`* - Dịch vụ muốn liên hệ (4 options)
- `title`* - Danh xưng (Ông/Bà/Cô/Tiến sĩ)
- `firstName`* - Tên (min 2 ký tự)
- `lastName`* - Họ (min 2 ký tự)
- `email`* - Email (valid format)
- `companyLocation`* - Địa điểm doanh nghiệp
- `industry`* - Ngành nghề
- `comments`* - Nội dung yêu cầu (min 30 ký tự)
- `acceptTerms`* - Đồng ý điều khoản (checkbox)

### Optional Fields

- `jobTitle` - Chức danh/Vị trí
- `phone` - Số điện thoại (nếu có thì phải valid format)
- `companyName` - Tên công ty/Tổ chức
- `yearlyRevenue` - Doanh thu hằng năm
- `attachment` - Tài liệu đính kèm (file upload)

### Hidden Fields (Tracking)

- `honeypot` - Anti-spam field (ẩn)
- `sourcePath` - Pathname của trang submit
- `referrer` - Referrer URL
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` - UTM parameters

## File Upload Limits

### Allowed File Types

- PDF: `.pdf`
- Word: `.doc`, `.docx`
- Excel: `.xlsx`
- Images: `.png`, `.jpg`

### Size Limit

- Maximum: **10MB** per file
- Single file only (v1)
- Multi-file support: Phase sau

### Validation

- **Client-side**: Zod schema validation trước khi submit
- **Server-side**: Defense-in-depth validation trong API route
- File type check: MIME type validation
- File size check: Size limit enforcement

## Routing Logic

### Service → Team Mapping

- `prosfin-cleardata` → ClearData team
- `prosfin-cfo-office` → CFO Office team
- `prosfin-oneledger` → OneLedger team
- `prosfin-performance-mentor` → Performance Mentor team

### Submission Pipeline (v1)

1. **Client**: Submit form với FormData (multipart)
2. **API Route**: Parse formData, validate, extract metadata
3. **Storage**: File metadata stored (file upload to storage: Phase sau)
4. **Routing**: Map service → team bucket
5. **Notification**: Log submission (email/DB: Phase sau)
6. **Response**: Return submissionId, redirect to thank-you page

### Future Enhancements

- Database storage (Postgres)
- Email notifications (internal + confirmation)
- CRM integration
- File storage (S3/R2/Supabase)
- Workflow triggers (n8n/Zapier)

## Validation Rules

### Client-side (React Hook Form + Zod)

- Required fields validation
- Email format validation
- Phone format validation (regex: `^[0-9+\-\s()]+$`)
- Comments min length: 30 characters
- File size: max 10MB
- File type: whitelist only

### Server-side (API Route)

- Defense-in-depth: Re-validate all fields
- Honeypot check: Reject if filled
- File validation: Size + type check
- Rate limiting: Phase sau (IP-based)

## Metadata Tracking

### Captured Data

- `sourcePath`: Pathname của trang submit
- `referrer`: Document referrer
- `utm_*`: UTM parameters từ URL
- `userAgent`: Browser user agent (optional)

### Attribution Hook

Form sử dụng `useAttribution` hook để capture:
- UTM params từ URL query
- Referrer từ document.referrer
- Landing path từ window.location.pathname

Data được lưu vào localStorage và gửi kèm form submission.

## Anti-spam Measures

### v1 Implementation

- **Honeypot field**: Hidden input field, reject if filled
- **Client validation**: Zod schema validation
- **Server validation**: Re-validate on server

### Future Enhancements

- Rate limiting (IP-based)
- Turnstile/Recaptcha integration
- Honeypot enhancement

## Error Handling

### Client-side

- Form validation errors hiển thị inline
- Submit errors hiển thị banner
- File upload errors hiển thị trong field

### Server-side

- Validation errors: 400 Bad Request với error details
- File errors: 400 với specific message
- Server errors: 500 với generic message
- All errors logged server-side

## Success Flow

1. Form submit → API route
2. API validates → stores submission → returns submissionId
3. Client redirects → `/request-proposal/thanks?submissionId={id}`
4. Thank-you page displays confirmation + next steps

## Notes

- Form tone: Professional, firm (theo Deloitte pattern)
- Upload docs: Optional nhưng khuyến khích
- Mailbox rule: Chỉ nhận qualified proposal requests
- Other inquiries: Redirect to Contact page

