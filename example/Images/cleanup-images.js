const fs = require('fs');
const path = require('path');

// Đọc file HTML
const htmlPath = path.join(__dirname, 'image-stock.html');
let html = fs.readFileSync(htmlPath, 'utf8');
const originalLength = html.length;

// Danh sách ID ảnh đã dùng
const usedIds = [
  '159888',  // service advisor, post-8
  '669610',  // service execution-coaching, post-3
  '164527',  // service consulting, post-4
  '210600',  // service mentor, post-5
  '50987',   // service headhunt, post-2
  '259200',  // service test, post-6
  '590020',  // service audit, post-1, post-9
  '590016',  // service seminar, post-7
  '2182970', // person-1
  '3184405', // person-2, person-6, person-10
  '3183150', // person-3, person-7
  '3182812', // person-4, person-8
  '3184339', // person-5, person-9
];

console.log('Bắt đầu xử lý...');

// Tìm và xóa các block chứa ảnh đã dùng
let cleaned = html;
let removedCount = 0;

// Tách HTML thành các items
const items = [];
const itemRegex = /<div[^>]*class="GridLayout_item__7PC6A"[^>]*data-testid="item"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/g;
let itemMatch;

while ((itemMatch = itemRegex.exec(html)) !== null) {
  const itemContent = itemMatch[1];
  const itemFull = itemMatch[0];
  
  // Kiểm tra xem item này có chứa ảnh đã dùng không
  let shouldRemove = false;
  for (const id of usedIds) {
    if (itemContent.includes(`photos/${id}`)) {
      shouldRemove = true;
      break;
    }
  }
  
  if (!shouldRemove) {
    items.push(itemFull);
  } else {
    removedCount++;
    console.log(`Đã đánh dấu xóa 1 block chứa ảnh đã dùng`);
  }
}

// Xây dựng lại HTML
// Tìm phần container
const containerStart = html.indexOf('<div class="GridLayout_section__U35dt"');
const containerEnd = html.indexOf('</div>', html.lastIndexOf('GridLayout_item'));

if (containerStart !== -1) {
  const beforeContainer = html.substring(0, containerStart);
  const afterContainer = html.substring(html.lastIndexOf('</div>', html.lastIndexOf('</div>', html.lastIndexOf('GridLayout_section'))) + 6);
  
  // Tạo lại phần items
  const itemsHtml = items.join('\n        ');
  
  cleaned = beforeContainer + 
    '<div class="GridLayout_section__U35dt" data-testid="section">\n' +
    '      <div data-testid="column" class="GridLayout_column__h_9QD">\n' +
    '        ' + itemsHtml + '\n' +
    '      </div>\n' +
    '    </div>' +
    afterContainer;
} else {
  // Nếu không tìm thấy container, chỉ xóa các items đã dùng
  usedIds.forEach(id => {
    const pattern = new RegExp(`<div[^>]*class="GridLayout_item__7PC6A"[^>]*data-testid="item"[^>]*>[\\s\\S]*?photos/${id}[\\s\\S]*?</div>\\s*</div>\\s*</div>`, 'g');
    const before = cleaned.length;
    cleaned = cleaned.replace(pattern, '');
    if (cleaned.length !== before) {
      removedCount++;
    }
  });
}

// Ghi lại file HTML đã làm sạch
fs.writeFileSync(htmlPath, cleaned);
console.log(`Đã xóa ${removedCount} block ảnh đã dùng`);

// Extract các link ảnh chưa dùng từ HTML gốc (trước khi xóa)
console.log('Đang extract các link ảnh chưa dùng...');
const imageRegex = /https:\/\/images\.pexels\.com\/photos\/(\d+)\/pexels-photo-\d+\.jpeg\?auto=compress[^"'\s<>]*/g;
const found = new Set();
let imgMatch;

// Dùng HTML hiện tại để extract (sau khi đã xóa các ảnh đã dùng)
const currentHtml = fs.readFileSync(htmlPath, 'utf8');

// Reset regex
imageRegex.lastIndex = 0;

while ((imgMatch = imageRegex.exec(currentHtml)) !== null) {
  const id = imgMatch[1];
  if (!usedIds.includes(id)) {
    // Lấy link, chuẩn hóa
    let url = imgMatch[0].replace(/&amp;/g, '&');
    // Đảm bảo có w=800
    if (!url.includes('w=')) {
      url += (url.includes('?') ? '&' : '?') + 'w=800';
    } else {
      url = url.replace(/w=\d+/, 'w=800');
    }
    found.add(url);
  }
}

// Sắp xếp và loại bỏ duplicate (chỉ lấy base URL unique)
const uniqueLinks = [];
const seenBases = new Set();

Array.from(found).sort().forEach(url => {
  const base = url.split('?')[0];
  if (!seenBases.has(base)) {
    seenBases.add(base);
    uniqueLinks.push(url);
  }
});

const txtPath = path.join(__dirname, 'unused-images.txt');
fs.writeFileSync(txtPath, uniqueLinks.join('\n'));

console.log(`Đã tạo file unused-images.txt với ${uniqueLinks.length} link ảnh chưa dùng (unique)`);

