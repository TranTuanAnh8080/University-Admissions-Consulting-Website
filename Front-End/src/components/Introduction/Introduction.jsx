import React from 'react';
import Toolbar from '../Header/Toolbar';
import Footer from '../Footer/Footer';
import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton';
import Header from '../Header/Header';
const Introduction = () => {
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
            <div className="bg-white">
                {/* Hero Section */}
                <div className="relative h-[150]">
                    <img
                        src="https://ptehelper.com.au/wp-content/uploads/2025/03/fpt-can-tho-hoc-phi-1-nam-1.jpg"
                        alt="FPT University Campus"
                        className=" h-full w-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <h1 className="text-5xl font-bold text-white text-center px-4">
                            GIỚI THIỆU ĐẠI HỌC FPT
                        </h1>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 py-12">
                    {/* Tầm nhìn & Sứ mệnh */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <div className="bg-orange-50 p-8 rounded-xl">
                            <h2 className="text-3xl font-bold text-orange-600 mb-4">Tầm nhìn</h2>
                            <p className="text-lg">Đại học FPT phấn đấu trở thành trường đại học định hướng ứng dụng có thứ hạng cao trong khu vực châu Á.</p>
                        </div>
                        <div className="bg-orange-50 p-8 rounded-xl">
                            <h2 className="text-3xl font-bold text-orange-600 mb-4">Sứ mệnh</h2>
                            <p className="text-lg">Cung cấp nguồn nhân lực chất lượng cao, có khả năng làm việc trong môi trường quốc tế.</p>
                        </div>
                        <div className="bg-orange-50 p-8 rounded-xl">
                            <h2 className="text-3xl font-bold text-orange-600 mb-4">Tiên phong</h2>
                            <p className="text-lg">Đại học FPT là trường đại học của doanh nghiệp đầu tiên tại Việt Nam, tiên phong trong đào tạo nguồn nhân lực chất lượng cao về công nghệ.</p>
                        </div>
                        <div className="bg-orange-50 p-8 rounded-xl">
                            <h2 className="text-3xl font-bold text-orange-600 mb-4">Thực tiễn</h2>
                            <p className="text-lg">Đào tạo gắn liền với thực tiễn, trang bị cho sinh viên những kỹ năng thiết yếu để sẵn sàng làm việc ngay sau khi tốt nghiệp.</p>
                        </div>

                    </div>

                    {/* Giới thiệu chung */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-orange-600 mb-4">Giới thiệu chung</h2>
                        <div className="grid md:grid-cols-2 gap-6 items-center">
                            <div className="text-lg space-y-3">
                                <p>Đại học FPT được thành lập ngày 8/9/2006 theo Quyết định số 208/2006/QĐ-TTg của Thủ tướng Chính phủ.</p>
                                <p>Là trường đại học đầu tiên của một doanh nghiệp tại Việt Nam với 100% vốn đầu tư của Tập đoàn FPT.</p>
                                <p>Theo mô hình của một trường đại học thế hệ mới, gắn đào tạo với thực tiễn doanh nghiệp.</p>
                            </div>
                            <img
                                src="https://images02.vietnamworks.com//companyprofile/FPT-Education/en/CT_HDQT_Le_Truong_Tung_fn_.jpg"
                                alt="FPT University Students"
                                className="rounded-xl shadow-lg h-full w-full"
                            />
                        </div>


                    </div>



                    {/* Giá trị cốt lõi */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-orange-600 mb-8">Giá trị cốt lõi</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center p-6 bg-gray-50 rounded-xl">
                                <h3 className="text-xl font-bold text-orange-500 mb-4">Đào tạo gắn với thực tiễn</h3>
                                <p>100% sinh viên được thực tập tại doanh nghiệp trong thời gian học tập</p>
                            </div>
                            <div className="text-center p-6 bg-gray-50 rounded-xl">
                                <h3 className="text-xl font-bold text-orange-500 mb-4">Môi trường quốc tế</h3>
                                <p>Chương trình học bằng tiếng Anh và cơ hội trao đổi sinh viên quốc tế</p>
                            </div>
                            <div className="text-center p-6 bg-gray-50 rounded-xl">
                                <h3 className="text-xl font-bold text-orange-500 mb-4">Đổi mới sáng tạo</h3>
                                <p>Chương trình đào tạo liên tục cập nhật theo xu hướng công nghệ mới</p>
                            </div>
                        </div>
                    </div>

                    {/* Cơ sở đào tạo */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-orange-600 mb-6">Cơ sở đào tạo</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Campus Hà Nội */}
                            <div className="relative group overflow-hidden rounded-xl">
                                <img
                                    src="https://cdnphoto.dantri.com.vn/X2770V8G-b149OhGhotqbyIut98=/zoom/1200_630/2021/01/31/czxczczcz-1612100910190.png"
                                    alt="Campus Hà Nội"
                                    className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
                                    <h3 className="text-white text-xl font-bold p-6">Cơ sở Hà Nội</h3>
                                </div>
                            </div>

                            {/* Campus TP. HCM */}
                            <div className="relative group overflow-hidden rounded-xl">
                                <img
                                    src="https://images2.thanhnien.vn/528068263637045248/2024/6/21/fpt-17189567344561397268426.png"
                                    alt="Campus TP. HCM"
                                    className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
                                    <h3 className="text-white text-xl font-bold p-6">Cơ sở TP. Hồ Chí Minh</h3>
                                </div>
                            </div>

                            {/* Campus Đà Nẵng */}
                            <div className="relative group overflow-hidden rounded-xl">
                                <img
                                    src="https://vinaconex25.com.vn/wp-content/uploads/2020/06/phoi-canh.jpg"
                                    alt="Campus Đà Nẵng"
                                    className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
                                    <h3 className="text-white text-xl font-bold p-6">Cơ sở Đà Nẵng</h3>
                                </div>
                            </div>

                            {/* Campus Cần Thơ */}
                            <div className="relative group overflow-hidden rounded-xl">
                                <img
                                    src="https://360view.vn/data3/projects/vietnam/2024/fptu-can-tho/images/thumb.jpg"
                                    alt="Campus Cần Thơ"
                                    className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
                                    <h3 className="text-white text-xl font-bold p-6">Cơ sở Cần Thơ</h3>
                                </div>
                            </div>

                            {/* Campus Quy Nhơn */}
                            <div className="relative group overflow-hidden rounded-xl">
                                <img
                                    src="https://i.chungta.vn/2023/12/25/-6487-1703476918_1200x0.png"
                                    alt="Campus Quy Nhơn"
                                    className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
                                    <h3 className="text-white text-xl font-bold p-6">Cơ sở Quy Nhơn</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-100 min-h-screen">
                {/* ...existing hero section code... */}

                <div className="bg-white">
                    <div className="max-w-7xl mx-auto px-4 py-12">
                        {/* ...existing Tầm nhìn & Sứ mệnh code... */}


                        {/* Thành tựu nổi bật */}
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-orange-600 mb-6">Thành tựu nổi bật</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="text-center p-6 bg-orange-50 rounded-xl">
                                    <div className="text-4xl font-bold text-orange-600 mb-2">96.7%</div>
                                    <p className="text-gray-700">Sinh viên có việc làm trong vòng 1 năm sau tốt nghiệp</p>
                                </div>
                                <div className="text-center p-6 bg-orange-50 rounded-xl">
                                    <div className="text-4xl font-bold text-orange-600 mb-2">TOP 10</div>
                                    <p className="text-gray-700">Trường đại học có công bố quốc tế nhiều nhất Việt Nam</p>
                                </div>
                                <div className="text-center p-6 bg-orange-50 rounded-xl">
                                    <div className="text-4xl font-bold text-orange-600 mb-2">4 Sao</div>
                                    <p className="text-gray-700">Xếp hạng QS Stars (Anh Quốc)</p>
                                </div>
                            </div>
                        </div>

                        {/* Đơn vị thành viên */}`
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-orange-600 mb-8">Đơn vị thành viên</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                                <div className="flex flex-col items-center space-y-4">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/6/68/Logo_FPT_Education.png"
                                        alt="Trường Đại học FPT"
                                        className="h-16 object-contain"
                                    />
                                    <p className="text-center font-semibold">Trường Đại học FPT</p>
                                </div>

                                <div className="flex flex-col items-center space-y-4">
                                    <img
                                        src="https://frtc.fsb.edu.vn/wp-content/uploads/2021/07/Logo-FSB.png"
                                        alt="Viện Quản trị & Công nghệ FSB"
                                        className="h-16 object-contain"
                                    />
                                    <p className="text-center font-semibold">Viện Quản trị & Công nghệ FSB</p>
                                </div>

                                <div className="flex flex-col items-center space-y-4">
                                    <img
                                        src="https://cdn1.vieclam24h.vn/upload/files_cua_nguoi_dung/logo/2018/01/05/1515132143_Logo-_Greenwich.png"
                                        alt="Greenwich Việt Nam"
                                        className="h-16 object-contain"
                                    />
                                    <p className="text-center font-semibold">Greenwich Việt Nam</p>
                                </div>

                                <div className="flex flex-col items-center space-y-4">
                                    <img
                                        src="https://swinburne-vn.edu.vn/wp-content/themes/swinburne/resources/assets/images/header/Logo_SUT.jpg"
                                        alt="Swinburne Việt Nam"
                                        className="h-16 object-contain"
                                    />
                                    <p className="text-center font-semibold">Swinburne Việt Nam</p>
                                </div>

                                <div className="flex flex-col items-center space-y-4">
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-TT5znxXn88RrZgJ811R4f0Yagf4zshbzzg&s"
                                        alt="Melbourne Polytechnic Việt Nam"
                                        className="h-16 object-contain"
                                    />
                                    <p className="text-center font-semibold">Melbourne Polytechnic Việt Nam</p>
                                </div>

                                <div className="flex flex-col items-center space-y-4">
                                    <img
                                        src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/company_logos/spcMHA7eH1INBQFvqh6Wkj266e8IzRkY_1644922155____da2e99d299b5f54dd5123fba1e415d3e.jpg"
                                        alt="Cao đẳng Anh quốc BTEC FPT"
                                        className="h-16 object-contain"
                                    />
                                    <p className="text-center font-semibold">Cao đẳng Anh quốc BTEC FPT</p>
                                </div>

                                <div className="flex flex-col items-center space-y-4">
                                    <img
                                        src="https://blob-careerlinkvn.careerlink.vn/company_logos/6c7278a645f04fda4b16038e6dff95af.png"
                                        alt="Viện Đào tạo Quốc tế FPT"
                                        className="h-16 object-contain"
                                    />
                                    <p className="text-center font-semibold">Viện Đào tạo Quốc tế FPT</p>
                                </div>

                                <div className="flex flex-col items-center space-y-4">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/2/20/FPT_Polytechnic.png"
                                        alt="Cao đẳng FPT Polytechnic"
                                        className="h-16 object-contain"
                                    />
                                    <p className="text-center font-semibold">Cao đẳng FPT Polytechnic</p>
                                </div>

                                <div className="flex flex-col items-center space-y-4">
                                    <img
                                        src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/company_logos/N0yqyTYJJxlce2Sb0s3WzIREVmycF2hq_1694482484____4500e4dce375fcc0504808f0c3053f87.png"
                                        alt="Hệ thống Trường Phổ thông FPT"
                                        className="h-16 object-contain"
                                    />
                                    <p className="text-center font-semibold">Hệ thống Trường Phổ thông FPT</p>
                                </div>

                                <div className="flex flex-col items-center space-y-4">
                                    <img
                                        src="https://caodangfpt840897247.wordpress.com/wp-content/uploads/2019/04/logofpt.jpg"
                                        alt="Phổ thông Cao đẳng"
                                        className="h-16 w-auto object-contain"
                                    />
                                    <p className="text-center font-semibold">Phổ thông Cao đẳng</p>
                                </div>
                            </div>
                        </div>
                        {/* Kết nối */}
                        <div className="text-center mt-20">
                            <h2 className="text-3xl font-bold text-orange-600 mb-6">Kết nối với chúng tôi</h2>
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
            <ScrollToTopButton />
        </div>
    );
};

export default Introduction;