import React from "react";
import { useState, useMemo, useEffect } from "react";
import { Row, Col, Image, Popover, Drawer, Menu, Dropdown, Collapse } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import {
    HeaderContainer,
    LogoSection,
    BrandTitle,
    NavButtons,
    PopupItem,
    MobileMenuButton,
    SearchWrapper,
} from "./style";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import InputComponent from "../InputComponent/InputComponent";
import {
    HomeOutlined,
    CustomerServiceOutlined,
    UserOutlined,
    InfoCircleFilled,
    SettingFilled,
    LogoutOutlined,
    CaretDownOutlined,
    PhoneOutlined,
    GroupOutlined,
    SolutionOutlined,
    ReadOutlined,
    MenuOutlined,
} from "@ant-design/icons";
import img from "../../assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { useQuery, useMutation } from "@tanstack/react-query";
import { logout } from "../../redux/Slice/authSlice";
import * as Message from "../Message/Message";
import * as AuthService from "../../services/AuthService";
import * as ServiceTypeService from "../../services/ServiceTypeService";
import * as NewsTypeService from "../../services/NewsTypeService";
const HeaderComponent = () => {
    const location = useLocation();

    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    useEffect(() => {
    const params = new URLSearchParams(location.search);
    const keyword = params.get("keyword") || "";
    setSearchValue(keyword);
  }, [location]);
    const handleSearch = (value) => {
        // Xử lý logic tìm kiếm ở đây
        if (value) {
            navigate(`/search?keyword=${encodeURIComponent(value)}`);
        }
    }
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const isAdmin = user?.role === "admin";
    const [isOpenPopupUser, setIsOpenPopupUser] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { Panel } = Collapse;
    const selectedServiceKey = useMemo(() => {
    if (location.pathname.startsWith("/service/")) {
        return location.pathname.replace("/service/", "");
    }
    return "";
    }, [location.pathname]);

    const selectedNewsKey = useMemo(() => {
    if (location.pathname.startsWith("/news/")) {
        return location.pathname.replace("/news/", "");
    }
    return "";
}, [location.pathname]);
    
    const queryAllServiceType = useQuery({
        queryKey: ["allServiceType"],
        queryFn: () => ServiceTypeService.getAllServiceTypes(),
        onSuccess: (data) => {
            // console.log("Dữ liệu loại dịch vụ:", data);
        },
        
        onError: (error) => {
            Message.error(error.message || "Lấy dữ liệu loại dịch vụ thất bại");
        },
    });

    const queryAllNewsType = useQuery({
        queryKey: ["allNewsType"],
        queryFn: () => NewsTypeService.getAllNewsTypes(),
        onSuccess: (data) => {
            // console.log("Dữ liệu loại tin tức:", data);
        },
        onError: (error) => {
            Message.error(error.message || "Lấy dữ liệu loại tin tức thất bại");
        },
    });
    const { data: allServiceType, isPending: isPendingAllServiceType } = queryAllServiceType;
    const { data: allNewsType, isPending: isPendingAllNewsType } = queryAllNewsType;
    console.log(allNewsType);
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
    // const menu = (
    //     <Menu
    //         items={[
    //             {
    //                 label: (
    //                     <PopupItem
    //                         onClick={() => navigate("/profile")}
    //                         $isSelected={location.pathname === "/profile"}
    //                     >
    //                         <InfoCircleFilled
    //                             style={{ fontSize: "15px", marginRight: "8px" }}
    //                         />
    //                         Thông tin người dùng
    //                     </PopupItem>
    //                 ),
    //                 key: "1",
    //             },
    //             isAdmin && {
    //                 label: (
    //                     <PopupItem
    //                         $isSelected={location.pathname === "/admin"}
    //                         onClick={() => navigate("/admin")}
    //                     >
    //                         <SettingFilled
    //                             style={{ fontSize: "15px", marginRight: "8px" }}
    //                         />
    //                         Quản lý hệ thống
    //                     </PopupItem>
    //                 ),
    //                 key: "2",
    //             },
    //             {
    //                 label: (
    //                     <PopupItem onClick={() => navigate("/order")}>
    //                         <InfoCircleFilled
    //                             style={{ fontSize: "15px", marginRight: "8px" }}
    //                         />
    //                         Đơn hàng của tôi
    //                     </PopupItem>
    //                 ),
    //                 key: "3",
    //             },
    //             {
    //                 label: (
    //                     <PopupItem onClick={handleLogoutUser}>
    //                         <LogoutOutlined
    //                             style={{ fontSize: "15px", marginRight: "8px" }}
    //                         />
    //                         Đăng xuất
    //                     </PopupItem>
    //                 ),
    //                 key: "4",
    //             },
    //         ]}
    //     />
    // );

    // Nội dung dropdown menu
    const content = useMemo(
        () => (
            <>
                <PopupItem
                    onClick={() => navigate("/profile")}
                    $isSelected={location.pathname === "/profile"}
                >
                    <InfoCircleFilled
                        style={{ fontSize: "15px", marginRight: "8px" }}
                    />
                    Thông tin người dùng
                </PopupItem>
                {user?.role === "admin" && (
                    <PopupItem
                        $isSelected={location.pathname === "/admin"}
                        onClick={() => navigate("/admin/dashboard")}
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
                    Lịch hẹn của tôi
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
    //Nội dung dropdown loại dịch vụ
    const serviceContent = (
        <div>
            {allServiceType?.data.map((serviceType) => {
                return (
                    <PopupItem
                        key={serviceType._id}
                        onClick={() => navigate(`/service/${serviceType._id}`)}
                        $isSelected={location.pathname === `/service/${serviceType._id}`}
                    >
                        {serviceType.name}
                    </PopupItem>
                );
            }
    )}

        </div>
    );
    const newsContent = (
        <div>
            {allNewsType?.data.map((newsType) => {
                return (
                    <PopupItem
                        key={newsType._id}
                        onClick={() => navigate(`/news/${newsType._id}`)}
                        $isSelected={location.pathname === `/news/${newsType._id}`}
                    >
                        {newsType.name}
                    </PopupItem>
                );
            }
    )}
        </div>
    )

    return (
        <HeaderContainer>
            <Row justify="space-between">
                <Col xs={6}>
                    <LogoSection onClick={() => navigate("/")}>
                        <Image
                            src={img}
                            alt="V-MED Logo"
                            preview={false}
                            style={{ maxWidth: "55px",cursor: "pointer", borderRadius: "50%" }}
                        />
                        <BrandTitle>V-MED</BrandTitle>
                    </LogoSection>
                    
                </Col>
                
                {/* Desktop Menu */}
                <Col xs={0} md={18}>
                    <NavButtons>
                        
                        <InputComponent
                            placeholder="Tìm kiếm"
                            value={searchValue}
                            onChange={e => setSearchValue(e.target.value)}
                            onSearch={handleSearch}
                            size="large"
                        />  
                        
                        <ButtonComponent
                            size="middle"
                            type="default"
                            icon={<HomeOutlined />}
                            onClick={() => navigate("/")}
                        >
                            Trang chủ
                        </ButtonComponent>
                        <ButtonComponent
                            size="middle"
                            type="default"
                            icon={<GroupOutlined/>}
                            onClick={() => navigate("/about-us")}
                        >
                            Về chúng tôi
                        </ButtonComponent>
                        <Popover
                            content={serviceContent}
                            trigger="hover" 
                            placement="bottom"
                        >    
                            <ButtonComponent
                                size="middle"
                                type="default"
                                icon={<CustomerServiceOutlined />} 
                                onClick={()=> navigate("/service")}                               
                            >
                                Dịch vụ
                            </ButtonComponent>
                        </Popover>
                        <Popover
                            content={newsContent}
                            trigger="hover"
                            placement="bottom"
                        >
                            <ButtonComponent
                                size="middle"
                                type="default"
                                icon={<ReadOutlined />}
                                onClick={() => navigate("/news")}
                            >
                                Tin tức
                            </ButtonComponent>
                        </Popover>
                        <ButtonComponent
                            size="middle"
                            type="default"
                            icon={<SolutionOutlined />}
                            onClick={() => navigate("/medical-staff")}
                        >
                            Đội ngũ y tế
                        </ButtonComponent>
                        <ButtonComponent
                            size="middle"
                            type="default"
                            icon={<PhoneOutlined />}
                            onClick={() => navigate("/contact-us")}
                        >
                            Liên hệ
                        </ButtonComponent>
                        {user?.access_token ? (
                            <Popover
                                content={content}
                                open={isOpenPopupUser}
                                onOpenChange={(visible) =>
                                    setIsOpenPopupUser(visible)
                                }
                                placement="bottomRight"
                            >
                                <ButtonComponent
                                    size="middle"
                                    type="default"
                                    icon={<UserOutlined />}
                                >
                                    {user?.name || user?.email}{" "}
                                    <CaretDownOutlined />
                                </ButtonComponent>
                            </Popover>
                        ) : (
                            <ButtonComponent
                                size="middle"
                                onClick={() => navigate("/authentication")}
                            >
                                Đăng nhập
                            </ButtonComponent>
                        )}
                    </NavButtons>
                </Col>
                {/* Mobile Menu */}
                <Col xs={12} md={0}>
                    <MobileMenuButton>
                        <ButtonComponent
                            size="middle"
                            icon={<MenuOutlined />}
                            onClick={() => setIsDrawerOpen(true)}
                            styleButton={{
                                backgroundColor: "#fff",
                                color: "#1890ff",
                                border: "1px solid #1890ff",
                            }}
                            type="text"
                        ></ButtonComponent>
                    </MobileMenuButton>
                </Col>
            </Row>
            {/* Mobile Drawer Menu */}
            <Drawer
                title="Menu"
                placement="right"
                onClose={() => setIsDrawerOpen(false)}
                open={isDrawerOpen}
                width={280}
                forceRender
                >
                <ButtonComponent
                    size="middle"
                    icon={<HomeOutlined />}
                    onClick={() => {
                    navigate("/");
                    setIsDrawerOpen(false);
                    }}
                    style={{ width: "100%", marginBottom: 10 }}
                >
                    Trang chủ
                </ButtonComponent>

                <ButtonComponent
                    size="middle"
                    icon={<GroupOutlined />}
                    onClick={() => {
                    navigate("/about-us");
                    setIsDrawerOpen(false);
                    }}
                    style={{ width: "100%", marginBottom: 10 }}
                >
                    Về chúng tôi
                </ButtonComponent>

                <Collapse bordered={false} style={{ marginBottom: 10 }}>
                    <Panel header="Dịch vụ" key="1" extra={<CustomerServiceOutlined />}>
                    {allServiceType?.data.map((serviceType) => (
                        <ButtonComponent
                        key={serviceType._id}
                        style={{ width: "100%", marginBottom: 5 }}
                        onClick={() => {
                            navigate(`/service/${serviceType._id}`);
                            setIsDrawerOpen(false);
                        }}
                        >
                        {serviceType.name}
                        </ButtonComponent>
                    ))}
                    </Panel>
                </Collapse>

                <Collapse bordered={false} style={{ marginBottom: 10 }}>
                    <Panel header="Tin tức" key="2" extra={<ReadOutlined />}>
                    {allNewsType?.data.map((newsType) => (
                        <ButtonComponent
                        key={newsType._id}
                        style={{ width: "100%", marginBottom: 5 }}
                        onClick={() => {
                            navigate(`/news/${newsType._id}`);
                            setIsDrawerOpen(false);
                        }}
                        >
                        {newsType.name}
                        </ButtonComponent>
                    ))}
                    </Panel>
                </Collapse>

                <ButtonComponent
                    size="middle"
                    icon={<SolutionOutlined />}
                    onClick={() => {
                    navigate("/medical-staff");
                    setIsDrawerOpen(false);
                    }}
                    style={{ width: "100%", marginBottom: 10 }}
                >
                    Đội ngũ y tế
                </ButtonComponent>

                <ButtonComponent
                    size="middle"
                    icon={<PhoneOutlined />}
                    onClick={() => {
                    navigate("/contact-us");
                    setIsDrawerOpen(false);
                    }}
                    style={{ width: "100%", marginBottom: 10 }}
                >
                    Liên hệ
                </ButtonComponent>

                {user?.access_token ? (
                    <>
                    <Collapse bordered={false} style={{ marginBottom: 10 }}>
                        <Panel header={user?.name || user?.email} key="3" extra={<UserOutlined />}>
                        <ButtonComponent
                            style={{ width: "100%", marginBottom: 5 }}
                            onClick={() => {
                            navigate("/profile");
                            setIsDrawerOpen(false);
                            }}
                        >
                            Thông tin người dùng
                        </ButtonComponent>
                        {user?.role === "admin" && (
                            <ButtonComponent
                            style={{ width: "100%", marginBottom: 5 }}
                            onClick={() => {
                                navigate("/admin/dashboard");
                                setIsDrawerOpen(false);
                            }}
                            >
                            Quản lý hệ thống
                            </ButtonComponent>
                        )}
                        <ButtonComponent
                            style={{ width: "100%", marginBottom: 5 }}
                            onClick={async () => {
                            await handleLogoutUser();
                            setIsDrawerOpen(false);
                            }}
                        >
                            Đăng xuất
                        </ButtonComponent>
                        </Panel>
                    </Collapse>
                    </>
                ) : (
                    <ButtonComponent
                    size="middle"
                    onClick={() => {
                        navigate("/authentication");
                        setIsDrawerOpen(false);
                    }}
                    style={{ width: "100%", marginBottom: 10 }}
                    >
                    Đăng nhập
                    </ButtonComponent>
                )}
            </Drawer>
        </HeaderContainer>
    );
};

export default HeaderComponent;