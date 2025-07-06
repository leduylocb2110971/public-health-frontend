import React from "react";
import { useState, useRef } from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import DrawerComponent from "../../components/DrawerComponent/DrawerComponent";
import {
    DeleteOutlined,
    PlusCircleFilled,
    ExportOutlined,
    ImportOutlined,
    UploadOutlined,
    EditOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import * as Message from "../../components/Message/Message";
import { Flex, Form, Input, Upload, Table, Space, Pagination } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as NewsTypeService from "../../services/NewsTypeService"

const NewsType = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [rowSelected, setRowSelected] = useState(null);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [isModalOpenDeleteMany, setIsModalOpenDeleteMany] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [formCreate] = Form.useForm();
    const [formUpdate] = Form.useForm();
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 8,
        total: 0,
    });
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedKeys, selectedRows) => {
            setSelectedRowKeys(selectedKeys);
        },
        type: "checkbox",
    };
    const mutationAddNewsType = useMutation({
        mutationFn: NewsTypeService.createNewsType,
        onSuccess: (data) => {
                Message.success(data.message);
                setIsOpenAdd(false);
                formCreate.resetFields();
        },
        onError: (error) => {
            Message.error(error.message);
        },
    });
    const mutationDeleteNewsType = useMutation({
        mutationFn: NewsTypeService.deleteNewsType,
         onSuccess: (id) => {
                Message.success(id.message);
                setIsModalOpenDelete(false);
                formCreate.resetFields();
        },
        onError: (error) => {
            Message.error(error.message);
        },
    });
    const mutationDeleteManyNewsType = useMutation({
        mutationFn: NewsTypeService.deleteManyNewsTypes,
         onSuccess: (id) => {
                Message.success(id.message);
                setIsModalOpenDeleteMany(false);
                formCreate.resetFields();
        },
        onError: (error) => {
            Message.error(error.message);
        },
    });
    const mutationUpdateNewsType = useMutation({
            mutationFn: async ({ id, formData }) => {
                return await NewsTypeService.updateNewsType(id, formData);
            },
            onSuccess: (data) => {
                Message.success(data.message);
                setIsDrawerOpen(false);
                formCreate.resetFields();
            },
            onError: (error) => {
                Message.error(error.message);
            },
        }); 
    const queryGetAllNewsTypes = useQuery({
        queryKey: ["getAllNewsTypes", pagination],
        queryFn: () =>
            NewsTypeService.getAllNewsTypes(
                pagination.current,
                pagination.pageSize,
            ),
        keepPreviousData: true,
    });
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
                        onClick={() =>
                            clearFilters && handleReset(clearFilters)
                        }
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
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
            sorter: (a, b) => a.index - b.index,
        },
        {
            title: "Tên loại tin tức",
            dataIndex: "name",
            key: "name",
            ...getColumnSearchProps("name"),
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
            // render: (text) => text.length > 60 ? text.substring(0, 50) + "..." : (text || "Không có mô tả"),
        },
        // {
        //     title: "Hình ảnh",
        //     dataIndex: "image",
        //     key: "image",
        // },

        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <ButtonComponent
                        size="small"
                        type="primary"
                        icon={<EditOutlined style={{ fontSize: "15px" }} />}
                        onClick={() => handleEditNewsType(record.key)}
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
    const { data: NewsTypes, isLoading } = queryGetAllNewsTypes;
    pagination.total = NewsTypes?.total || 0;
    const dataTable = NewsTypes?.data.map((item, index) => {
        return {
            key: item._id,
            index: index + 1,
            name: item.name,
            description: item.description,
            image: (
                <img
                    src={`${import.meta.env.VITE_APP_BACKEND_URL}${item.image}`}
                    alt={item.name}
                    style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "5px",
                    }}
                />
            ),
        };
    });
    const { isPending: isPedingAdd } = mutationAddNewsType;
    const { isPending: isPendingDelete } = mutationDeleteNewsType;
    const { isPending: isPendingUpdate } = mutationUpdateNewsType;
    const { isPending: isPendingDeleteMany } = mutationDeleteManyNewsType;
    const handleAddNewsType = () => {
        formCreate.validateFields().then((values) => {
            //  values.image là mảng file (do maxCount=1 thì vẫn là mảng 1 phần tử)
            const data = {
                name: values.name,
                description: values.description
            }
            mutationAddNewsType.mutate(data, {
                onSettled: () => {
                    queryGetAllNewsTypes.refetch();
                },
            });
        });
    };
    const handleOkDelete = () => {
        mutationDeleteNewsType.mutate(
            rowSelected ,
            {
                onSettled: () => {
                    queryGetAllNewsTypes.refetch();
                },
            },
        );
    };
    const handleOkDeleteMany = () => {
        mutationDeleteManyNewsType.mutate(
        {ids: selectedRowKeys},
        {
            onSettled: () => {
                queryGetAllNewsTypes.refetch();
                },
            },
        )
    }
    const handleCancelDeleteMany = () => {
        setIsModalOpenDeleteMany(false);
    }
    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    };
    const handleOnUpdateUser = (values) => {
        const formData = {
            name: values.name,
            description: values.description
        }

        mutationUpdateNewsType.mutate(
            { id: rowSelected, formData: formData },
            {
                onSettled: () => {
                    queryGetAllNewsTypes.refetch();
                },
            },
        );
    };
    const handleEditNewsType = async (id) => {
        const res = await NewsTypeService.getNewsType(id);
        if (res?.status == "error") {
            Message.error(res?.message);
            return;
        }
        formUpdate.setFieldsValue({
            name: res?.data?.name,
            description: res?.data?.description,
            image: [
                {
                    uid: "-1",
                    name: res?.data?.image,
                    status: "done",
                    url: `${import.meta.env.VITE_APP_BACKEND_URL}${res?.data?.image}`,
                },
            ],
        });
        setIsDrawerOpen(true);
    };
    const handleCloseAddNewsType = () => {
        setIsOpenAdd(false);
    };
    const handleChangePage = (page, pageSize) => {
        setPagination({
            current: page,
            pageSize: pageSize,
        });
    };
