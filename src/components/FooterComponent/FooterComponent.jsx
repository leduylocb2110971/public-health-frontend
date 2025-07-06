import { Row, Col } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined, YoutubeOutlined } from '@ant-design/icons';
import { FooterWrapper, FooterTitle, FooterText, FooterBottom, SocialLinks, SocialIcon } from './style';
import { Image } from 'antd';
import image from '../../assets/logo.png';
const FooterComponent = () => {
    return (
        <div style={{ backgroundColor: '#f8fafc', borderTop: '2px solid #00b96b', boxShadow: '0 -2px 10px rgba(0,0,0,0.05)' }}>
            <FooterWrapper>
                <Row gutter={[32, 32]}>
                    <Col xs={24} sm={12} md={6}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                        <Image
                            width={50}
                            src={image}
                            preview={false}
                            style={{ cursor: "pointer", borderRadius: "50%", border: "2px solid #6BCB77" }}
                        />
                        <FooterTitle>V-MED</FooterTitle>
                    </div>
                    
                        <FooterText><strong>Địa chỉ:</strong> Đường 3/2, Xuân Khánh, Ninh Kiều, tp.Cần Thơ</FooterText>
                        <FooterText><strong>Hotline:</strong> 1900 1234</FooterText>
                        <FooterText><strong>Email:</strong> support@medicare.vn</FooterText>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <FooterTitle>Thông tin</FooterTitle>
                        <FooterText>Giới thiệu về chúng tôi</FooterText>
                        <FooterText>Chính sách quyền riêng tư</FooterText>
                        <FooterText>Điều khoản sử dụng</FooterText>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <FooterTitle>Dịch vụ</FooterTitle>
                        <FooterText>Khám bệnh online</FooterText>
                        <FooterText>Đặt lịch với bác sĩ</FooterText>
                        <FooterText>Tư vấn sức khỏe</FooterText>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <FooterTitle>Hỗ trợ khách hàng</FooterTitle>
                        <FooterText>Trung tâm trợ giúp</FooterText>
                        <FooterText>Câu hỏi thường gặp</FooterText>
                        <FooterText>Liên hệ hỗ trợ</FooterText>
                    </Col>
                </Row>

                <Row style={{ marginTop: 30 }}>
                    <Col span={24}>
                        <FooterTitle>Kết nối với chúng tôi</FooterTitle>
                        <SocialLinks>
                            <SocialIcon href="https://facebook.com" target="_blank"><FacebookOutlined /></SocialIcon>
                            <SocialIcon href="https://twitter.com" target="_blank"><TwitterOutlined /></SocialIcon>
                            <SocialIcon href="https://instagram.com" target="_blank"><InstagramOutlined /></SocialIcon>
                            <SocialIcon href="https://linkedin.com" target="_blank"><LinkedinOutlined /></SocialIcon>
                            <SocialIcon href="https://youtube.com" target="_blank"><YoutubeOutlined /></SocialIcon>
                        </SocialLinks>
                    </Col>
                </Row>

                <FooterBottom>
                    <FooterText>© {new Date().getFullYear()} Medicare Health. Đã đăng ký bản quyền.</FooterText>
                    <FooterText>Phát triển bởi đội ngũ Medicare</FooterText>
                </FooterBottom>
            </FooterWrapper>
        </div>
    );
};

export default FooterComponent;
