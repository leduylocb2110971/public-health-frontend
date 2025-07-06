import React from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";

const BreadcrumbComponent = ({
  idNameMap = {}, // { id: displayName }, truyền từ ngoài
  customNameMap = {}, // map tên tĩnh ví dụ: { service: "Dịch vụ" }
}) => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter(Boolean);

  // Hàm kiểm tra ObjectId MongoDB
  const isObjectId = (str) => /^[a-f\d]{24}$/i.test(str);

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">
        <HomeOutlined />
      </Link>
    </Breadcrumb.Item>,
    ...pathSnippets.map((segment, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
      const isLast = index === pathSnippets.length - 1;

      // Ưu tiên dùng customNameMap nếu có
      if (customNameMap[segment]) {
        return (
          <Breadcrumb.Item key={url}>
            {isLast ? (
              <span>{customNameMap[segment]}</span>
            ) : (
              <Link to={url}>{customNameMap[segment]}</Link>
            )}
          </Breadcrumb.Item>
        );
      }

      // Nếu segment là id Mongo thì lấy từ idNameMap nếu có, hoặc default label
      if (isObjectId(segment)) {
        const name = idNameMap[segment];
        return (
           <Breadcrumb.Item key={url}>
                {isLast ? (
                    <span>{name}</span> // ID cuối → không có Link
                ) : (
                    <Link to={url}>{name}</Link> // ID ở giữa → có Link
                )}
            </Breadcrumb.Item>
        );
      }

      // Mặc định show segment text (có thể chỉnh thêm)
      return (
        <Breadcrumb.Item key={url}>
          {isLast ? <span>{segment}</span> : <Link to={url}>{segment}</Link>}
        </Breadcrumb.Item>
      );
    }),
  ];

  return <Breadcrumb style={{ marginBottom: 16 }}>{breadcrumbItems}</Breadcrumb>;
};

export default BreadcrumbComponent;
