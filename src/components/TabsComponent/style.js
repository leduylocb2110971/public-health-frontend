import styled from "styled-components";
import { Tabs } from "antd";
export const CustomTabs = styled(Tabs)`
    & .ant-tabs-nav-list {
        margin: 0;
    }
    & .ant-tabs-tab {
        font-size: 16px;
        font-weight: bold;
        color: #6BCB77;
        padding: 8px 30px;
    }
`;