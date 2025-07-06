import React from "react";
import { useQuery } from "@tanstack/react-query";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import ServiceCardComponent from "../../components/CardComponent/ServiceCardComponent";
import NewsCardComponent from "../../components/NewsCardComponent/NewsCardComponent";
import BannerComponent from "../../components/BannerComponent/BannerComponent";
import * as ServiceService from "../../services/ServiceService";
import * as NewsService from "../../services/NewsService";
import { useNavigate } from "react-router-dom";
import { Button, Image, Typography } from "antd";
import SlideComponent from "../../components/SlideComponent/SlideComponent";
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";
import FAQComponent from "../../components/FAQComponent/FAQComponent";
import {
  SectionGray,
  SectionLight,
  SectionHeading,
  CardContainer,
  IntroText,
  CustomButton,
  IntroWrapper,
  IntroTextBlock,
  IntroParagraph,
  IntroImage,
  BenefitsGrid,
  BenefitItem,
  BigHeading,
  Label,
  Description,
  BlueButton,
  IntroSection,
  LeftContent,
  RightContent,
  ImageWrapper,
} from "./style";
const HomePage = () => {
  const { Title, Paragraph, Text } = Typography;

  const navigate = useNavigate();
  const queryGetAllServices = useQuery({
    queryKey: ["getAllServices", { page: 1, limit: 5 }],
    queryFn: () => ServiceService.getAllServices({ page: 1, limit: 5 }), // Cho phép lấy tối đa 5 dịch vụ
  });
  const queryGetAllNews = useQuery({  
    queryKey: ["getAllNews"],
    queryFn: () => NewsService.getAllNews(),
  });

  const { data: newsResponse, isLoading: isLoadingNews } = queryGetAllNews;
  const news = newsResponse?.data || [];
  
    
  const { data: serviceResponse, isLoading: isLoadingServices } = queryGetAllServices;
  const services = serviceResponse?.data || [];
  console.log("coi có id dịch vụ không:", services);
  console.log("coi có id tin tức không:", news);
  return (
    <>
      <BannerComponent />
      {/* Giới thiệu nhanh */}
      <SectionGray>
        <IntroSection>
          <LeftContent>
            <BigHeading><strong>GIỚI THIỆU VỀ V-MED</strong></BigHeading>
            <Description>
              V-MED là nền tảng y tế công cộng giúp người dân dễ dàng tiếp cận thông tin y tế chính thống, đặt lịch khám bệnh và tra cứu bác sĩ, phòng khám, bệnh viện uy tín trên toàn quốc.
            </Description>
            <Description>
              Chúng tôi mong muốn nâng cao nhận thức sức khỏe cộng đồng bằng cách cung cấp tin tức y tế cập nhật, cảnh báo dịch bệnh và kiến thức chăm sóc sức khỏe chính xác, kịp thời.
            </Description>
            <BlueButton
              onClick={() => navigate("/about-us")}
            >🔎 Tìm hiểu thêm</BlueButton>
          </LeftContent>

          <RightContent>
            <ImageWrapper>
              <img src="/about-us.png" alt="Giới thiệu V-MED" />
            </ImageWrapper>
          </RightContent>
        </IntroSection>
      </SectionGray>
      {/* Vì sao nên chọn chúng tôi */}
      <SectionLight>
        <SectionHeading>Vì sao nên chọn V-MED?</SectionHeading>
        <BenefitsGrid>
          {[
            {
              icon: "✅",
              title: "Thông tin chính xác",
              desc: "Dữ liệu y tế được xác thực từ các cơ quan, bệnh viện và chuyên gia uy tín.",
            },
            {
              icon: "⚡",
              title: "Tiếp cận nhanh chóng",
              desc: "Giao diện thân thiện, dễ dàng tra cứu thông tin và đặt lịch khám.",
            },
            {
              icon: "💬",
              title: "Tư vấn hỗ trợ",
              desc: "Luôn sẵn sàng giải đáp thắc mắc và hỗ trợ người dùng 24/7.",
            },
            {
              icon: "🔒",
              title: "Bảo mật thông tin",
              desc: "Cam kết bảo mật và bảo vệ dữ liệu cá nhân của người dùng.",
            },
          ].map((item, idx) => (
            <BenefitItem key={idx}>
              <div className="icon">{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </BenefitItem>
          ))}
        </BenefitsGrid>
      </SectionLight>

      {/* Dịch vụ chăm sóc */}
      <SectionGray>
        <SectionHeading>Dịch vụ chăm sóc sức khỏe</SectionHeading>
            <SlideComponent length={services?.length} slidesToShow={5}>
              {services.map((item, index) => (
                <ServiceCardComponent
                  key={item._id}
                  image={item.image}
                  name={item.name}
                  content={item.content}
                  onClick={() => navigate(`/service/${item?.type._id}/${item._id}`)}
                />
              ))}
            </SlideComponent>
            <div style={{ marginTop:"40px", textAlign: "center" }}>
                <CustomButton onClick={() => navigate('/service')}>Xem tất cả dịch vụ</CustomButton>
            </div>
      </SectionGray>


      {/* Tin tức mới */}
      <SectionLight>
        <SectionHeading>Tin tức y tế mới nhất</SectionHeading>
            <SlideComponent length={news?.length} slidesToShow={5}>
            {news.map((item, index) => (
              <ServiceCardComponent
                key={item._id}
                image={item.image}
                name={item.title}
                content={item.content}
                onClick={() => navigate(`/news/${item?.type._id}/${item._id}`)}
              />
            ))}
            </SlideComponent>
          <div style={{ marginTop: "50px", textAlign: "center" }}>
            <CustomButton onClick={() => navigate("/news")}>
              Xem tất cả tin tức
            </CustomButton>
          </div>
      </SectionLight>
      {/* Câu hỏi thường gặp */}
      <SectionGray>
        <FAQComponent />
      </SectionGray>



      {/* <section style={{ padding: "60px 20px", backgroundColor: "#fff" }}>
        <h2 style={{ textAlign: "center", marginBottom: "40px" }}>Tin tức y tế mới nhất</h2>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "30px" }}>
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              style={{
                width: "300px",
                border: "1px solid #e0e0e0",
                borderRadius: "10px",
                overflow: "hidden",
                backgroundColor: "#fefefe",
              }}
            >
              <div style={{ height: "160px", backgroundColor: "#ddd" }} />
              <div style={{ padding: "20px" }}>
                <h4 style={{ marginBottom: "10px", fontSize: "17px" }}>
                  Cập nhật tình hình dịch bệnh tại Việt Nam
                </h4>
                <p style={{ fontSize: "14px", color: "#666" }}>
                  Những thông tin mới nhất về tình hình dịch bệnh, khuyến cáo từ Bộ Y tế.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section> */}
    </>
  );
};

export default HomePage;
