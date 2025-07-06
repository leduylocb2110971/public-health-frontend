import React from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { Flex, Form, Input, Select, Table, Space, Pagination, Upload, Image, Modal, Button, Popover} from "antd";
import {
    DeleteOutlined,
    ExportOutlined,
    ImportOutlined,
    PlusCircleFilled,
    UploadOutlined,
    EditOutlined,
    SearchOutlined
} from "@ant-design/icons";
import ModalComponent from "../../components/ModalComponent/ModalComponent"
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import DrawerComponent from "../../components/DrawerComponent/DrawerComponent";
import { useQuery, useMutation } from "@tanstack/react-query";
import * as DepartmentService from "../../services/DepartmentService";
import * as PositionService from "../../services/PositionService";
import * as  DoctorService from "../../services/DoctorService";
import * as UserService from "../../services/UserService";
import * as Message from "../../components/Message/Message";
import img from "../../assets/default-doctor.jpg";
import { useState, useRef } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const Doctor = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [rowSelected, setRowSelected] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [formCreate] = Form.useForm();
    const [formUpdate] = Form.useForm();
    const [isModalOpenDeleteMany, setIsModalOpenDeleteMany] = useState(false);
    const [open, setOpen] = useState(false); // Modal khi bấm vào avt
    const [previewAvatar, setPreviewAvatar] = useState(null); // Dùng để hiển thị ảnh tạm
    const [selectedFile, setSelectedFile] = useState(null);   // Dùng để upload khi onOk
    // Trong component
    const [file, setFile] = useState(null); // Biến để lưu trữ file ảnh
    const propsUpload = {
        beforeUpload: (file) => {
            setFile(file); // Lưu file vào state
            return false; // Ngăn không upload tự động
        },
        showUploadList: false,
    };// Props cho Upload component
    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false);
    };    
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedKeys, selectedRows) => {
            setSelectedRowKeys(selectedKeys);
        },
        type: "checkbox",
    };
    const queryGetAllDepartments = useQuery({
        queryKey: ["getAllDepartments"],
        queryFn: DepartmentService.getAllDepartments,
        keepPreviousData: true,
    }) 
    const queryGetAllDoctors = useQuery({
        queryKey: ["getAllDoctors"],
        queryFn: () => DoctorService.getAllDoctors(pagination.current, pagination.pageSize),
        keepPreviousData: true,
    })
    const queryGetAllPositions = useQuery({
        queryKey: ["getAllPositions"],
        queryFn: PositionService.getAllPositions,
        keepPreviousData: true,
    }) 
    
    const mutaionAddDoctor = useMutation({
        mutationFn: (data) => {
            return DoctorService.createDoctor(data);
        },
        onSuccess: (data) => {
            Message.success(data.message);
            formCreate.resetFields();
            setIsOpenAdd(false);
        },
        onError: (error) => {
            Message.error(error.response.data.message);
        },
    })
    const mutaionUpdateDoctor = useMutation({
        mutationFn: (data) => {
            const { id, ...rests } = data;
            return DoctorService.updateDoctor(id, rests);
        },
        onSuccess: (data) => {
            Message.success(data.message);
            formCreate.resetFields();
            setIsDrawerOpen(false);
        },
        onError: (error) => {
            Message.error(error.response.data.message);
        },
    })
    const mutationDeleteDoctor = useMutation({
        mutationFn: (data) => DoctorService.deleteDoctor(data),
        onSuccess: (data) => {
            Message.success(data.message);
            formCreate.resetFields();
            setIsModalOpenDelete(false);
        },
        onError: (error) => {
            Message.error(error.response.data.message);
        },
    })
    const mutationDeleteManyDoctors = useMutation({
        mutationFn: (data) => DoctorService.deleteManyDoctors(data),
        onSuccess: (data) => {
            Message.success(data.message);
            formCreate.resetFields();
            setIsModalOpenDeleteMany(false);
        },
        onError: (error) => {
            Message.error(error.response.data.message);
        },
    })
    // Mutation thay đổi avatar 
    const mutationUploadAvatar = useMutation({
        mutationFn: (data) => {
            const { userId, file } = data;
            return UserService.uploadAvatar(userId, file);
        },
        onSuccess: (data) => {
            Message.success(data.message);
        },
        onError: (error) => {
            Message.error(error.response.data.message);
        },
    }); 
    const { data: departments, isLoading: isLoadingDepartment } = queryGetAllDepartments;
    const { data: positions, isLoading: isLoadingPosition } = queryGetAllPositions;
    const { data: doctors, isLoading: isLoadingDoctor } = queryGetAllDoctors;

    const { isPending: isPendingAdd } = mutaionAddDoctor;
    const { isPending: isPendingUpdate } = mutaionUpdateDoctor;
    const { isPending: isPendingDelete } = mutationDeleteDoctor;
    const { isPending: isPendingDeleteMany } = mutationDeleteManyDoctors;
    const { isPending: isPendingUploadAvatar } = mutationUploadAvatar; // Mutation thay đổi avatar
    const handleAddDoctor = () => {
        formCreate.validateFields().then((values) => {
            mutaionAddDoctor.mutate({
                name: values.name,
                email: values.email,
                // password: values.password,
                // confirmPassword: values.confirmPassword,
                phone: values.phone,
                departmentId: values.departmentId,
                positionId: values.positionId,
                description: values.description,
            }, {
                onSettled: () => {
                    queryGetAllDoctors.refetch();
                }
            })

        }).catch((error) => {
            console.log(error);
        });
    };
    const handleCloseAddDoctor = () => {
        setIsOpenAdd(false);
    };
    const handleEditDoctor = (id) => {
        const doctor = doctors?.data?.find((item) => item._id === id);
        console.log(doctor);
        if (doctor) {
            formUpdate.setFieldsValue({
                name: doctor.user?.name,
                email: doctor.user?.email,
                phone: doctor.user?.phone,
                departmentId: doctor.department?._id,
                positionId: doctor.position?._id,
                description: doctor.description,
            });
        }
        setIsDrawerOpen(true);
    }
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Tìm theo ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{ marginBottom: 8, display: "block" }}
                />
                <Space>
                    <ButtonComponent
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Tìm
                    </ButtonComponent>
                    <ButtonComponent
                        onClick={() => handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Xóa
                    </ButtonComponent>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{ color: filtered ? "#1890ff" : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ?.toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        filterDropdownProps: {
            onOpenChange: (open) => {
                if (open) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <span style={{ backgroundColor: "#ffc069", padding: 0 }}>
                    {text}
                </span>
            ) : (
                text
            ),
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };
    const columns = [
        {
            title: "STT",
            dataIndex: "index",
            key: "index",
            sorter: (a,b) => a.index - b.index,
        },
        {
            title: "Tên bác sĩ",
            dataIndex: "name",
            key: "name",
            ...getColumnSearchProps("name"),
            sorter: (a, b) => a.name?.length - b.name?.length,
            render: (_,record) => (

                
                <Flex gap={8} alignItems="center"
                onClick={() => {
                    setOpen(true);
                }}>

                    <Image
                        src={`${import.meta.env.VITE_API_URL}${record.avatar}`}
                        width={30}
                        height={30}
                        style={{ borderRadius: "50%" }}
                        fallback={img}
                        preview={false}
                        alt={record?.name}
                    />
                    <span style={{ fontWeight: "bold" }}>{record.name}</span>
                </Flex>
                
            ),
        },
        // {
        //     title: "Avatar",
        //     dataIndex: "avatar",
        //     key: "avatar",
        //     render: (text) => (
        //         <Image
        //             src={text}
        //             alt="Avatar"
        //             width={40}
        //             height={40}
        //             style={{ borderRadius: "50%" }}
        //             fallback={img}
        //         />
        //     ),
        // },
        {
            title: "Tên chuyên khoa",
            dataIndex: "department",
            key: "department",
            ...getColumnSearchProps("department"),
            sorter: (a, b) => a.department?.length - b.department?.length,
        },
        {
            title: "Tên chức vụ",
            dataIndex: "position",
            key: "position",
            ...getColumnSearchProps("position"),
            sorter: (a, b) => a.position?.length - b.position?.length,
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
            render: (text) => {
                // Loại bỏ tất cả tag HTML để hiển thị ngắn gọn trong bảng
                const plainText = text.replace(/<[^>]+>/g, "");
                return (
                    <Popover
                        content={
                            <div
                            style={{ maxWidth: 400, overflowWrap: "break-word" }}
                            dangerouslySetInnerHTML={{ __html: 
                                `<style> img { max-width: 100%; height: auto; display: block; margin: 8px 0; }
                                table { width: 100%; overflow-x: auto; display: block; }
                                iframe { max-width: 100%; }
                            </style>` + text
                             }}
                        />
                        }
                    >
                        <div
                            style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: 300,
                                cursor: "pointer",
                                whiteSpace: "normal",
                            }}
                        >
                            {plainText}
                        </div>
                    </Popover>
                );
            }
        },
        {
            title: "Thao tác",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <ButtonComponent
                        size="small"
                        type="primary"
                        icon={<EditOutlined style={{ fontSize: "15px" }} />}
                        onClick={() => handleEditDoctor(record.key)}
                    >
                        Sửa
                    </ButtonComponent>
                    <ButtonComponent
                        icon={<DeleteOutlined style={{ fontSize: "15px" }} />}
                        styleButton={{ backgroundColor: "red", color: "white" }}
                        size="small"
                        onClick={() => setIsModalOpenDelete(true)}
                    >
                        Xoá
                    </ButtonComponent>
                </Space>
            ),
        },
    ];
    pagination.total = doctors?.total || 0;
    const dataTable = doctors?.data?.map((item, index) => ({
        key: item._id,
        index: index + 1,
        name: item.user?.name,
        phone: item.user?.phone,
        avatar: item.user?.avatar,  
        department: item.department?.name,
        position: item.position?.name,
        description: item.description,
    })) || [];
    const handleChangePage = (page, pageSize) => {
        setPagination({
            ...pagination,
            current: page,
            pageSize: pageSize,
        });
    }
    const handleOnUpdateDoctor = (values) => {

        mutaionUpdateDoctor.mutate({
            id: rowSelected,
            name: values.name,
            email: values.email,
            phone: values.phone,
            departmentId: values.departmentId,
            positionId: values.positionId,
            description: values.description,
        }, {
            onSettled: () => {
                queryGetAllDoctors.refetch();
            }
        })
    }
        
    const handleUploadAvatar = () => {
        if(!selectedFile) {
            Message.error("Vui lòng chọn file ảnh để upload");
            return;
        }
        const formData = new FormData();
        formData.append("file", selectedFile);
        mutationUploadAvatar.mutate({
            userId: rowSelected,
            file: formData,
        }, {
            onSettled: () => {
                hideModal(); // Đóng modal sau khi upload thành công
                setPreviewAvatar(null); // Reset preview
                setSelectedFile(null); // Reset selected file
                queryGetAllDoctors.refetch();
            }                               
        });
    };
    const handleOkDelete = () => {
        mutationDeleteDoctor.mutate(rowSelected, {
            onSettled: () => {
                queryGetAllDoctors.refetch();
            }
        })
    };
    const handleOkDeleteMany = () => {
        mutationDeleteManyDoctors.mutate(
            {ids: selectedRowKeys}, {
            onSettled: () => {
                queryGetAllDoctors.refetch();
            }
        }
        )
    }
    const handleCancelDeleteMany = () => {
        setIsModalOpenDeleteMany(false);
    }
    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    };
    return (
        <>
            <Flex
                gap="middle"
                align="center"
                justify="space-between"
                style={{
                    marginBottom: "20px",
                    flexWrap: "wrap",
                    rowGap: "16px",
                }}
            >
                {/* Left side buttons */}
                <Flex
                    gap="middle"
                    style={{
                        flex: "1 1 300px",
                        justifyContent: "flex-start",
                        flexWrap: "wrap",
                    }}
                >
                    <ButtonComponent
                        danger
                        size="small"
                        disabled={selectedRowKeys.length === 0}
                        icon={<DeleteOutlined />}
                        onClick={() => setIsModalOpenDeleteMany(true)}
                        style={{ minWidth: "120px" }}
                    >
                        Xoá tất cả
                    </ButtonComponent>
                    <ButtonComponent
                        size="small"
                        icon={<PlusCircleFilled />}
                        type="primary"
                        onClick={() => setIsOpenAdd(true)}
                        style={{ minWidth: "120px" }}
                    >
                        Thêm mới
                    </ButtonComponent>
                </Flex>

                {/* Right side buttons */}
                <Flex
                    gap="middle"
                    style={{
                        flex: "1 1 300px",
                        justifyContent: "flex-end",
                        flexWrap: "wrap",
                    }}
                >
                    <ButtonComponent
                        size="small"
                        type="default"
                        icon={<ExportOutlined />}
                        styleButton={{
                            minWidth: "120px",
                            backgroundColor: "#52c41a",
                            color: "#fff",
                        }}
                    >
                        Export
                    </ButtonComponent>
                    <ButtonComponent
                        size="small"
                        type="primary"
                        icon={<ImportOutlined />}
                        styleButton={{
                            minWidth: "120px",
                            backgroundColor: "#1890ff",
                            color: "#fff",
                        }}
                    >
                        Import
                    </ButtonComponent>
                </Flex>
            </Flex>
            <LoadingComponent isLoading={isLoadingDoctor} delay={200}>
                <Table
                    rowSelection={rowSelection}
                    rowKey={"key"}
                    columns={columns}
                    scroll={{ x: "max-content" }}
                    dataSource={dataTable}
                    locale={{ emptyText: "Không có dữ liệu bệnh viện" }}
                    pagination={{
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        position: ["bottomCenter"],
                        showTotal: (total, range) => `Tổng ${total} bác sĩ`,
                        showSizeChanger: true, // Cho phép chọn số dòng/trang
                        pageSizeOptions: ["5", "8", "10", "20", "50"], // Tuỳ chọn số dòng
                        showQuickJumper: true, // Cho phép nhảy đến trang
                        onChange: (page, pageSize) => {
                            setPagination({
                                current: page,
                                pageSize: pageSize,
                            });
                        },
                    }}
                    onRow={(record) => ({
                        onClick: () => {
                            setRowSelected(record.key);
                        },
                    })}
                />
                
            </LoadingComponent>
            <DrawerComponent
                title="Chi tiết bệnh viện"
                placement="right"
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                width={window.innerWidth < 768 ? "100%" : 600}
                forceRender
            >
                <LoadingComponent isLoading={isPendingUpdate}>
                    <Form
                        name="formUpdate"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        style={{ maxWidth: 600, padding: "20px" }}
                        initialValues={{ remember: true }}
                        onFinish={handleOnUpdateDoctor}
                        autoComplete="off"
                        form={formUpdate}
                    >
                        <Form.Item
                            label="Tên bác sĩ"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên!",
                                },
                            ]}
                        >
                            <Input name="name" />
                        </Form.Item>
                        {/* SỐ ĐIỆN THOẠI */}
                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[
                                {
                                    message: "Vui lòng nhập số điện thoại!",
                                },
                                {
                                    pattern: /^0[0-9]{9}$/,
                                    message: "Số điện thoại không hợp lệ!",
                                },
                            ]}
                        >
                            <Input name="phone" />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    message: "Vui lòng nhập email!",
                                },
                                {
                                    type: "email",
                                    message: "Email không hợp lệ!",
                                },
                            ]}
                        >
                            <Input name="email" autoComplete="username" />
                        </Form.Item>
                        <Form.Item
                            label="Chuyên khoa"
                            name="departmentId"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn chuyên khoa!",
                                },
                            ]}
                        >


                            <Select
                                name="departmentId"
                                showSearch
                                placeholder="Chọn chuyên khoa"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
                            >
                                {departments &&
                                    departments?.data?.map((item) => (
                                        <Select.Option
                                            key={item._id}
                                            value={item._id}
                                        >
                                            {item.name}
                                        </Select.Option>
                                    ))}
                            </Select>
                        </Form.Item>


                        <Form.Item
                            label="Chức vụ"
                            name="positionId"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn chức vụ!",
                                },
                            ]}
                        >
                            <Select
                                name="positionId"
                                showSearch
                                placeholder="Chọn chức vụ"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
                            >

                                {positions &&
                                    positions?.data?.map((item) => (
                                        <Select.Option
                                            key={item._id}
                                            value={item._id}

                                        >
                                            {item.name}
                                        </Select.Option>
                                    ))}
                            </Select>
                        </Form.Item>
                        
                        <Form.Item
                            label="Mô tả"
                            name="description"
                        >
                            <CKEditor
                                editor={ClassicEditor}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    formUpdate.setFieldsValue({ description: data });
                                }}
                                data={formUpdate.getFieldValue("description") || ""}
                                config={{
                                    placeholder: "Nhập mô tả tại đây...",
                                }}
                            />

                        </Form.Item>
                        <Form.Item
                            label={null}
                            wrapperCol={{ offset: 20, span: 4 }}
                        >
                            <Space>
                                <ButtonComponent
                                    type="default"
                                    onClick={() => setIsDrawerOpen(false)}
                                >
                                    Huỷ
                                </ButtonComponent>
                                <ButtonComponent
                                    type="primary"
                                    htmlType="submit"
                                >
                                    Lưu
                                </ButtonComponent>
                            </Space>
                        </Form.Item>
                    </Form>
                </LoadingComponent>
            </DrawerComponent >
            <LoadingComponent isLoading={isPendingAdd}>
                <ModalComponent
                    title="Thêm mới bác sĩ"
                    open={isOpenAdd}
                    onOk={handleAddDoctor}
                    onCancel={handleCloseAddDoctor}
                    width={600}
                    style={{ borderRadius: 0 }}
                >
                    <Form
                        name="formCreate"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        style={{ maxWidth: 600, padding: "20px" }}
                        initialValues={{ remember: true }}
                        autoComplete="off"
                        form={formCreate}
                    >
                        <Form.Item
                            label="Tên bác sĩ"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên!",
                                },
                            ]}
                        >
                            <Input name="name" />
                        </Form.Item>
                        {/* SỐ ĐIỆN THOẠI */}
                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[
                                {
                                    message: "Vui lòng nhập số điện thoại!",
                                },
                                {
                                    pattern: /^0[0-9]{9}$/,
                                    message: "Số điện thoại không hợp lệ!",
                                },
                            ]}
                        >
                            <Input name="phone" />
                        </Form.Item>
                        {/* <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập email!",
                                },
                                {
                                    type: "email",
                                    message: "Email không hợp lệ!",
                                },
                            ]}
                        >
                            <Input name="email" autoComplete="username" />
                        </Form.Item> */}
                        {/* <Form.Item
                            label="Mật khẩu"
                            name="password"

                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập mật khẩu!",
                                },
                                {
                                    min: 6,
                                    message: "Mật khẩu phải có ít nhất 6 ký tự!",
                                },
                                {
                                    max: 20,
                                    message: "Mật khẩu không được quá 20 ký tự!",
                                },
                                {
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                                    message:
                                        "Mật khẩu phải có ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một ký tự đặc biệt!",
                                },
                            ]}
                        >
                            <Input.Password name="password" autoComplete="new-password" />
                        </Form.Item> */}
                        {/* <Form.Item
                            label="Nhập lại mật khẩu"
                            dependencies={["password"]}
                            name="confirmPassword"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập lại mật khẩu!",
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue("password") === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error(
                                                "Mật khẩu không khớp!"
                                            )
                                        );
                                    },
                                }),
                            ]}
                        >
                            <Input.Password name="confirmPassword" autoComplete="new-password" />
                        </Form.Item> */}

                        <LoadingComponent isLoading={isLoadingDepartment}>
                            <Form.Item
                                label="Chọn chuyên khoa"
                                name="departmentId"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng chọn chuyên khoa!",
                                    },
                                ]}
                            >


                                <Select
                                    name="departmentId"
                                    showSearch
                                    placeholder="Chọn chuyên khoa"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                    }
                                >
                                    {departments &&
                                        departments?.data?.map((item) => (
                                            <Select.Option
                                                key={item._id}
                                                value={item._id}
                                            >
                                                {item.name}
                                            </Select.Option>
                                        ))}
                                </Select>
                            </Form.Item>
                        </LoadingComponent>
                        <LoadingComponent isLoading={isLoadingPosition}>
                            <Form.Item
                                label="Chọn chức vụ"
                                name="positionId"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng chọn chức vụ!",
                                    },
                                ]}
                            >
                                <Select
                                    name="positionId"
                                    showSearch
                                    placeholder="Chọn chức vụ"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                    }
                                >

                                    {positions &&
                                        positions?.data?.map((item) => (
                                            <Select.Option
                                                key={item._id}
                                                value={item._id}
                                            >
                                                {item.name}
                                            </Select.Option>
                                        ))}
                                </Select>
                            </Form.Item>
                        </LoadingComponent>
                        
                        <Form.Item
                            label="Mô tả"
                            name="description"
                        >
                            <CKEditor
                                editor={ClassicEditor}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    formCreate.setFieldsValue({ description: data });   
                                }}
                                data={formCreate.getFieldValue("description") || ""}    
                                config={{
                                    placeholder: "Nhập mô tả tại đây...",
                                }}
                            />

                        </Form.Item>
                    </Form>
                </ModalComponent>
            </LoadingComponent>
            <ModalComponent
                title="Xoá bác sĩ"
                open={isModalOpenDelete}
                onOk={handleOkDelete}
                onCancel={handleCancelDelete}
                style={{ borderRadius: 0 }}
            >
                
                <LoadingComponent isLoading={isPendingDeleteMany}>
                    <p>
                        Bạn có chắc chắn muốn <strong>xóa</strong> bác sĩ này không?
                    </p>
                </LoadingComponent>
            </ModalComponent>
            <ModalComponent
                title="Xoá bác sĩ"
                open={isModalOpenDeleteMany}
                onOk={handleOkDeleteMany}
                onCancel={handleCancelDeleteMany}
                style={{ borderRadius: 0 }}
            >
                <LoadingComponent isLoading={isPendingDelete}>
                    <p>
                        Bạn có chắc chắn muốn <strong>xóa</strong> bác sĩ này không?
                    </p>
                </LoadingComponent>
            </ModalComponent>
            <Modal
                open={open}
                onOk={handleUploadAvatar}
                onCancel={() => {
                    hideModal();
                    setPreviewAvatar(null);
                    setSelectedFile(null);
                }}
                okText="Đổi Avatar"
                cancelText="Hủy"
                >
                <Image
                    src={
                    previewAvatar
                        ? URL.createObjectURL(previewAvatar) // ảnh vừa chọn
                        : `${import.meta.env.VITE_API_URL}${doctors?.data?.find((item) => item._id === rowSelected)?.user?.avatar}` // ảnh cũ
                    }
                    alt="Avatar"
                    width="100%"
                    height="100%"
                    fallback={img}
                />

                <Upload
                    showUploadList={false}
                    beforeUpload={(file) => {
                    setPreviewAvatar(file);     // hiện ảnh tạm thời
                    setSelectedFile(file);      // lưu để upload sau
                    return false; // Ngăn upload tự động
                    }}
                >
                    <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                </Upload>
            </Modal>
        </>
    );
};

export default Doctor;