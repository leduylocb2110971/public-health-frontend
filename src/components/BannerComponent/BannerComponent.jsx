// BannerComponent.jsx
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { BannerWrapper } from "./style";

import banner1 from "../../assets/banner_1.jpg";
import banner2 from "../../assets/banner_2.jpg";
import banner3 from "../../assets/banner_3.jpg";

const { Title, Paragraph } = Typography;


const BannerComponent = () => {
  const navigate = useNavigate();

  const bannerSlides = [
  {
    image: banner1,
    title: "Chào mừng bạn đến với V-MED",
    description: "Nơi kết nối người dân với hệ thống bác sĩ và bệnh viện uy tín.",
  },
  {
    image: banner2,
    title: "Tra cứu thông tin y tế",
    description: "Tìm kiếm bác sĩ, phòng khám và bệnh viện một cách dễ dàng.",
  },
  {
    image: banner3,
    title: "Chăm sóc sức khỏe mỗi ngày",
    description: "Cập nhật kiến thức y tế mới nhất, chủ động bảo vệ bản thân.",
  },
];

  return (
    <BannerWrapper>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 4000 }}
        loop={true}
        navigation
        pagination={{ clickable: true }}
      >
        {bannerSlides.map((slide, idx) => (
        <SwiperSlide key={idx} style={{ backgroundImage: `url(${slide.image})` }}>
            <div className="overlay" />
            <div className="content">
            <Title level={2} style={{ color: "white", fontWeight: "bold" }}>
                {slide.title}
            </Title>
            <Paragraph style={{ color: "white", fontSize: "16px" }}>
                {slide.description}
            </Paragraph>
            </div>
        </SwiperSlide>
))}

      </Swiper>
    </BannerWrapper>
  );
};

export default BannerComponent;
