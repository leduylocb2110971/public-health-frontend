import {
    Layout,
    Menu,
    Breadcrumb,
    theme,
    Avatar,
    Badge,
    Popover,
    Grid,
    Modal
} from "antd";//Nhúng thư viện giao diện UI
import {
    DashboardOutlined,
    CalendarOutlined,
    TeamOutlined,
    SettingOutlined,
    LogoutOutlined,
    UserOutlined,
    CaretDownOutlined,
    BellOutlined,
    InfoCircleFilled,
    CaretRightOutlined,
    SettingFilled,
    MedicineBoxOutlined,
    SolutionOutlined,
    FileTextOutlined,
} from "@ant-design/icons";//Nhúng icons
//Outlet: Hiển thị nội dung con, useNavigate: Chuyển trang bằng code, useLocation: lấy tt trang hiện tại
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import Logo from "../../assets/logo.png";

//userState: quản lí trạng thái
import { useState, useMemo } from "react";
import { PopupItem, CustomSider } from "./style";

//userSelecttor: lấy dữ liệu từ store toàn cục
import { useSelector, useDispatch } from "react-redux";
const { Header, Sider, Content, Footer } = Layout;

import { logout } from "../../redux/Slice/authSlice";
import * as Message from "../Message/Message";
import * as AuthService from "../../services/AuthService";
const AdminLayout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    const [collapsed, setCollapsed] = useState(false);
    const [isOpenPopupUser, setIsOpenPopupUser] = useState(false);
    //Lấy user từ Redux store ở phần auth.user. Chứa thông tin như tên, email, avatar, vai trò...
    const user = useSelector((state) => state.auth.user);
    const breadcrumbNameMap = {
        "/admin": "Quản trị",
        "/admin/dashboard": "Thống kê",
        "/admin/departments": "Chuyên khoa",
        "/admin/doctors": "Bác sĩ",
        "/admin/positions": "Chức vụ",
        "/admin/services": "Dịch vụ",
        "/admin/service-types": "Loại dịch vụ",
        "/admin/news": "Tin tức",
        "/admin/news-types": "Loại tin tức",
        "/admin/patients": "Tài khoản",
    }
    //Tách URL tạo breadcumb
    //VD: nếu location.pathname là /admin/doctors thì pathSnippets = ["admin", "doctors"]
    const pathSnippets = location.pathname.split("/").filter((i) => i);
    const breadcrumbItems = [
    {
        title: "Trang chủ",
        key: "home",
    },
    //Tạo mảng các mục breadcrumb
    ...pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
        return {
            title: breadcrumbNameMap[url] || url,
            key: url,
            };
        }),
    ];
    //Lấy ra các biến màu nền và bo góc từ hệ thống theme của Ant Design
    const {
    token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const handleLogoutUser = async () => {
        try {
            await AuthService.logoutUser();
            Message.success("Đăng xuất thành công");
            setIsOpenPopupUser(false);
            dispatch(logout());
            navigate("/authentication");
        } catch (error) {
            Message.error(error.message || "Đăng xuất thất bại");
            }
    };
    const confirmLogout = () => {
    Modal.confirm({
        title: "Xác nhận đăng xuất",
        content: "Bạn có chắc chắn muốn đăng xuất?",
        okText: "Đăng xuất",
        cancelText: "Hủy",
        onOk: handleLogoutUser
    });
};
    const menuItems = [
        {
            key:"/admin/dashboard",
            icon: <DashboardOutlined/>,
            label:"Thống kê",
        },
        {
            icon: <SolutionOutlined />,
            label: "Quản lý bác sĩ",
            children: [
                { key: "/admin/doctors", label: "Bác sĩ" },
                {key: "/admin/positions", label: "Chức vụ"},
                { key: "/admin/departments", label: "Chuyên khoa" },
            ],
        },
        {
            icon: <MedicineBoxOutlined />,
            label: "Quản lý dịch vụ",
            children: [
                { key: "/admin/services", label: "Dịch vụ" },
                { key: "/admin/service-types", label: "Loại dịch vụ" },
            ],
        },
        {
            icon: <FileTextOutlined />,
            label: "Quản lý tin tức",
            children: [
                { key: "/admin/news", label: "Tin tức" },
                { key: "/admin/news-types", label: "Loại tin tức" },
            ],
        },
        {
            key: "/admin/patients",
            icon: <TeamOutlined />,
            label: "Quản lý tài khoản",
        },
        { key: "/logout", icon: <LogoutOutlined />, label: <span onClick={confirmLogout}>Đăng xuất</span> },
    ];

    const handleMenuClick = ({ key }) => {
        if (key === "/logout") {
            // Xử lý logout nếu cần
            return;
        }
        navigate(key);
    };
    

    //DROPDOWN MENU
    const content = useMemo(
        () => (
            <>
                <PopupItem onClick={() => navigate("/profile")}>
                    <InfoCircleFilled
                        style={{ fontSize: "15px", marginRight: "8px" }}
                    />
                    Thông tin người dùng
                </PopupItem>
                {user?.role === "admin" && (
                    <PopupItem
                        $isSelected={location.pathname === "/admin"}
                        onClick={() => navigate("/admin")}
                    >
                        <SettingFilled
                            style={{ fontSize: "15px", marginRight: "8px" }}
                        />
                        Quản lý hệ thống
                    </PopupItem>
                )}
                <PopupItem onClick={() => navigate("/order")}>
                    <InfoCircleFilled
                        style={{ fontSize: "15px", marginRight: "8px" }}
                    />
                    Đơn hàng của tôi
                </PopupItem>
                <PopupItem onClick={handleLogoutUser}>
                    <LogoutOutlined
                        style={{ fontSize: "15px", marginRight: "8px" }}
                    />
                    Đăng xuất
                </PopupItem>
            </>
        ),
        [user?.role],
    );

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <CustomSider>
    <div
        style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px 0",
            gap: 8,
        }}
    >
        <img
            width={40}
            src={Logo}
            alt="Logo"
            style={{
                cursor: "pointer",
                borderRadius: "50%",
                backgroundColor: "#fff",
                padding: 4,
            }}
            onClick={() => navigate("/")}
        />
        {!collapsed && (
            <span
                style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#E8FFFB", // màu trắng ngả xanh
                }}
            >
                V-MED
            </span>
        )}
    </div>
    <Menu
        mode="inline"
        onClick={handleMenuClick}
        defaultSelectedKeys={["/admin/dashboard"]}
        items={menuItems}
        style={{
            height: "100%",
            borderRight: 0,
            backgroundColor: "#1E7670", // giống màu sider
            color: "#ffffff",
        }}
    />
