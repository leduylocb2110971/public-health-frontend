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
import { Flex, Form, Input, Select, Upload, Table, Space, Pagination, Popover } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as NewsService from "../../services/NewsService"
import * as NewsTypeService from "../../services/NewsTypeService"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const News = () => {
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
    const queryGetAllNewsTypes = useQuery({
        queryKey: ["getAllNewsTypes"],
        queryFn: NewsTypeService.getAllNewsTypes,
        keepPreviousData: true,
    }) 
    const mutationAddNews = useMutation({
        mutationFn: NewsService.createNews,
        onSuccess: (data) => {
            Message.success(data.message);
            setIsOpenAdd(false);
            formCreate.resetFields();  
        },
        onError: (error) => {
            Message.error(error.message);
        },
    });
    const mutationDeleteNews = useMutation({
        mutationFn: NewsService.deleteNews,
         onSuccess: (id) => {
            Message.success(id.message);
            setIsModalOpenDelete(false);
            formCreate.resetFields();
        },
        onError: (error) => {
            Message.error(error.message);
        },
    });
    const mutationDeleteManyNews = useMutation({
        mutationFn: NewsService.deleteManyNews,
         onSuccess: (id) => {
            Message.success(id.message);
            setIsModalOpenDeleteMany(false);
            formCreate.resetFields();
        },
        onError: (error) => {
            Message.error(error.message);
        },
    });
    const mutationUpdateNews = useMutation({
            mutationFn: async ({ id, data }) => {
                return await NewsService.updateNews(id, data);
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
    const queryGetAllNews = useQuery({
        queryKey: ["getAllNews", pagination],
        queryFn: () =>
            NewsService.getAllNews(
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
            title: "Tên tin tức",
            dataIndex: "title",
            key: "title",
            ...getColumnSearchProps("title"),
            sorter: (a, b) => a.title.length - b.title.length,
            render: (text) => (
                <Popover content={<div style={{ maxWidth: 400, whiteSpace: "pre-wrap" }}>{text}</div>} title="Tên tin tức">
                    <span
                        style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: 300,
                            cursor: "pointer",
                        }}
                    >
                        {text}
                    </span>
                </Popover>
            ),
        },
        {
            title: "Loại tin tức",
            dataIndex: "NewsType",
            key: "NewsType",
            ...getColumnSearchProps("NewsType"),
            sorter: (a, b) => a.NewsType?.length - b.NewsType?.length,
        },
        {
            title: "Nội dung",
            dataIndex: "content",
            key: "content",
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
            title: "Hình ảnh",
            dataIndex: "image",
            key: "image",
        },

        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <ButtonComponent
                        size="small"
                        type="primary"
                        icon={<EditOutlined style={{ fontSize: "15px" }} />}
                        onClick={() => handleEditNews(record.key)}
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
    const { data: News, isLoading: isLoadingNews } = queryGetAllNews;
    const {data: NewsTypes, isLoading: isLoadingNewsType } = queryGetAllNewsTypes;
    pagination.total = News?.total || 0;
    const dataTable = News?.data.map((item, index) => {
        return {
            key: item._id,
            index: index + 1,
            title: item.title,
            NewsType: item.type?.name,
            content: item.content,
            image: (
                <img
                    src={`${import.meta.env.VITE_API_URL}${item.image}`}
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
    const { isPending: isPedingAdd } = mutationAddNews;
    const { isPending: isPendingDelete } = mutationDeleteNews;
    const { isPending: isPendingUpdate } = mutationUpdateNews;
    const { isPending: isPendingDeleteMany } = mutationDeleteManyNews;;
    const handleAddNews = () => {
        formCreate.validateFields().then((values) => {
            //  values.image là mảng file (do maxCount=1 thì vẫn là mảng 1 phần tử)
            const data = new FormData();
            data.append("title", values.title);
            data.append("content", values.content);
            data.append("type", values.newsTypeId);

            const file = values.image?.[0]?.originFileObj;
            if (file && file instanceof File) {
                data.append("image", file);
            }
            mutationAddNews.mutate(data, {
                onSettled: () => {
                    queryGetAllNews.refetch();
                },
            });
        });
    };
    const handleOkDelete = () => {
        mutationDeleteNews.mutate(
            rowSelected,
            {
                onSettled: () => {
                    queryGetAllNews.refetch();
                },
            },
        );
    };
    const handleOkDeleteMany = () => {
        mutationDeleteManyNews.mutate({ids: selectedRowKeys},
        {
            onSettled: () => {
                queryGetAllNews.refetch();
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
        const data= new FormData();
        data.append("title", values.title);
        data.append("content", values.content);
        data.append("type", values.newsTypeId);
        const file = values.image?.[0]?.originFileObj;
        if (file && file instanceof File) {
            data.append("image", file);
        }
        mutationUpdateNews.mutate(
            { id: rowSelected, data: data },
            {
                onSettled: () => {
                    queryGetAllNews.refetch();
                },
            },
        );
    };
    const handleEditNews = async (id) => {
        const news = News?.data?.find((item) => item._id === id);
        //Chỗ này hiện sẵn dữ liệu khi chỉnh sửa
        formUpdate.setFieldsValue({
            title: news?.title,
            content: news?.content,
            newsTypeId: news?.type?._id,
            image: [
                {
                    uid: "-1",
                    name: news?.image,
                    status: "done",
                    url: `${import.meta.env.VITE_API_URL}${news?.image}`,
                },
            ],
        });
        setIsDrawerOpen(true);
    };
    const handleCloseAddNews = () => {
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
                        Xoá tất cả
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
            <LoadingComponent isLoading={isLoadingNews} delay={200}>
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
                        showTotal: (total, range) => `Tổng ${total} tin tức`,
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
                    title="Thêm mới Loại tin tức"
                    open={isOpenAdd}
                    onOk={handleAddNews}
                    onCancel={handleCloseAddNews}
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
                            label="Tên tin tức"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên!",
                                },
                            ]}
                        >
                            <Input
                                name="title"
                                placeholder="Nhập vào tên tin tức"
                            />
                        </Form.Item>
                         <Form.Item
                            label="Loại tin tức"
                            name="newsTypeId"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng Loại tin tức!",
                                },
                            ]}
                        >
                            <Select
                                name="newsTypeId"
                                showSearch
                                placeholder="Chọn Loại tin tức"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
                            >
                                {NewsTypes &&
                                    NewsTypes?.data?.map((item) => (
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
                            label="Nội dung"
                            name="content"
                            rules={[
                                {
                                    message: "Vui lòng nhập nội dung!",
                                },
                            ]}
                        >
                            <CKEditor
                                editor={ClassicEditor}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    formCreate.setFieldsValue({ content: data });
                                }}
                                data={formCreate.getFieldValue("content") || ""}
                                config={{
                                    placeholder: "Nhập nội dung chi tiết tại đây...",
                                }}
                            />
                        </Form.Item>

                        <Form.Item
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


                        </Form.Item>
                    </Form>
                </ModalComponent>
            </LoadingComponent>
            <ModalComponent
                title="Xoá Loại tin tức"
                open={isModalOpenDelete}
                onOk={handleOkDelete}
                onCancel={handleCancelDelete}
                style={{ borderRadius: 0 }}
            >
                <LoadingComponent isLoading={isPendingDelete}>
                    <p>
                        Bạn có chắc chắn muốn <strong>xóa</strong> tin tức
                        này không?
                    </p>
                </LoadingComponent>
            </ModalComponent>
            <ModalComponent
                title="Xoá Loại tin tức"
                open={isModalOpenDeleteMany}
                onOk={handleOkDeleteMany}
                onCancel={handleCancelDeleteMany}
                style={{ borderRadius: 0 }}
            >
                <LoadingComponent isLoading={isPendingDeleteMany}>
                    <p>
                        Bạn có chắc chắn muốn <strong>xóa</strong> nhiều Loại tin tức
                        này không?
                    </p>
                </LoadingComponent>
            </ModalComponent>
            <DrawerComponent
                title="Chi tiết Loại tin tức"
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
                            label="Tên tin tức"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên tin tức!",
                                },
                            ]}
                        >
                            <Input name="title" />
                        
                        </Form.Item>
                        <Form.Item
                            label="Loại tin tức"
                            name="newsTypeId"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng Loại tin tức!",
                                },
                            ]}
                        >
                            <Select
                                name="newsTypeId"
                                showSearch
                                placeholder="Chọn Loại tin tức"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
                            >
                                {NewsTypes &&
                                    NewsTypes?.data?.map((item) => (
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
                            label="Nội dung"
                            name="content"
                            rules={[
                                {
                                    message: "Vui lòng nhập nội dung!",
                                },
                            ]}
                        >
                            <CKEditor
                                editor={ClassicEditor}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    formUpdate.setFieldsValue({ content: data });
                                }}
                                data={formUpdate.getFieldValue("content") || ""}
                                config={{
                                    placeholder: "Nhập nội dung chi tiết tại đây...",
                                }}
                            />
                        </Form.Item>

                        <Form.Item
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

                        </Form.Item>
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
export default News;