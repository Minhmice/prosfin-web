/**
 * Slug Helper Utilities
 * 
 * Functions to generate and validate slugs for content items.
 * Ensures consistent URL-friendly slugs across the site.
 */

/**
 * Vietnamese character mapping for slug generation
 * Maps Vietnamese characters with diacritics to ASCII equivalents
 */
const VIETNAMESE_CHAR_MAP: Record<string, string> = {
  // a
  à: "a",
  á: "a",
  ạ: "a",
  ả: "a",
  ã: "a",
  â: "a",
  ầ: "a",
  ấ: "a",
  ậ: "a",
  ẩ: "a",
  ẫ: "a",
  ă: "a",
  ằ: "a",
  ắ: "a",
  ặ: "a",
  ẳ: "a",
  ẵ: "a",
  // e
  è: "e",
  é: "e",
  ẹ: "e",
  ẻ: "e",
  ẽ: "e",
  ê: "e",
  ề: "e",
  ế: "e",
  ệ: "e",
  ể: "e",
  ễ: "e",
  // i
  ì: "i",
  í: "i",
  ị: "i",
  ỉ: "i",
  ĩ: "i",
  // o
  ò: "o",
  ó: "o",
  ọ: "o",
  ỏ: "o",
  õ: "o",
  ô: "o",
  ồ: "o",
  ố: "o",
  ộ: "o",
  ổ: "o",
  ỗ: "o",
  ơ: "o",
  ờ: "o",
  ớ: "o",
  ợ: "o",
  ở: "o",
  ỡ: "o",
  // u
  ù: "u",
  ú: "u",
  ụ: "u",
  ủ: "u",
  ũ: "u",
  ư: "u",
  ừ: "u",
  ứ: "u",
  ự: "u",
  ử: "u",
  ữ: "u",
  // y
  ỳ: "y",
  ý: "y",
  ỵ: "y",
  ỷ: "y",
  ỹ: "y",
  // d
  đ: "d",
  // Uppercase variants
  À: "a",
  Á: "a",
  Ạ: "a",
  Ả: "a",
  Ã: "a",
  Â: "a",
  Ầ: "a",
  Ấ: "a",
  Ậ: "a",
  Ẩ: "a",
  Ẫ: "a",
  Ă: "a",
  Ằ: "a",
  Ắ: "a",
  Ặ: "a",
  Ẳ: "a",
  Ẵ: "a",
  È: "e",
  É: "e",
  Ẹ: "e",
  Ẻ: "e",
  Ẽ: "e",
  Ê: "e",
  Ề: "e",
  Ế: "e",
  Ệ: "e",
  Ể: "e",
  Ễ: "e",
  Ì: "i",
  Í: "i",
  Ị: "i",
  Ỉ: "i",
  Ĩ: "i",
  Ò: "o",
  Ó: "o",
  Ọ: "o",
  Ỏ: "o",
  Õ: "o",
  Ô: "o",
  Ồ: "o",
  Ố: "o",
  Ộ: "o",
  Ổ: "o",
  Ỗ: "o",
  Ơ: "o",
  Ờ: "o",
  Ớ: "o",
  Ợ: "o",
  Ở: "o",
  Ỡ: "o",
  Ù: "u",
  Ú: "u",
  Ụ: "u",
  Ủ: "u",
  Ũ: "u",
  Ư: "u",
  Ừ: "u",
  Ứ: "u",
  Ự: "u",
  Ử: "u",
  Ữ: "u",
  Ỳ: "y",
  Ý: "y",
  Ỵ: "y",
  Ỷ: "y",
  Ỹ: "y",
  Đ: "d",
};

/**
 * Convert Vietnamese text to ASCII slug
 * 
 * @param text - Input text to convert
 * @returns Kebab-case slug (lowercase, no spaces, no special chars)
 * 
 * @example
 * slugify("Tư vấn tài chính") // "tu-van-tai-chinh"
 * slugify("Kế toán & Thuế") // "ke-toan-thue"
 */
export function slugify(text: string): string {
  if (!text) return "";

  let result = text.trim().toLowerCase();

  // Replace Vietnamese characters with ASCII equivalents
  result = result.replace(/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]/g, (char) => {
    return VIETNAMESE_CHAR_MAP[char] || char;
  });

  // Replace spaces and special characters with hyphens
  result = result.replace(/[^\w\s-]/g, ""); // Remove special chars except word chars, spaces, hyphens
  result = result.replace(/\s+/g, "-"); // Replace spaces with hyphens
  result = result.replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen
  result = result.replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens

  return result;
}

/**
 * Assert that all items have unique slugs
 * 
 * Throws an error if duplicate slugs are found.
 * 
 * @param items - Array of items to check
 * @param getSlug - Function to extract slug from each item
 * @throws Error if duplicate slugs are found
 * 
 * @example
 * assertUniqueSlugs(services, (s) => s.slug)
 */
export function assertUniqueSlugs<T>(
  items: T[],
  getSlug: (item: T) => string
): void {
  const slugMap = new Map<string, T[]>();

  for (const item of items) {
    const slug = getSlug(item);
    if (!slug) continue;

    const existing = slugMap.get(slug) || [];
    existing.push(item);
    slugMap.set(slug, existing);
  }

  const duplicates: Array<{ slug: string; items: T[] }> = [];

  for (const [slug, itemsWithSlug] of slugMap.entries()) {
    if (itemsWithSlug.length > 1) {
      duplicates.push({ slug, items: itemsWithSlug });
    }
  }

  if (duplicates.length > 0) {
    const errorMessages = duplicates.map(({ slug, items }) => {
      const itemInfo = items.map((item, idx) => `  [${idx + 1}] ${JSON.stringify(item)}`).join("\n");
      return `Slug "${slug}" is used by ${items.length} items:\n${itemInfo}`;
    });

    throw new Error(
      `Duplicate slugs found:\n${errorMessages.join("\n\n")}`
    );
  }
}

