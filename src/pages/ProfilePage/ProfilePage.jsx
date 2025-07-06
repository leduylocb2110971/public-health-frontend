import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import {
    AppstoreOutlined,
    InfoCircleOutlined,
    LoginOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Menu, Avatar, Typography, Divider, Flex } from "antd";
import * as AuthService from "../../services/AuthService";
import * as UserService from "../../services/UserService";
import * as Message from "../../components/Message/Message";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUser } from "../../redux/Slice/authSlice";
// import { resetAppointment } from "../../redux/Slice/appointmentSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ModalUpdateUser from "../../components/ModalUpdateUser/ModalUpdateUser";
import { useMutation } from "@tanstack/react-query";
import PersonalProfile from "../../components/PersonalProfile/PersonalProfile";
import AccountInfor from "../../components/AccountInfor/AccountInfor";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
const { Title, Text, Paragraph } = Typography;

//Menu bên trái, khi click vào sẽ hiện ra các trang con

const items = [
    {
        key: 'info',
        icon: <UserOutlined />,
        label: 'Thông tin cá nhân',
        children: [
            {
                key: 'account',
                icon: <InfoCircleOutlined />,
                label: 'Thông tin tài khoản',
            },
            // {
            //     key: 'profile',
            //     icon: <AppstoreOutlined />,
            //     label: 'Hồ sơ cá nhân',
            // }
        ],
    },
    {type: 'divider'},
    {
        key: 'logout',
        icon: <LoginOutlined />,
        label: 'Đăng xuất',
    },
];

const ProfilePage = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    // Kiểm tra xem có state từ navigation không
    const initialTab = location?.state?.tab || "account"; // Mặc định là "profile" nếu không có state
    const [selectedKey, setSelectedKey] = useState(initialTab);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const mutationUpdateProfile = useMutation({ 
        mutationFn: (data) => {
            const {id, ...updateData} = data;
            
            return UserService.updateUser(id, updateData);
        },
        onSuccess: (res) => {
            console.log("res:", res);
            Message.success("Cập nhật thông tin cá nhân thành công!");
            dispatch(updateUser(res.data));
            console.log("Cập nhật thông tin cá nhân thành công:", res.data);
            setIsModalOpen(false);
            const { _id, createdAt, updatedAt, __v, password, ...updatedData } = res.data;
            dispatch(updateUser(updatedData));
        },
        onError: (error) => {
            Message.error("Cập nhật thông tin cá nhân thất bại: " + error.message);
        }
    });
    const {isPending: isPendingUpdateProfile} = mutationUpdateProfile;
    // useEffect(() => {
    //     // Cập nhật selectedKey khi có thay đổi từ location state
    //     if (location?.state?.tab && location.pathname === "/profile" && location.state.tab !== selectedKey) {
    //         setSelectedKey(location.state.tab);
    //     }
    // }, [location?.state])


    //Khi người dùng click vào một mục trong menu, sẽ cập nhật selectedKey và hiển thị nội dung tương ứng.
    const handleMenuClick = ({key}) => {
        setSelectedKey(key);
        console.log("Menu clicked:", key); // Xem log
        if (key === "logout") {
            handleLogOutUser();
        }
    }
    //Khi 
    const handleLogOutUser = () => {
        try{
            AuthService.logoutUser();
            dispatch(logout());
            navigate("/authentication", {
                state: {
                    status: "success",
                    message: "Đăng xuất thành công!"
                }
            });
        } catch (error) {
            Message.error("Đăng xuất thất bại!: " + error.message);
        }
    }
    const handleUpdateProfile = (data) => {
        mutationUpdateProfile.mutate(data);
    }
    //Mỗi mục sẽ hiển thị component khác nhau dựa trên key đã chọn.
    const renderContent = () => {
        console.log("Selected key:", selectedKey); // Xem log
        switch (selectedKey) {
            case "account":
                return <AccountInfor
                    user={user}
                    handleChangeProfile={() => setIsModalOpen(true)}/>;
            case "profile":
                return <PersonalProfile
                    user={user}
                    onClick={() => setIsModalOpen(true)} />;
            default:
                return <div>Chọn một mục từ menu</div>;
        }
    };

    return (
        <>
        <div
                style={{
                    minHeight: "100vh",
                    maxWidth: "1200px",
                    width: "100%",
                    padding: "85px 0px",
                    margin: "0 auto",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        backgroundColor: "#fff",
                        borderRadius: "12px",
                        overflow: "hidden",
                        boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
                        width: "100%",
                        flexWrap: "wrap",
                    }}
                >
                    {/* Left: Avatar + Menu */}
                    <div
                        style={{
                            padding: "24px",
                            minWidth: "260px",
                            backgroundColor: "#f0f0f0",
                            borderRight: "1px solid #e0e0e0",
                        }}
                    >
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Avatar
                                size={80}
                                icon={<UserOutlined />}
                                style={{ backgroundColor: "#1890ff", marginBottom: "10px" }}
                            />
                            <ButtonComponent>
                                Thay đổi
                            </ButtonComponent>
                            <Title level={5} style={{ margin: 0 }}>
                                {user?.name || "Người dùng"}
                            </Title>
                            <Text type="secondary">Bệnh nhân</Text>
                            <Divider></Divider>
                        </div>
                        <Menu
                            onClick={handleMenuClick}
                            defaultOpenKeys={["info"]}
                            selectedKeys={[selectedKey]}
                            mode="inline"
                            items={items}
                        />
                    </div>

                    {/* Right: Content */}
                    <div style={{ flex: 1, padding: "30px" }}>
                        {renderContent()}

                    </div>
                </div>
            </div>
            <ModalUpdateUser
                isModalOpen={isModalOpen}
                handleUpdateProfile={handleUpdateProfile}
                isPendingUpdateProfile={isPendingUpdateProfile}
                patient={user}
                onCancel={() => setIsModalOpen(false)}
            />
        </>
            
    );
};

export default ProfilePage;