import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { UserOutlined, WarningOutlined, MailOutlined, PhoneOutlined, ManOutlined, IdcardOutlined, CreditCardOutlined, FlagOutlined, ToolOutlined, EnvironmentOutlined, CalendarOutlined } from "@ant-design/icons";
import { Typography, Divider, Flex, Card } from "antd";
import { StyleText } from "./style";
const { Title, Text, Paragraph } = Typography;

const PersonalProfile = ({ user, onClick }) => {
    return (
        <>
        <Title level={3}>Thông tin cá nhân</Title>
        <Text type="secondary">Thông tin cá nhân của bạn sẽ được bảo mật và không chia sẻ với bên thứ ba.</Text>
        <Paragraph style={{ backgroundColor: "#fed7aa", padding: "10px" }}>
            <WarningOutlined/> <Text strong>Thông báo:</Text> Vui lòng cập nhật thông tin cá nhân để đảm bảo quyền lợi của bạn.
        </Paragraph>
        <Divider> </Divider>
        <Flex align="flex-start">

            {/* Thông tin cá nhân */}
            <Flex vertical style={{ flex:1}} gap={8}>
                {/* <Title level={4} style={{ marginBottom: 0 }}>Thông tin cá nhân</Title> */}
                <StyleText><strong><UserOutlined/>Họ và tên: </strong>{user?.name || "--"}</StyleText>
                <StyleText><strong><MailOutlined/>Email: </strong>{user?.email || "--"}</StyleText>
                <StyleText><strong><PhoneOutlined/>Số điện thoại:  </strong>{user?.phone || "--"}</StyleText>
            </Flex>

        </Flex>
        <ButtonComponent
                type="primary"
                style={{ marginTop: 24, width: "30%" }}
                size="large"
                onClick={onClick}
            >
                <UserOutlined style={{ marginRight: 8 }} />
                Chỉnh sửa thông tin
            </ButtonComponent>
        </>
    )
}
export default PersonalProfile;