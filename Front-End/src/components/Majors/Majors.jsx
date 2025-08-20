import React from "react";
import Toolbar from "../Header/Toolbar";
import Footer from "../Footer/Footer";
import ScrollToTopButton from "../ScrollToTopButton/ScrollToTopButton";
const majors = [
  {
    name: "Công nghệ thông tin",
    icon: "💻",
    color: "bg-blue-100",
    description:
      "Đào tạo kỹ sư công nghệ thông tin với các chuyên ngành: Kỹ thuật phần mềm, Trí tuệ nhân tạo, An toàn thông tin, Thiết kế mỹ thuật số, IoT, Hệ thống thông tin, Phát triển ứng dụng di động, và nhiều lĩnh vực công nghệ mới.",
    link: "https://daihoc.fpt.edu.vn/cong-nghe-thong-tin/"
  },
  {
    name: "Quản trị kinh doanh",
    icon: "📈",
    color: "bg-orange-100",
    description:
      "Chương trình đào tạo nhà quản trị hiện đại, sáng tạo, hội nhập quốc tế với các chuyên ngành: Digital Marketing, Kinh doanh quốc tế, Quản trị khách sạn, Quản trị dịch vụ du lịch & lữ hành, Quản trị truyền thông đa phương tiện.",
    link: "https://daihoc.fpt.edu.vn/quan-tri-kinh-doanh/"
  },
  {
    name: "Ngôn ngữ Anh",
    icon: "🇬🇧",
    color: "bg-green-100",
    description:
      "Trang bị kiến thức ngôn ngữ, văn hóa, kỹ năng biên - phiên dịch, giảng dạy, truyền thông, thương mại quốc tế, đáp ứng nhu cầu nhân lực toàn cầu.",
    link: "https://daihoc.fpt.edu.vn/ngon-ngu-anh/"
  },
  {
    name: "Ngôn ngữ Nhật",
    icon: "🇯🇵",
    color: "bg-pink-100",
    description:
      "Đào tạo chuyên sâu tiếng Nhật, văn hóa Nhật Bản, kỹ năng biên - phiên dịch, thương mại, làm việc tại các doanh nghiệp Nhật Bản trong và ngoài nước.",
    link: "https://daihoc.fpt.edu.vn/ngon-ngu-nhat/"
  },
  {
    name: "Ngôn ngữ Hàn Quốc",
    icon: "🇰🇷",
    color: "bg-purple-100",
    description:
      "Chương trình đào tạo tiếng Hàn, văn hóa Hàn Quốc, kỹ năng biên - phiên dịch, thương mại, đáp ứng nhu cầu nhân lực cho doanh nghiệp Hàn Quốc.",
    link: "https://daihoc.fpt.edu.vn/ngon-ngu-han-quoc/"
  },
  {
    name: "Thiết kế đồ họa",
    icon: "🎨",
    color: "bg-yellow-100",
    description:
      "Đào tạo chuyên gia thiết kế sáng tạo, ứng dụng công nghệ, mỹ thuật số, truyền thông đa phương tiện, thiết kế quảng cáo, hoạt hình, game, UI/UX.",
    link: "https://daihoc.fpt.edu.vn/thiet-ke-do-hoa/"
  },
  {
    name: "Truyền thông đa phương tiện",
    icon: "📺",
    color: "bg-red-100",
    description:
      "Trang bị kiến thức về báo chí, truyền hình, quảng cáo, sản xuất nội dung số, truyền thông số, tổ chức sự kiện, PR, marketing hiện đại.",
    link: "https://daihoc.fpt.edu.vn/truyen-thong-da-phuong-tien/"
  },
  {
    name: "Quản trị khách sạn",
    icon: "🏨",
    color: "bg-teal-100",
    description:
      "Đào tạo chuyên gia quản lý khách sạn, nhà hàng, resort, kỹ năng phục vụ, quản lý nhân sự, tài chính, marketing, vận hành dịch vụ lưu trú.",
    link: "https://daihoc.fpt.edu.vn/quan-tri-khach-san/"
  },
  {
    name: "Quản trị dịch vụ du lịch & lữ hành",
    icon: "🌏",
    color: "bg-indigo-100",
    description:
      "Chương trình đào tạo hướng dẫn viên, quản lý tour, tổ chức sự kiện, điều hành du lịch, marketing du lịch, phát triển sản phẩm du lịch.",
    link: "https://daihoc.fpt.edu.vn/quan-tri-dich-vu-du-lich-lu-hanh/"
  },
  {
    name: "Luật",
    icon: "⚖️",
    color: "bg-gray-100",
    description:
      "Đào tạo cử nhân luật kinh tế, luật quốc tế, kỹ năng tư vấn pháp lý, giải quyết tranh chấp, làm việc tại doanh nghiệp, tổ chức trong và ngoài nước.",
    link: "https://daihoc.fpt.edu.vn/luat/"
  }
];

