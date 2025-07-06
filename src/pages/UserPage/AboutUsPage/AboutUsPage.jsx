import React from 'react';
import BannerComponent from '../../../components/BannerComponent/BannerComponent';

const AboutUsPage = () => {
  return (
    <>
      <section style={{ backgroundColor: "#f0fdfa", padding: "60px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Tiêu đề */}
          <h1
            style={{
              fontSize: "42px",
              fontWeight: "bold",
              textAlign: "center",
              color: "#2BB3A9",
              marginBottom: "50px",
            }}
          >
            Về Chúng Tôi
          </h1>

          {/* Giới thiệu tổng quát */}
          <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ flex: "1 1 400px" }}>
              <img
                src="/about-us.png"
                alt="Về chúng tôi"
                style={{
                  width: "100%",
                  borderRadius: "16px",
                  objectFit: "cover",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
                }}
              />
            </div>
            <div style={{ flex: "1 1 500px" }}>
              <h2 style={{ fontSize: "28px", color: "#1f2937", marginBottom: "16px" }}>
                Chúng tôi là ai?
              </h2>
              <p style={{ fontSize: "16px", color: "#374151", lineHeight: "1.8" }}>
                Với nhiều năm kinh nghiệm trong lĩnh vực cung cấp dịch vụ chuyên nghiệp, chúng tôi
                luôn đặt khách hàng làm trung tâm và không ngừng cải tiến để mang đến trải nghiệm
                tốt nhất. Đội ngũ của chúng tôi gồm các chuyên gia tận tâm, sáng tạo và luôn hướng
                đến chất lượng.
              </p>
            </div>
          </div>

          {/* Giá trị cốt lõi */}
          <div style={{ marginTop: "70px" }}>
            <h2
              style={{
                fontSize: "30px",
                color: "#2BB3A9",
                marginBottom: "32px",
                textAlign: "center",
              }}
            >
              Giá trị cốt lõi
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "24px",
              }}
            >
              {[
                { title: "Tận tâm", desc: "Chúng tôi đặt sự hài lòng của khách hàng lên hàng đầu." },
                {
                  title: "Chuyên nghiệp",
                  desc: "Quy trình chuẩn mực, đội ngũ nhiều năm kinh nghiệm.",
                },
                { title: "Đổi mới", desc: "Không ngừng cập nhật, cải tiến và sáng tạo." },
                {
                  title: "Minh bạch",
                  desc: "Mọi thông tin đều rõ ràng, công khai và chính xác.",
                },
              ].map((value, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "#ffffff",
                    padding: "24px",
                    borderRadius: "12px",
                    border: "1px solid #2BB3A9",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
                    textAlign: "center",
                  }}
                >
                  <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#2BB3A9" }}>
                    {value.title}
                  </h3>
                  <p style={{ fontSize: "14px", color: "#4b5563", marginTop: "8px" }}>
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tầm nhìn & Sứ mệnh */}
          <div style={{ marginTop: "70px", display: "flex", gap: "40px", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 500px" }}>
              <h2
                style={{
                  fontSize: "26px",
                  fontWeight: "600",
                  marginBottom: "16px",
                  color: "#2BB3A9",
                }}
              >
                Tầm nhìn
              </h2>
              <p style={{ fontSize: "16px", lineHeight: "1.7", color: "#374151" }}>
                Trở thành đơn vị dẫn đầu trong ngành bằng việc không ngừng nâng cao chất lượng và
                áp dụng công nghệ mới.
              </p>
            </div>
            <div style={{ flex: "1 1 500px" }}>
              <h2
                style={{
                  fontSize: "26px",
                  fontWeight: "600",
                  marginBottom: "16px",
                  color: "#2BB3A9",
                }}
              >
                Sứ mệnh
              </h2>
              <p style={{ fontSize: "16px", lineHeight: "1.7", color: "#374151" }}>
                Cung cấp dịch vụ chất lượng cao, góp phần nâng cao chất lượng sống và sự tiện nghi
                cho cộng đồng.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUsPage;
