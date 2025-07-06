import { Avatar, Tag, Typography } from "antd";
import { UserOutlined, StarFilled } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { CardDoctorContainer, Header, Content, SpecialtyTags, Rating } from "./style";
import DefaultImage from "../../assets/default-doctor.jpg"; // Default image for doctor avatar
const { Text, Paragraph } = Typography;

const CardDoctorComponent = ({ doctor, onClick }) => {
    const avatarUrl = doctor?.user?.avatar ? `${import.meta.env.VITE_API_URL}${doctor.user.avatar}` : null;

    return (
        <CardDoctorContainer>
            {/* Header với avatar và chuyên khoa */}
            <Header>
                <div style={{ position: "relative" }}>
                    <Avatar
                        size={80}
                        src={avatarUrl || DefaultImage} // Use a default image if avatarUrl is not available
                        icon={!avatarUrl && <UserOutlined />}
                        style={{
                            backgroundColor: "#1890ff",
                            fontSize: 24,
                            marginBottom: 8,
                        }}
                    >
                        {!avatarUrl &&
                            (doctor?.user?.name ? doctor.user.name.slice(0, 2).toUpperCase() : "NA")}
                    </Avatar>

                    {/* <Rating>
                        <StarFilled style={{ color: "#fadb14", marginRight: 4 }} />
                        4.8
                    </Rating> */}
                </div>

                <Tag
                    color="#2BB3A9"
                    style={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        fontWeight: "500",
                    }}
                >
                    {doctor?.department?.name || "Chuyên khoa"}
                </Tag>
            </Header>

            {/* Nội dung */}
            <Content>
                <Text strong style={{ fontSize: "16px" }}>
                    {doctor?.user?.name || "Chưa rõ tên"}
                </Text>
                <Text type="secondary" style={{ display: "block", marginBottom: 4 }}>
                    {doctor?.position?.name || "Chức vụ"}
                </Text>

                {/* Mô tả */}
                <div
                    style={{
                        fontSize: 13,
                        color: "rgba(0, 0, 0, 0.45)",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        height: "2.4em",
                        wordBreak: "break-word",
                    }}
                    dangerouslySetInnerHTML={{
                        __html: doctor?.description || "Thông tin mô tả bác sĩ đang được cập nhật...",
                    }}
                />

                <ButtonComponent styleButton={{ backgroundColor: "#2BB3A9", color: "white" }}
                type="primary" onClick={onClick}>
                    Xem chi tiết
                </ButtonComponent>
            </Content>
        </CardDoctorContainer>
    );
};

export default CardDoctorComponent;