const Majors = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="flex flex-col items-center space-y-4 mt-2 md:mr-[2%]">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/FPT_Education_logo.svg/2560px-FPT_Education_logo.svg.png"
          alt="Trường Đại học FPT"
          className="h-16 object-contain contrast-100 saturate-150 brightness-100"
        />

      </div>
      <Toolbar />
      {/* Banner */}
      <div className="relative h-64 w-full">
        <img
          src="https://daihoc.fpt.edu.vn/wp-content/uploads/2025/01/header-2024-png.avif"
          alt="Liên hệ FPT University"
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
            CHƯƠNG TRÌNH ĐÀO TẠO
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <p className="text-lg text-gray-700 mb-8 text-center">
          Đại học FPT đào tạo đa ngành, đa lĩnh vực với chương trình chuẩn quốc tế, cập nhật công nghệ mới, chú trọng thực tiễn và kỹ năng hội nhập toàn cầu.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {majors.map((major, idx) => (
            <div
              key={idx}
              className={`rounded-xl shadow-lg p-6 flex flex-col ${major.color} hover:shadow-2xl transition`}
            >
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{major.icon}</span>
                <h2 className="text-xl font-bold text-orange-600">{major.name}</h2>
              </div>
              <p className="text-gray-700 mb-4 flex-1">{major.description}</p>
              <a
                href={major.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-auto text-orange-600 font-semibold hover:underline"
              >
                Xem chi tiết &rarr;
              </a>
            </div>
          ))}
        </div>
        {/* Thông tin thêm */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-orange-600 mb-4">Điểm nổi bật chương trình đào tạo FPT University</h2>
          <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
            <li>Chương trình đào tạo chuẩn quốc tế, cập nhật công nghệ mới nhất.</li>
            <li>100% sinh viên học tiếng Anh tăng cường, có cơ hội trao đổi quốc tế.</li>
            <li>Thực tập tại doanh nghiệp từ năm 3, trải nghiệm thực tế, nâng cao kỹ năng nghề nghiệp.</li>
            <li>Đội ngũ giảng viên giàu kinh nghiệm, chuyên gia đầu ngành.</li>
            <li>Môi trường học tập hiện đại, sáng tạo, năng động.</li>
            <li>Học bổng đa dạng, hỗ trợ tài chính cho sinh viên xuất sắc.</li>
            <li>Hỗ trợ việc làm sau tốt nghiệp, tỷ lệ có việc làm trên 96%.</li>
          </ul>
        </div>
        <div className="text-center mt-12">
          <a
            href="https://daihoc.fpt.edu.vn/chuong-trinh-dao-tao/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 text-white bg-orange-600 hover:bg-orange-700 rounded-full text-lg font-semibold shadow-md"
          >
            Xem chi tiết tại trang chủ Đại học FPT
          </a>
        </div>
      </div>
      <ScrollToTopButton />
      <Footer />
    </div>
  );
};

export default Majors;