</CustomSider>

            <Layout>
                <Header
                    style={{
                        background: "#fff",
                        padding: 0,
                        textAlign: "right",
                        paddingRight: 24,
                    }}
                >
                    
                    {screens.md && (//Nút Icon thông báo
                        <ButtonComponent
                            type="default"
                            icon={
                                <Badge count={100}>
                                    <BellOutlined
                                        style={{ fontSize: "25px" }}
                                    />
                                </Badge>
                            }
                            styleButton={{
                                marginRight: "16px",
                                border: "1px solid #1890ff",
                            }}
                            size="middle"
                        />
                    )}

                    {user?.access_token && (
                        <Popover
                            content={content}
                            open={isOpenPopupUser}//Tắt cái dropdown admin
                            onOpenChange={(visible) =>
                                setIsOpenPopupUser(visible)
                            }
                            placement="bottomRight"
                        >
                            <ButtonComponent
                                type="default"
                                size="middle"
                                styleButton={{
                                    border: "1px solid #1890ff",
                                    marginRight: "16px",
                                }}
                                icon={
                                    <Avatar
                                        size={35}
                                        icon={<UserOutlined />}
                                        style={{ backgroundColor: "#87d068" }}
                                    />
                                }
                                onClick={() => navigate("/profile")}
                            >
                                {user?.name ||
                                    user?.email ||
                                    "Xin chào, Admin!"}
                            </ButtonComponent>
                        </Popover>
                    )}
                </Header>
                <Content style={{ margin: 16, overflow: "auto" }}>
                    <Breadcrumb
                        style={{ margin: "16px 0" }}
                        items={breadcrumbItems}
                    ></Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    © {new Date().getFullYear()} Hệ thống y tế công cộng |
                    Admin Dashboard
                </Footer>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;

