export function DesktopWireframe() {
    return (
      <div>
  
        {/* Hero Section */}
        <section className="px-[160px] py-16">
          <div className="max-w-[1120px] mx-auto">
            <div className="grid grid-cols-12 gap-6">
              {/* Left Column - Content (7 cols) */}
              <div className="col-span-7 pr-8">
                {/* H1 */}
                <h1 className="text-5xl mb-6 text-gray-900">
                  Doanh nghiệp bạn có đang sống chung với '2 sổ kế toán'?
                </h1>
  
                {/* Subhead */}
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  Dữ liệu không nhất quán khiến bạn không truy vết, không đối chiếu, và khó giải trình khi cần.
                </p>
  
                {/* Bullets */}
                <div className="space-y-4 mb-12">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-gray-800 mt-2"></div>
                    <span className="text-gray-800">Một nguồn dữ liệu nhất quán</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-gray-800 mt-2"></div>
                    <span className="text-gray-800">Truy vết & đối chiếu rõ ràng</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-gray-800 mt-2"></div>
                    <span className="text-gray-800">Quản trị được cho CEO/CFO</span>
                  </div>
                </div>
  
                {/* Trust Badges */}
                <div className="flex items-center gap-4">
                  <div className="px-4 py-2 border border-gray-400 rounded-lg">
                    <span className="text-sm text-gray-700">Bảo mật dữ liệu</span>
                  </div>
                  <div className="px-4 py-2 border border-gray-400 rounded-lg">
                    <span className="text-sm text-gray-700">Chuẩn hoá số liệu</span>
                  </div>
                  <div className="px-4 py-2 border border-gray-400 rounded-lg">
                    <span className="text-sm text-gray-700">Tư vấn trực tiếp</span>
                  </div>
                </div>
              </div>
  
              {/* Right Column - Form Card (5 cols) */}
              <div className="col-span-5">
                <div className="bg-gray-50 border-2 border-gray-400 rounded-2xl p-6 shadow-lg">
                  {/* Form Title */}
                  <h3 className="text-2xl mb-2 text-gray-900">
                    Nhận Checklist CLEAR
                  </h3>
                  
                  {/* Form Description */}
                  <p className="text-sm text-gray-600 mb-6">
                    Checklist 15 điểm tự soi rủi ro 'kẹt 2 sổ' và lộ trình làm sạch dữ liệu.
                  </p>
  
                  {/* Form Fields */}
                  <div className="space-y-4">
                    {/* Name Input */}
                    <div>
                      <label className="block text-sm mb-2 text-gray-700">
                        Họ và tên
                      </label>
                      <input
                        type="text"
                        placeholder="VD: Nguyễn Văn A"
                        className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg bg-white text-gray-800 placeholder:text-gray-500"
                      />
                    </div>
  
                    {/* Contact Input */}
                    <div>
                      <label className="block text-sm mb-2 text-gray-700">
                        SĐT hoặc Email
                      </label>
                      <input
                        type="text"
                        placeholder="VD: 09… hoặc email@…"
                        className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg bg-white text-gray-800 placeholder:text-gray-500"
                      />
                    </div>
  
                    {/* Revenue Select */}
                    <div>
                      <label className="block text-sm mb-2 text-gray-700">
                        Quy mô doanh thu/năm
                      </label>
                      <select className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg bg-white text-gray-700">
                        <option>Chọn một</option>
                        <option>Dưới 10 tỷ</option>
                        <option>10-50 tỷ</option>
                        <option>50-200 tỷ</option>
                        <option>Trên 200 tỷ</option>
                      </select>
                    </div>
  
                    {/* Primary CTA */}
                    <button className="w-full py-4 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors">
                      Nhận Checklist CLEAR
                    </button>
  
                    {/* Secondary CTA */}
                    <button className="w-full py-3 text-gray-700 hover:text-gray-900 transition-colors underline">
                      Đặt lịch tư vấn 15–30 phút
                    </button>
  
                    {/* Privacy Note */}
                    <p className="text-xs text-gray-600 leading-relaxed pt-2">
                      ProsFIN cam kết bảo mật. Thông tin chỉ dùng để gửi checklist và liên hệ khi bạn đồng ý.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        {/* Lead Magnet Section */}
        <section className="px-[160px] py-14 bg-gray-200">
          <div className="max-w-[1120px] mx-auto">
            <div className="grid grid-cols-12 gap-8 items-center">
              {/* Left Column - Content (8 cols) */}
              <div className="col-span-8">
                {/* Title */}
                <h2 className="text-3xl mb-4 text-gray-900">
                  NHẬN CHECKLIST CLEAR — 15 điểm tự soi rủi ro 'kẹt 2 sổ'
                </h2>
  
                {/* Subhead */}
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Checklist giúp bạn xác định phần nào đang lệch, mức độ rủi ro, và gợi ý lộ trình làm sạch dữ liệu theo từng bước.
                </p>
  
                {/* Bullets */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 border-2 border-gray-800 rounded mt-0.5 flex items-center justify-center">
                      <div className="w-2 h-2 bg-gray-800"></div>
                    </div>
                    <span className="text-gray-800">Xác định điểm lệch: công nợ, kho, giá vốn, chi phí</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 border-2 border-gray-800 rounded mt-0.5 flex items-center justify-center">
                      <div className="w-2 h-2 bg-gray-800"></div>
                    </div>
                    <span className="text-gray-800">Ước lượng mức rủi ro & mức độ cần xử lý</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 border-2 border-gray-800 rounded mt-0.5 flex items-center justify-center">
                      <div className="w-2 h-2 bg-gray-800"></div>
                    </div>
                    <span className="text-gray-800">Gợi ý lộ trình chuyển đổi an toàn, không gián đoạn</span>
                  </div>
                </div>
              </div>
  
              {/* Right Column - CTA Stack (4 cols) */}
              <div className="col-span-4">
                <div className="bg-white border-2 border-gray-400 rounded-xl p-6 shadow-md relative">
                  {/* Primary CTA */}
                  <button className="w-full py-4 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors mb-3">
                    Nhận Checklist CLEAR
                  </button>
  
                  {/* Interaction hint */}
                  <div className="absolute -right-2 top-6 bg-yellow-100 border border-yellow-400 px-2 py-1 rounded text-xs text-gray-700 w-48 -rotate-2">
                    Click → scroll to Hero Form or modal
                  </div>
  
                  {/* Secondary CTA */}
                  <button className="w-full py-3 border-2 border-gray-400 text-gray-700 rounded-lg hover:border-gray-600 transition-colors mb-3">
                    Đặt lịch tư vấn 15–30 phút
                  </button>
  
                  {/* Note */}
                  <p className="text-xs text-gray-600 text-center">
                    Nhận qua email/Zalo trong thời gian ngắn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        {/* Objections Section */}
        <section className="px-[160px] py-16 bg-white">
          <div className="max-w-[1120px] mx-auto">
            {/* Title */}
            <h2 className="text-4xl mb-4 text-gray-900">
              Vì sao biết rủi ro nhưng vẫn chưa dám chuyển?
            </h2>
  
            {/* Subhead */}
            <p className="text-lg text-gray-700 mb-12 leading-relaxed max-w-[900px]">
              Đa số doanh nghiệp không thiếu thiện chí, mà thiếu một lộ trình đủ an toàn để làm sạch dữ liệu.
            </p>
  
            {/* Cards Grid */}
            <div className="grid grid-cols-3 gap-6">
              {/* Card 01 */}
              <div className="bg-gray-50 border border-gray-400 rounded-2xl p-6 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-gray-300 mb-5"></div>
                
                <h3 className="text-lg mb-3 text-gray-900">
                  Sợ đụng vào quá khứ — càng làm càng rối
                </h3>
                
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  Nhiều khoản lệch tích tụ lâu, thiếu đối chiếu theo nguồn chứng từ nên càng chạm càng khó.
                </p>
                
                <p className="text-xs text-gray-500 italic">
                  Cần làm theo bước, khoanh vùng đúng điểm lệch.
                </p>
              </div>
  
              {/* Card 02 */}
              <div className="bg-gray-50 border border-gray-400 rounded-2xl p-6 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-gray-300 mb-5"></div>
                
                <h3 className="text-lg mb-3 text-gray-900">
                  Thiếu người đủ năng lực tổ chức lại
                </h3>
                
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  Không phải ai cũng vừa hiểu nghiệp vụ vừa dựng được hệ mã, quy trình và kiểm soát dữ liệu.
                </p>
                
                <p className="text-xs text-gray-500 italic">
                  Cần bộ checklist + chuẩn hoá để giảm phụ thuộc cá nhân.
                </p>
              </div>
  
              {/* Card 03 */}
              <div className="bg-gray-50 border border-gray-400 rounded-2xl p-6 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-gray-300 mb-5"></div>
                
                <h3 className="text-lg mb-3 text-gray-900">
                  Sợ ảnh hưởng vận hành hiện tại
                </h3>
                
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  Lo dừng hệ thống, chậm chốt số, ảnh hưởng bán hàng/kho/thu chi.
                </p>
                
                <p className="text-xs text-gray-500 italic">
                  Cần lộ trình triển khai không gián đoạn.
                </p>
              </div>
            </div>
          </div>
        </section>
  
        {/* Solution Section */}
        <section className="px-[160px] py-16 bg-gray-50">
          <div className="max-w-[1120px] mx-auto">
            <div className="grid grid-cols-12 gap-12">
              {/* Left Column - Definition (7 cols) */}
              <div className="col-span-7">
                {/* Eyebrow */}
                <div className="text-xs uppercase tracking-wider text-gray-600 mb-3">
                  GIẢI PHÁT
                </div>
  
                {/* Title */}
                <h2 className="text-4xl mb-6 text-gray-900">
                  ProsFIN ClearData<sup className="text-2xl">TM</sup> là gì?
                </h2>
  
                {/* Definition */}
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  ClearData<sup className="text-sm">TM</sup> là dịch vụ kế toán–thuế theo chuẩn dữ liệu, thiết kế để giúp doanh nghiệp chuyển từ '2 sổ' sang một hệ số liệu nhất quán, truy vết và đối chiếu được; vừa đáp ứng nghĩa vụ thuế, vừa phục vụ quản trị và làm việc với ngân hàng/đối tác.
                </p>
  
                {/* Key Outcomes Chips */}
                <div className="flex items-center gap-3">
                  <div className="px-5 py-2 bg-gray-800 text-white rounded-full text-sm">
                    Nhất quán
                  </div>
                  <div className="px-5 py-2 bg-gray-800 text-white rounded-full text-sm">
                    Truy vết
                  </div>
                  <div className="px-5 py-2 bg-gray-800 text-white rounded-full text-sm">
                    Quản trị được
                  </div>
                </div>
              </div>
  
              {/* Right Column - 3 Pillars (5 cols) */}
              <div className="col-span-5">
                {/* Pillars Title */}
                <h3 className="text-lg mb-5 text-gray-700">
                  3 trụ cột
                </h3>
  
                {/* Pillars Stack */}
                <div className="space-y-5">
                  {/* Pillar 01 */}
                  <div className="bg-white border border-gray-400 rounded-xl p-5">
                    <div className="w-8 h-8 rounded bg-gray-300 mb-3"></div>
                    <h4 className="text-lg mb-2 text-gray-900">
                      Chuẩn hoá dữ liệu đầu vào
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Chuẩn hệ mã, chứng từ, luồng ghi nhận để số liệu 'đúng nguồn'.
                    </p>
                  </div>
  
                  {/* Pillar 02 */}
                  <div className="bg-white border border-gray-400 rounded-xl p-5">
                    <div className="w-8 h-8 rounded bg-gray-300 mb-3"></div>
                    <h4 className="text-lg mb-2 text-gray-900">
                      Đối chiếu & làm sạch theo bước
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Khoanh vùng điểm lệch (công nợ/kho/giá vốn/chi phí) và xử lý có kiểm soát.
                    </p>
                  </div>
  
                  {/* Pillar 03 */}
                  <div className="bg-white border border-gray-400 rounded-xl p-5">
                    <div className="w-8 h-8 rounded bg-gray-300 mb-3"></div>
                    <h4 className="text-lg mb-2 text-gray-900">
                      Báo cáo phục vụ quyết định
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Tạo lớp báo cáo quản trị để CEO/CFO nhìn được bức tranh thật.
                    </p>
                  </div>
                </div>
  
                {/* Mini Diagram */}
                <div className="mt-6 flex items-center justify-between px-4">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-300 rounded-lg mb-2"></div>
                    <span className="text-xs text-gray-600">Chuẩn hoá</span>
                  </div>
                  <div className="text-gray-400 text-2xl">→</div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-300 rounded-lg mb-2"></div>
                    <span className="text-xs text-gray-600">Đối chiếu</span>
                  </div>
                  <div className="text-gray-400 text-2xl">→</div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-300 rounded-lg mb-2"></div>
                    <span className="text-xs text-gray-600">Báo cáo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        {/* Differentiation Section */}
        <section className="px-[160px] py-16 bg-white">
          <div className="max-w-[1120px] mx-auto">
            {/* Title */}
            <h2 className="text-4xl mb-4 text-gray-900">
              Khác gì so với dịch vụ kế toán thông thường?
            </h2>
  
            {/* Subhead */}
            <p className="text-lg text-gray-700 mb-12 leading-relaxed max-w-[900px]">
              Không chỉ 'làm xong kỳ', mục tiêu là tạo một hệ dữ liệu đủ sạch để bạn quản trị và giải trình.
            </p>
  
            {/* Comparison Table */}
            <div className="bg-gray-50 border-2 border-gray-400 rounded-2xl overflow-hidden mb-8">
              {/* Table Header */}
              <div className="grid grid-cols-2 bg-gray-800 text-white">
                <div className="px-8 py-5 border-r border-gray-600">
                  <h3 className="text-lg">Kế toán dịch vụ thông thường</h3>
                </div>
                <div className="px-8 py-5">
                  <h3 className="text-lg">ProsFIN ClearData<sup className="text-xs">TM</sup></h3>
                </div>
              </div>
  
              {/* Row 01 - Mục tiêu */}
              <div className="border-b border-gray-300">
                <div className="px-6 py-4 bg-gray-200 border-b border-gray-300">
                  <h4 className="text-sm text-gray-700">Mục tiêu</h4>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-8 py-5 border-r border-gray-300">
                    <p className="text-sm text-gray-700">
                      Chốt số, nộp báo cáo đúng hạn
                    </p>
                  </div>
                  <div className="px-8 py-5 bg-white">
                    <p className="text-sm text-gray-900">
                      Một hệ số liệu nhất quán: thuế + quản trị + đối chiếu
                    </p>
                  </div>
                </div>
              </div>
  
              {/* Row 02 - Cách làm */}
              <div className="border-b border-gray-300">
                <div className="px-6 py-4 bg-gray-200 border-b border-gray-300">
                  <h4 className="text-sm text-gray-700">Cách làm</h4>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-8 py-5 border-r border-gray-300">
                    <p className="text-sm text-gray-700">
                      Xử lý theo sự vụ, tuỳ người làm
                    </p>
                  </div>
                  <div className="px-8 py-5 bg-white">
                    <p className="text-sm text-gray-900">
                      Chuẩn hoá luồng dữ liệu + checklist + quy trình đối chiếu
                    </p>
                  </div>
                </div>
              </div>
  
              {/* Row 03 - Truy vết & đối chiếu */}
              <div className="border-b border-gray-300">
                <div className="px-6 py-4 bg-gray-200 border-b border-gray-300">
                  <h4 className="text-sm text-gray-700">Truy vết & đối chiếu</h4>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-8 py-5 border-r border-gray-300">
                    <p className="text-sm text-gray-700">
                      Khó truy vết khi phát sinh
                    </p>
                  </div>
                  <div className="px-8 py-5 bg-white">
                    <p className="text-sm text-gray-900">
                      Truy vết theo chứng từ, đối chiếu theo bước
                    </p>
                  </div>
                </div>
              </div>
  
              {/* Row 04 - Phụ thuộc nhân sự */}
              <div className="border-b border-gray-300">
                <div className="px-6 py-4 bg-gray-200 border-b border-gray-300">
                  <h4 className="text-sm text-gray-700">Phụ thuộc nhân sự</h4>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-8 py-5 border-r border-gray-300">
                    <p className="text-sm text-gray-700">
                      Phụ thuộc 1–2 người nắm 'bí kíp'
                    </p>
                  </div>
                  <div className="px-8 py-5 bg-white">
                    <p className="text-sm text-gray-900">
                      Giảm phụ thuộc bằng chuẩn hoá & chuyển giao
                    </p>
                  </div>
                </div>
              </div>
  
              {/* Row 05 - Kết quả cho CEO/CFO */}
              <div>
                <div className="px-6 py-4 bg-gray-200 border-b border-gray-300">
                  <h4 className="text-sm text-gray-700">Kết quả cho CEO/CFO</h4>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-8 py-5 border-r border-gray-300">
                    <p className="text-sm text-gray-700">
                      Nhận báo cáo nhưng khó dùng để quyết định
                    </p>
                  </div>
                  <div className="px-8 py-5 bg-white">
                    <p className="text-sm text-gray-900">
                      Có lớp báo cáo quản trị, phản ánh thực tế hơn
                    </p>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Inline CTA Strip */}
            <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 flex items-center justify-between">
              <div>
                <p className="text-lg text-gray-900">
                  Muốn biết doanh nghiệp bạn đang lệch ở đâu?
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors">
                  Nhận Checklist CLEAR
                </button>
                <a href="#" className="text-sm text-gray-700 hover:text-gray-900 underline">
                  Book call 15–30 phút
                </a>
              </div>
            </div>
          </div>
        </section>
  
        {/* Scope Section */}
        <section className="px-[160px] py-16 bg-gray-50">
          <div className="max-w-[1120px] mx-auto">
            {/* Title */}
            <h2 className="text-4xl mb-4 text-gray-900">
              ClearData<sup className="text-2xl">TM</sup> bao gồm những gì?
            </h2>
  
            {/* Subhead */}
            <p className="text-lg text-gray-700 mb-12 leading-relaxed max-w-[900px]">
              Phạm vi được thiết kế để vừa đảm bảo nghĩa vụ kế toán–thuế, vừa làm sạch và chuẩn hoá dữ liệu để quản trị.
            </p>
  
            <div className="grid grid-cols-12 gap-8">
              {/* Left Column - 4 Scope Cards (7 cols) */}
              <div className="col-span-7">
                <div className="grid grid-cols-2 gap-6">
                  {/* Card 01 - Kế toán Thuế */}
                  <div className="bg-white border border-gray-400 rounded-2xl p-6">
                    <div className="w-8 h-8 rounded bg-gray-300 mb-4"></div>
                    <h3 className="text-lg mb-4 text-gray-900">
                      Kế toán – Thuế định kỳ
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>Ghi nhận & hạch toán theo chuẩn</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>Kê khai/hoàn thiện hồ sơ định kỳ</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>Rà soát lỗi sai phổ biến</span>
                      </li>
                    </ul>
                  </div>
  
                  {/* Card 02 - Rà soát & Làm sạch */}
                  <div className="bg-white border border-gray-400 rounded-2xl p-6">
                    <div className="w-8 h-8 rounded bg-gray-300 mb-4"></div>
                    <h3 className="text-lg mb-4 text-gray-900">
                      Rà soát & Làm sạch dữ liệu
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>Chuẩn số dư, công nợ, kho, giá vốn</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>Chuẩn hệ mã & danh mục</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>Đối chiếu theo chứng từ, truy vết</span>
                      </li>
                    </ul>
                  </div>
  
                  {/* Card 03 - Giảm rủi ro */}
                  <div className="bg-white border border-gray-400 rounded-2xl p-6">
                    <div className="w-8 h-8 rounded bg-gray-300 mb-4"></div>
                    <h3 className="text-lg mb-4 text-gray-900">
                      Giảm rủi ro & Tối ưu hợp lệ
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>Soát rủi ro thuế theo nhóm nghiệp vụ</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>Tối ưu chi phí hợp lệ (đúng bản chất)</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>Khuyến nghị kiểm soát phòng ngừa</span>
                      </li>
                    </ul>
                  </div>
  
                  {/* Card 04 - Báo cáo quản trị */}
                  <div className="bg-white border border-gray-400 rounded-2xl p-6">
                    <div className="w-8 h-8 rounded bg-gray-300 mb-4"></div>
                    <h3 className="text-lg mb-4 text-gray-900">
                      Báo cáo quản trị cho CEO/CFO
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>Báo cáo tổng quan dễ đọc</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>Chỉ số trọng yếu theo hoạt động</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>Q&A/đồng hành ra quyết định</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
  
              {/* Right Column - Deliverables Panel (5 cols) */}
              <div className="col-span-5">
                <div className="bg-white border-2 border-gray-400 rounded-2xl p-6 h-full">
                  {/* Title */}
                  <h3 className="text-xl mb-6 text-gray-900">
                    Đầu ra bạn nhận được
                  </h3>
  
                  {/* Checklist */}
                  <ul className="space-y-4 mb-6">
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 border-2 border-gray-800 rounded mt-0.5 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-gray-800"></div>
                      </div>
                      <span className="text-sm text-gray-700">Checklist CLEAR (15 điểm)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 border-2 border-gray-800 rounded mt-0.5 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-gray-800"></div>
                      </div>
                      <span className="text-sm text-gray-700">Bộ hệ mã/danh mục chuẩn hoá (template)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 border-2 border-gray-800 rounded mt-0.5 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-gray-800"></div>
                      </div>
                      <span className="text-sm text-gray-700">Bảng đối chiếu công nợ/kho/giá vốn (mẫu)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 border-2 border-gray-800 rounded mt-0.5 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-gray-800"></div>
                      </div>
                      <span className="text-sm text-gray-700">Biên bản/nhật ký làm sạch dữ liệu theo kỳ</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 border-2 border-gray-800 rounded mt-0.5 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-gray-800"></div>
                      </div>
                      <span className="text-sm text-gray-700">Báo cáo quản trị (mẫu 1–2 trang)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 border-2 border-gray-800 rounded mt-0.5 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-gray-800"></div>
                      </div>
                      <span className="text-sm text-gray-700">Khuyến nghị kiểm soát nội bộ tối thiểu</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 border-2 border-gray-800 rounded mt-0.5 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-gray-800"></div>
                      </div>
                      <span className="text-sm text-gray-700">Hướng dẫn bàn giao để tự duy trì</span>
                    </li>
                  </ul>
  
                  {/* Note */}
                  <div className="pt-4 border-t border-gray-300">
                    <p className="text-xs text-gray-600 italic leading-relaxed">
                      Deliverables có thể tinh chỉnh theo quy mô & mức độ phức tạp.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        {/* Process Section */}
        <section className="px-[160px] py-16 bg-white">
          <div className="max-w-[1120px] mx-auto">
            {/* Title */}
            <h2 className="text-4xl mb-4 text-gray-900">
              Triển khai theo 3 bước — không gián đoạn vận hành
            </h2>
  
            {/* Subhead */}
            <p className="text-lg text-gray-700 mb-12 leading-relaxed max-w-[900px]">
              Lộ trình được thiết kế để xử lý theo bước, khoanh vùng điểm lệch và ổn định hệ dữ liệu dần theo thời gian.
            </p>
  
            {/* Stepper - 3 Steps */}
            <div className="grid grid-cols-3 gap-8 mb-8">
              {/* Step 01 */}
              <div className="bg-gray-50 border-2 border-gray-400 rounded-2xl p-6 relative">
                {/* Step Number */}
                <div className="absolute top-6 right-6 w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center">
                  <span className="text-xl">01</span>
                </div>
  
                {/* Title */}
                <h3 className="text-lg mb-4 text-gray-900 pr-14">
                  Khảo sát & Khoanh vùng điểm lệch
                </h3>
  
                {/* Bullets */}
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-gray-400 mt-1">•</span>
                    <span>Thu thập dữ liệu & hiện trạng sổ sách</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-gray-400 mt-1">•</span>
                    <span>Xác định khu vực rủi ro: công nợ/kho/chi phí</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-gray-400 mt-1">•</span>
                    <span>Chốt phạm vi ưu tiên theo tác động</span>
                  </li>
                </ul>
  
                {/* Output Tag */}
                <div className="inline-block px-4 py-2 bg-gray-800 text-white rounded-full text-xs">
                  Risk map + scope
                </div>
              </div>
  
              {/* Step 02 */}
              <div className="bg-gray-50 border-2 border-gray-400 rounded-2xl p-6 relative">
                {/* Step Number */}
                <div className="absolute top-6 right-6 w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center">
                  <span className="text-xl">02</span>
                </div>
  
                {/* Title */}
                <h3 className="text-lg mb-4 text-gray-900 pr-14">
                  Chuẩn hoá & Đối chiếu theo bước
                </h3>
  
                {/* Bullets */}
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-gray-400 mt-1">•</span>
                    <span>Chuẩn hệ mã/danh mục + quy tắc ghi nhận</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-gray-400 mt-1">•</span>
                    <span>Đối chiếu theo chứng từ, tạo nhật ký xử lý</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-gray-400 mt-1">•</span>
                    <span>Giải quyết điểm lệch theo thứ tự ưu tiên</span>
                  </li>
                </ul>
  
                {/* Output Tag */}
                <div className="inline-block px-4 py-2 bg-gray-800 text-white rounded-full text-xs">
                  Clean data log
                </div>
              </div>
  
              {/* Step 03 */}
              <div className="bg-gray-50 border-2 border-gray-400 rounded-2xl p-6 relative">
                {/* Step Number */}
                <div className="absolute top-6 right-6 w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center">
                  <span className="text-xl">03</span>
                </div>
  
                {/* Title */}
                <h3 className="text-lg mb-4 text-gray-900 pr-14">
                  Ổn định hệ số liệu & Chuyển giao duy trì
                </h3>
  
                {/* Bullets */}
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-gray-400 mt-1">•</span>
                    <span>Thiết lập checklist kiểm soát định kỳ</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-gray-400 mt-1">•</span>
                    <span>Báo cáo quản trị tối thiểu cho CEO/CFO</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-gray-400 mt-1">•</span>
                    <span>Bàn giao template + hướng dẫn vận hành</span>
                  </li>
                </ul>
  
                {/* Output Tag */}
                <div className="inline-block px-4 py-2 bg-gray-800 text-white rounded-full text-xs">
                  Handover pack
                </div>
              </div>
            </div>
  
            {/* Assurance Bar */}
            <div className="bg-gray-800 text-white rounded-xl px-8 py-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Shield Icon */}
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-5 h-6 border-2 border-white rounded-sm"></div>
                </div>
  
                {/* Text */}
                <p className="text-base">
                  Nguyên tắc triển khai: làm theo bước, ưu tiên ổn định, không đứt gãy vận hành.
                </p>
              </div>
  
              {/* Badges */}
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 bg-gray-700 rounded-lg text-sm">
                  Khoanh vùng
                </div>
                <div className="px-4 py-2 bg-gray-700 rounded-lg text-sm">
                  Đối chiếu
                </div>
                <div className="px-4 py-2 bg-gray-700 rounded-lg text-sm">
                  Chuyển giao
                </div>
              </div>
            </div>
          </div>
        </section>
  
        {/* Outcomes Section */}
        <section className="px-[160px] py-16 bg-gray-50">
          <div className="max-w-[1120px] mx-auto">
            <div className="grid grid-cols-12 gap-10">
              {/* Left Column - Outcomes List (7 cols) */}
              <div className="col-span-7">
                {/* Title */}
                <h2 className="text-4xl mb-6 text-gray-900">
                  Bạn nhận được gì sau ClearData<sup className="text-2xl">TM</sup>?
                </h2>
  
                {/* Paragraph */}
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  Mục tiêu không phải 'đẹp sổ', mà là một hệ dữ liệu đủ sạch để bạn vận hành, quản trị và giải trình.
                </p>
  
                {/* Bullets */}
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 border-2 border-gray-800 rounded mt-0.5 flex items-center justify-center flex-shrink-0">
                      <div className="w-3 h-3 bg-gray-800"></div>
                    </div>
                    <span className="text-lg text-gray-800">Một hệ dữ liệu sạch và nhất quán</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 border-2 border-gray-800 rounded mt-0.5 flex items-center justify-center flex-shrink-0">
                      <div className="w-3 h-3 bg-gray-800"></div>
                    </div>
                    <span className="text-lg text-gray-800">Giảm rủi ro đối chiếu thuế và hồ sơ</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 border-2 border-gray-800 rounded mt-0.5 flex items-center justify-center flex-shrink-0">
                      <div className="w-3 h-3 bg-gray-800"></div>
                    </div>
                    <span className="text-lg text-gray-800">Không lệ thuộc vào một cá nhân</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 border-2 border-gray-800 rounded mt-0.5 flex items-center justify-center flex-shrink-0">
                      <div className="w-3 h-3 bg-gray-800"></div>
                    </div>
                    <span className="text-lg text-gray-800">Số liệu phản ánh thực tế tốt hơn</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 border-2 border-gray-800 rounded mt-0.5 flex items-center justify-center flex-shrink-0">
                      <div className="w-3 h-3 bg-gray-800"></div>
                    </div>
                    <span className="text-lg text-gray-800">CEO/CFO ra quyết định trên dữ liệu đáng tin</span>
                  </li>
                </ul>
              </div>
  
              {/* Right Column - Outcome Summary Card (5 cols) */}
              <div className="col-span-5">
                <div className="bg-white border-2 border-gray-400 rounded-2xl p-7 shadow-md">
                  {/* Title */}
                  <h3 className="text-xl mb-6 text-gray-900 text-center">
                    Outcome Snapshot
                  </h3>
  
                  {/* Blocks Stack */}
                  <div className="space-y-5 mb-6">
                    {/* Block 1 - Data Integrity */}
                    <div className="pb-5 border-b border-gray-300">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-gray-300 rounded"></div>
                        <h4 className="text-base text-gray-900">Data Integrity</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        Số liệu nhất quán, truy vết được theo chứng từ
                      </p>
                    </div>
  
                    {/* Block 2 - Compliance Readiness */}
                    <div className="pb-5 border-b border-gray-300">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-gray-300 rounded"></div>
                        <h4 className="text-base text-gray-900">Compliance Readiness</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        Đáp ứng nghĩa vụ thuế và sẵn sàng đối chiếu
                      </p>
                    </div>
  
                    {/* Block 3 - Management Visibility */}
                    <div className="pb-5 border-b border-gray-300">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-gray-300 rounded"></div>
                        <h4 className="text-base text-gray-900">Management Visibility</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        Báo cáo quản trị phản ánh bức tranh thực tế
                      </p>
                    </div>
                  </div>
  
                  {/* Mini KPI Row */}
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <div className="px-4 py-2 bg-gray-800 text-white rounded-full text-xs">
                      Truy vết
                    </div>
                    <div className="px-4 py-2 bg-gray-800 text-white rounded-full text-xs">
                      Đối chiếu
                    </div>
                    <div className="px-4 py-2 bg-gray-800 text-white rounded-full text-xs">
                      Báo cáo
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        {/* Commitments Section */}
        <section className="px-[160px] py-16 bg-gray-100">
          <div className="max-w-[1120px] mx-auto">
            {/* Title */}
            <h2 className="text-4xl mb-4 text-gray-900">
              Cam kết khi triển khai
            </h2>
  
            {/* Subhead */}
            <p className="text-lg text-gray-700 mb-12 leading-relaxed max-w-[900px]">
              Chúng tôi tập trung vào tính đúng bản chất, khả năng đối chiếu và chuyển giao để doanh nghiệp tự duy trì.
            </p>
  
            {/* Badges Grid */}
            <div className="grid grid-cols-4 gap-6">
              {/* Badge 01 */}
              <div className="bg-white border border-gray-400 rounded-2xl p-6 text-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg mb-3 text-gray-900">
                  Đúng hạn – đúng bản chất – đối chiếu được
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Đảm bảo tính chính xác và khả năng truy vết theo chứng từ
                </p>
              </div>
  
              {/* Badge 02 */}
              <div className="bg-white border border-gray-400 rounded-2xl p-6 text-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg mb-3 text-gray-900">
                  Đồng hành đến khi hệ số liệu ổn định
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Hỗ trợ liên tục cho đến khi dữ liệu được làm sạch và ổn định
                </p>
              </div>
  
              {/* Badge 03 */}
              <div className="bg-white border border-gray-400 rounded-2xl p-6 text-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg mb-3 text-gray-900">
                  Bảo mật dữ liệu & kiểm soát truy cập
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Quy trình xử lý thông tin có kiểm soát và bảo mật
                </p>
              </div>
  
              {/* Badge 04 */}
              <div className="bg-white border border-gray-400 rounded-2xl p-6 text-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg mb-3 text-gray-900">
                  Chuyển giao checklist & template vận hành
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Trang bị công cụ để đội ngũ tự duy trì sau khi triển khai
                </p>
              </div>
            </div>
          </div>
        </section>
  
        {/* Pricing & Fit Section */}
        <section className="px-[160px] py-16 pb-20 bg-white">
          <div className="max-w-[1120px] mx-auto">
            {/* Title */}
            <h2 className="text-4xl mb-4 text-gray-900">
              Chi phí và mức độ phù hợp
            </h2>
  
            {/* Subhead */}
            <p className="text-lg text-gray-700 mb-12 leading-relaxed max-w-[900px]">
              Chi phí phụ thuộc quy mô và mức độ phức tạp chứng từ; khảo sát nhanh để chốt phạm vi trước khi triển khai.
            </p>
  
            <div className="grid grid-cols-12 gap-8">
              {/* Left - Pricing Card (5 cols) */}
              <div className="col-span-5">
                <div className="bg-gray-800 text-white border-2 border-gray-800 rounded-2xl p-8 shadow-lg">
                  {/* Title */}
                  <h3 className="text-xl mb-6">Giá dịch vụ</h3>
  
                  {/* Price */}
                  <div className="mb-6">
                    <div className="text-5xl mb-2">
                      5–10 triệu <span className="text-2xl">/ tháng</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      Tuỳ quy mô, số lượng hoá đơn/chứng từ, và mức độ cần làm sạch dữ liệu.
                    </p>
                  </div>
  
                  {/* What's Included */}
                  <div className="mb-8">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 border-2 border-white rounded mt-0.5 flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 bg-white"></div>
                        </div>
                        <span className="text-sm">Kế toán – thuế định kỳ</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 border-2 border-white rounded mt-0.5 flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 bg-white"></div>
                        </div>
                        <span className="text-sm">Rà soát & làm sạch theo bước</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 border-2 border-white rounded mt-0.5 flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 bg-white"></div>
                        </div>
                        <span className="text-sm">Báo cáo quản trị tối thiểu</span>
                      </li>
                    </ul>
                  </div>
  
                  {/* CTA Row */}
                  <div className="space-y-3">
                    <button className="w-full py-4 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors">
                      Nhận Checklist CLEAR
                    </button>
                    <button className="w-full py-3 border-2 border-white text-white rounded-lg hover:bg-gray-700 transition-colors">
                      Đặt lịch tư vấn 15–30 phút
                    </button>
                  </div>
                </div>
              </div>
  
              {/* Right - Fit / Not Fit (7 cols) */}
              <div className="col-span-7 space-y-6">
                {/* Fit Card */}
                <div className="bg-gray-50 border border-gray-400 rounded-2xl p-7">
                  <h3 className="text-xl mb-5 text-gray-900">
                    Phù hợp nếu…
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 border-2 border-gray-800 rounded mt-0.5 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-gray-800"></div>
                      </div>
                      <span className="text-sm text-gray-700">DN nhỏ/siêu nhỏ, muốn chuẩn hoá số liệu</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 border-2 border-gray-800 rounded mt-0.5 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-gray-800"></div>
                      </div>
                      <span className="text-sm text-gray-700">Doanh thu thường dưới 30 tỷ/năm (hoặc chưa rõ)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 border-2 border-gray-800 rounded mt-0.5 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-gray-800"></div>
                      </div>
                      <span className="text-sm text-gray-700">CEO không rành kế toán/thuế nhưng muốn an toàn</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 border-2 border-gray-800 rounded mt-0.5 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-gray-800"></div>
                      </div>
                      <span className="text-sm text-gray-700">Đang có '2 sổ' hoặc số liệu lệch theo kỳ</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 border-2 border-gray-800 rounded mt-0.5 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-gray-800"></div>
                      </div>
                      <span className="text-sm text-gray-700">Thuê kế toán ngoài nhưng không hỗ trợ quản trị</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 border-2 border-gray-800 rounded mt-0.5 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-gray-800"></div>
                      </div>
                      <span className="text-sm text-gray-700">Từng bị nhắc hồ sơ/thiếu chứng từ/lo rủi ro</span>
                    </li>
                  </ul>
                </div>
  
                {/* Not Fit Card */}
                <div className="bg-gray-50 border border-gray-400 rounded-2xl p-7">
                  <h3 className="text-xl mb-5 text-gray-900">
                    Chưa phù hợp nếu…
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 border-2 border-gray-400 rounded mt-0.5 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-gray-400"></div>
                      </div>
                      <span className="text-sm text-gray-600">Cần dịch vụ chỉ để 'đối phó' hồ sơ, không muốn chuẩn hoá</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 border-2 border-gray-400 rounded mt-0.5 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-gray-400"></div>
                      </div>
                      <span className="text-sm text-gray-600">Không sẵn sàng cung cấp dữ liệu/chứng từ để đối chiếu</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 border-2 border-gray-400 rounded mt-0.5 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-gray-400"></div>
                      </div>
                      <span className="text-sm text-gray-600">DN rất lớn cần hệ thống ERP/đội dự án chuyên sâu ngay</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 border-2 border-gray-400 rounded mt-0.5 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-gray-400"></div>
                      </div>
                      <span className="text-sm text-gray-600">Kỳ vọng xử lý 'một lần là xong' nhưng không duy trì quy trình</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
  
            {/* Note */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 italic">
                Nếu doanh thu &gt;30 tỷ/năm, có thể cần gói/đội hình triển khai khác — hãy book call để được định hướng.
              </p>
            </div>
          </div>
        </section>
  
        {/* FAQ Section */}
        <section className="px-[160px] py-16 bg-gray-50">
          <div className="max-w-[1120px] mx-auto">
            {/* Title */}
            <h2 className="text-4xl mb-4 text-gray-900">
              Câu hỏi thường gặp
            </h2>
  
            {/* Subhead */}
            <p className="text-lg text-gray-700 mb-12 leading-relaxed max-w-[900px]">
              Một vài băn khoăn phổ biến trước khi bắt đầu chuẩn hoá dữ liệu.
            </p>
  
            {/* Accordion List */}
            <div className="space-y-4">
              {/* FAQ Item 01 - Expanded Example */}
              <div className="bg-white border border-gray-400 rounded-xl">
                <div className="px-8 py-5 flex items-center justify-between cursor-pointer">
                  <h3 className="text-lg text-gray-900">
                    ClearData<sup className="text-xs">TM</sup> có phải là 'làm lại sổ' từ đầu không?
                  </h3>
                  <div className="text-gray-600 text-2xl">▼</div>
                </div>
                <div className="px-8 pb-5 pt-2 border-t border-gray-300">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Không. Làm theo bước, khoanh vùng điểm lệch ưu tiên; mục tiêu là ổn định dần hệ dữ liệu mà không làm đứt gãy vận hành.
                  </p>
                </div>
              </div>
  
              {/* FAQ Item 02 - Collapsed */}
              <div className="bg-white border border-gray-400 rounded-xl">
                <div className="px-8 py-5 flex items-center justify-between cursor-pointer">
                  <h3 className="text-lg text-gray-900">
                    Có cần dừng hoạt động để triển khai không?
                  </h3>
                  <div className="text-gray-600 text-2xl">▶</div>
                </div>
              </div>
  
              {/* FAQ Item 03 - Collapsed */}
              <div className="bg-white border border-gray-400 rounded-xl">
                <div className="px-8 py-5 flex items-center justify-between cursor-pointer">
                  <h3 className="text-lg text-gray-900">
                    Doanh nghiệp tôi đang có 2 sổ, có làm được không?
                  </h3>
                  <div className="text-gray-600 text-2xl">▶</div>
                </div>
              </div>
  
              {/* FAQ Item 04 - Collapsed */}
              <div className="bg-white border border-gray-400 rounded-xl">
                <div className="px-8 py-5 flex items-center justify-between cursor-pointer">
                  <h3 className="text-lg text-gray-900">
                    Tôi sợ 'đụng vào quá khứ' sẽ phát sinh rủi ro?
                  </h3>
                  <div className="text-gray-600 text-2xl">▶</div>
                </div>
              </div>
  
              {/* FAQ Item 05 - Collapsed */}
              <div className="bg-white border border-gray-400 rounded-xl">
                <div className="px-8 py-5 flex items-center justify-between cursor-pointer">
                  <h3 className="text-lg text-gray-900">
                    Thông tin và dữ liệu có được bảo mật không?
                  </h3>
                  <div className="text-gray-600 text-2xl">▶</div>
                </div>
              </div>
  
              {/* FAQ Item 06 - Collapsed */}
              <div className="bg-white border border-gray-400 rounded-xl">
                <div className="px-8 py-5 flex items-center justify-between cursor-pointer">
                  <h3 className="text-lg text-gray-900">
                    Giá 5–10 triệu/tháng bao gồm những gì?
                  </h3>
                  <div className="text-gray-600 text-2xl">▶</div>
                </div>
              </div>
  
              {/* FAQ Item 07 - Collapsed */}
              <div className="bg-white border border-gray-400 rounded-xl">
                <div className="px-8 py-5 flex items-center justify-between cursor-pointer">
                  <h3 className="text-lg text-gray-900">
                    Bao lâu thì thấy 'ổn'?
                  </h3>
                  <div className="text-gray-600 text-2xl">▶</div>
                </div>
              </div>
  
              {/* FAQ Item 08 - Collapsed */}
              <div className="bg-white border border-gray-400 rounded-xl">
                <div className="px-8 py-5 flex items-center justify-between cursor-pointer">
                  <h3 className="text-lg text-gray-900">
                    Nếu doanh thu &gt;30 tỷ/năm thì sao?
                  </h3>
                  <div className="text-gray-600 text-2xl">▶</div>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        {/* Final CTA Section */}
        <section className="px-[160px] py-16 pb-20 bg-gray-200">
          <div className="max-w-[1120px] mx-auto">
            <div className="grid grid-cols-12 gap-10">
              {/* Left Column - CTA Copy (7 cols) */}
              <div className="col-span-7">
                {/* Eyebrow */}
                <div className="text-xs uppercase tracking-wider text-gray-600 mb-3">
                  BẮT ĐẦU TỪ HÔM NAY
                </div>
  
                {/* Title */}
                <h2 className="text-4xl mb-8 text-gray-900">
                  Nhận Checklist CLEAR để biết doanh nghiệp bạn đang lệch ở đâu
                </h2>
  
                {/* Bullets */}
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 border-2 border-gray-800 rounded mt-0.5 flex items-center justify-center flex-shrink-0">
                      <div className="w-3 h-3 bg-gray-800"></div>
                    </div>
                    <span className="text-lg text-gray-800">Xác định điểm lệch trọng yếu</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 border-2 border-gray-800 rounded mt-0.5 flex items-center justify-center flex-shrink-0">
                      <div className="w-3 h-3 bg-gray-800"></div>
                    </div>
                    <span className="text-lg text-gray-800">Ước lượng mức rủi ro</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 border-2 border-gray-800 rounded mt-0.5 flex items-center justify-center flex-shrink-0">
                      <div className="w-3 h-3 bg-gray-800"></div>
                    </div>
                    <span className="text-lg text-gray-800">Gợi ý lộ trình làm sạch theo bước</span>
                  </li>
                </ul>
  
                {/* Trust Micro Row */}
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm">
                    Bảo mật
                  </div>
                  <div className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm">
                    Không gián đoạn
                  </div>
                  <div className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm">
                    Chuyển giao
                  </div>
                </div>
              </div>
  
              {/* Right Column - Mini Form Card (5 cols) */}
              <div className="col-span-5">
                <div className="bg-white border-2 border-gray-400 rounded-2xl p-7 shadow-lg">
                  {/* Form Title */}
                  <h3 className="text-2xl mb-6 text-gray-900">
                    Nhận Checklist CLEAR
                  </h3>
  
                  {/* Form Fields */}
                  <div className="space-y-4">
                    {/* Name Input */}
                    <div>
                      <label className="block text-sm mb-2 text-gray-700">
                        Họ và tên
                      </label>
                      <input
                        type="text"
                        placeholder="VD: Nguyễn Văn A"
                        className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg bg-white text-gray-800 placeholder:text-gray-500"
                      />
                    </div>
  
                    {/* Contact Input */}
                    <div>
                      <label className="block text-sm mb-2 text-gray-700">
                        SĐT hoặc Email
                      </label>
                      <input
                        type="text"
                        placeholder="VD: 09… hoặc email@…"
                        className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg bg-white text-gray-800 placeholder:text-gray-500"
                      />
                    </div>
  
                    {/* Revenue Select */}
                    <div>
                      <label className="block text-sm mb-2 text-gray-700">
                        Quy mô doanh thu/năm
                      </label>
                      <select className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg bg-white text-gray-700">
                        <option>Chọn một</option>
                        <option>Dưới 10 tỷ</option>
                        <option>10-50 tỷ</option>
                        <option>50-200 tỷ</option>
                        <option>Trên 200 tỷ</option>
                      </select>
                    </div>
  
                    {/* Primary CTA */}
                    <button className="w-full py-4 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors">
                      Nhận Checklist
                    </button>
  
                    {/* Secondary CTA */}
                    <button className="w-full py-3 text-gray-700 hover:text-gray-900 transition-colors underline">
                      Đặt lịch tư vấn 15–30 phút
                    </button>
  
                    {/* Privacy Note */}
                    <p className="text-xs text-gray-600 leading-relaxed pt-2">
                      ProsFIN cam kết bảo mật. Thông tin chỉ dùng để gửi checklist và liên hệ khi bạn đồng ý.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  
  
  
        {/* Thank-you Overlay (hidden by default) */}
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center" style={{ display: 'none' }}>
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-[600px] w-full mx-4 border-2 border-gray-400">
            {/* Title */}
            <h2 className="text-3xl mb-4 text-gray-900 text-center">
              Cảm ơn bạn. Checklist CLEAR đã được ghi nhận.
            </h2>
  
            {/* Body */}
            <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center">
              Chúng tôi sẽ gửi checklist qua email/Zalo. Nếu bạn muốn đi nhanh hơn, đặt lịch tư vấn 15–30 phút.
            </p>
  
            {/* Buttons */}
            <div className="space-y-3 mb-6">
              <button className="w-full py-4 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors">
                Đặt lịch tư vấn
              </button>
              <button className="w-full py-3 border-2 border-gray-400 text-gray-700 rounded-lg hover:border-gray-600 transition-colors">
                Quay lại trang
              </button>
            </div>
  
            {/* Small Note */}
            <p className="text-xs text-gray-600 text-center">
              Nếu không thấy email, hãy kiểm tra Spam/Promotions.
            </p>
          </div>
        </div>
      </div>
    );
  }