return (
        <>
            <Flex
                gap="middle"
                align="center"
                justify="space-between"
                style={{ marginBottom: "20px", flexWrap: "wrap" }}
            >
                <Flex
                    gap="middle"
                    style={{
                        flexWrap: "wrap",
                        flex: "1 1 300px", // cho responsive
                        justifyContent: "flex-start",
                    }}
                >
                    <ButtonComponent
                        size="small"
                        disabled={selectedRowKeys.length == 0}
                        icon={<DeleteOutlined />}
                        onClick={() => setIsModalOpenDeleteMany(true)}
                        danger
                        style={{ minWidth: "120px" }}
                    >
                        Xoá nhiều
                    </ButtonComponent>
                    <ButtonComponent
                        size="small"
                        icon={<PlusCircleFilled></PlusCircleFilled>}
                        type="primary"
                        onClick={() => setIsOpenAdd(true)}
                        style={{ minWidth: "120px" }}
                    >
                        Thêm mới
                    </ButtonComponent>
                </Flex>
                <Flex
                    gap="middle"
                    style={{
                        flexWrap: "wrap",
                        flex: "1 1 300px", // cho responsive
                        justifyContent: "flex-end",
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
            <LoadingComponent isLoading={isLoading} delay={200}>
                <Table
                    rowSelection={rowSelection}
                    rowKey={"key"}
                    columns={columns}
                    scroll={{ x: "max-content" }}
                    dataSource={dataTable}
                    locale={{ emptyText: "Không có dữ liệu" }}
                    pagination={{
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        position: ["bottomCenter"],
                        showTotal: (total, range) => `Tổng ${total} loại tin tức`,
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
            <LoadingComponent isLoading={isPedingAdd}>
                <ModalComponent
                    title="Thêm mới loại tin tức"
                    open={isOpenAdd}
                    onOk={handleAddNewsType}
                    onCancel={handleCloseAddNewsType}
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
                            label="Tên loại tin tức"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên!",
                                },
                            ]}
                        >
                            <Input
                                name="name"
                                placeholder="Nhập vào tên loại tin tức"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Mô tả"
                            name="description"
                            rules={[
                                {
                                    message: "Vui lòng nhập mô tả!",
                                },
                            ]}
                        >
                            <Input.TextArea
                                rows={4}
                                placeholder="Nhập mô tả chi tiết tại đây..."
                            />
                        </Form.Item>

                        {/* <Form.Item
                            label="Ảnh"
                            name="image"
                            valuePropName="fileList"
                            getValueFromEvent={(e) =>
                                Array.isArray(e) ? e : e && e.fileList
                            }

                        >


                            <Upload
                                name="file"
                                beforeUpload={() => false}
                                maxCount={1}
                                accept=".jpg, .jpeg, .png, .gif"

                            >
                                <ButtonComponent icon={<UploadOutlined />}>
                                    Chọn file
                                </ButtonComponent>
                            </Upload>


                        </Form.Item> */}
                    </Form>
                </ModalComponent>
            </LoadingComponent>
            <ModalComponent
                title="Xoá loại tin tức"
                open={isModalOpenDelete}
                onOk={handleOkDelete}
                onCancel={handleCancelDelete}
                style={{ borderRadius: 0 }}
            >
                <LoadingComponent isLoading={isPendingDelete}>
                    <p>
                        Bạn có chắc chắn muốn <strong>xóa</strong> loại tin tức
                        này không?
                    </p>
                </LoadingComponent>
            </ModalComponent>
            <ModalComponent
                title="Xoá loại tin tức"
                open={isModalOpenDeleteMany}
                onOk={handleOkDeleteMany}
                onCancel={handleCancelDeleteMany}
                style={{ borderRadius: 0 }}
            >
                <LoadingComponent isLoading={isPendingDeleteMany}>
                    <p>
                        Bạn có chắc chắn muốn <strong>xóa</strong> nhiều loại tin tức
                        này không?
                    </p>
                </LoadingComponent>
            </ModalComponent>
            <DrawerComponent
                title="Chi tiết loại tin tức"
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
                        onFinish={handleOnUpdateUser}
                        autoComplete="off"
                        form={formUpdate}
                    >
                        <Form.Item
                            label="Tên loại tin tức"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên loại tin tức!",
                                },
                            ]}
                        >
                            <Input name="name" />
                        </Form.Item>
                        <Form.Item
                            label="Mô tả"
                            name="description"
                            rules={[
                                {
                                    message: "Vui lòng nhập mô tả!",
                                },
                            ]}
                        >
                            <Input.TextArea
                                name="description"
                                rows={4}
                                placeholder="Nhập mô tả chi tiết tại đây..."
                            />
                        </Form.Item>

                        {/* <Form.Item
                            label="Ảnh"
                            name="image"
                            valuePropName="fileList"
                            getValueFromEvent={(e) =>
                                Array.isArray(e) ? e : e && e.fileList
                            }
                        >
                            <Upload
                                name="file"
                                beforeUpload={() => false}
                                maxCount={1}
                                accept=".jpg, .jpeg, .png, .gif"

                            >
                                <ButtonComponent icon={<UploadOutlined />}>
                                    Chọn file
                                </ButtonComponent>
                            </Upload>

                        </Form.Item> */}
                        <Form.Item
                            label={null}
                            wrapperCol={{ offset: 20, span: 4 }}
                        >
                            <Flex gap="middle">
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
                            </Flex>
                        </Form.Item>
                    </Form>
                </LoadingComponent>
            </DrawerComponent>
        </>
    );
};
export default NewsType;