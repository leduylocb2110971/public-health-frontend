import styled from "styled-components";
import { Layout } from "antd";

const { Sider} = Layout;
export const PopupItem = styled.p`
    margin: 0;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 4px;
    &:not(:last-child) {
        border-bottom: 1px solid #f0f0f0;
    }
    &:hover {
        background-color: #f0f0f0;
        color: #6BCB77;
    }
`;

export const CustomSider = styled(Sider)`
    background-color: #1E7670;
    .ant-menu-item-selected {
        background-color:rgb(6, 57, 12) !important;
        color: #6BCB77 !important;
    }
    .ant-menu-item:hover {
        background-color: rgb(6, 57, 12) !important;
        color: #6BCB77 !important;
    }
    .ant-menu-title-content {
        color: #ffff !important;
    }
        
    .ant-menu-submenu-title {
        color: #6BCB77 !important;
    }
    .ant-menu-submenu-arrow {
        color: #6BCB77 !important;
    }
    .ant-menu-item {
        color: #6BCB77 !important;
    }
        
`;