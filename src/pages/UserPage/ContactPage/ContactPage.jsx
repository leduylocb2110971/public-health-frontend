import React from "react";
import FAQComponent from "../../../components/FAQComponent/FAQComponent";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  GlobalOutlined
} from "@ant-design/icons";
import {
  ContactSection,
  Container,
  FormSection,
  InfoSection,
  Title,
  StyledForm,
  Input,
  TextArea,
  SubmitButton,
  InfoItem,
  MapWrapper,
  Icon
} from "./style";

const ContactPage = () => {
  return (
    <ContactSection>
      <Container>
        {/* Form */}
        <FormSection>
          <Title>LIÊN HỆ VỚI CHÚNG TÔI</Title>
          <StyledForm>
            <Input type="text" placeholder="Tên" />
            <Input type="email" placeholder="Email" />
            <Input type="tel" placeholder="Điện thoại" />
            <TextArea placeholder="Nội dung tin nhắn" rows="5" />
            <SubmitButton type="submit">GỬI TIN NHẮN</SubmitButton>
          </StyledForm>
        </FormSection>

        {/* Info */}
        <InfoSection>
          <h3>
            Trung tâm kiểm tra sức khỏe V-MED
          </h3>
          <InfoItem>
            <Icon><EnvironmentOutlined /></Icon>
            Đường 3/2, Phường Xuân Khánh, Quận Ninh Kiều, Thành phố Cần Thơ
          </InfoItem>
          <InfoItem><Icon><PhoneOutlined /></Icon>(84-29) 2378 1234</InfoItem>
          <InfoItem><Icon><MailOutlined /></Icon>cskh@bvcrheci.vn</InfoItem>
          <InfoItem>
            <Icon><GlobalOutlined /></Icon>
            <a href="https://www.bvcrheci.vn" target="_blank" rel="noreferrer">www.bvcrheci.vn</a>
          </InfoItem>

          <MapWrapper>
            <iframe
              title="HECI Google Map - Cần Thơ"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3909.215469080421!2d105.77598467485072!3d10.03599426122416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a088a4a994e6ad%3A0x1b1e69a5bb0c324e!2zQ8O0bmcgMy8yLCBQaMaw4budbmcgWHXDom4sIFF14bqjbSBOaW5oIELDrSBRdWUsIFRoxrDhu6NuIENow60gQ-G6p24sIENo4buRbmc!5e0!3m2!1svi!2s!4v1719499999999!5m2!1svi!2s"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </MapWrapper>
        </InfoSection>
      </Container>
      <FAQComponent />
    </ContactSection>
  );
};


export default ContactPage;
