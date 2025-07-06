import styled from "styled-components";
import { Input } from "antd";

const { Search } = Input;

export const InputContainer = styled(Search)`
    width: 100%;
    max-width: 700px;
    margin: 0 auto;

    .ant-input {
        height: 40px;
        border-radius: 25px 0 0 25px;
        font-size: 16px;
    }

    .ant-input-search-button {
        height: 40px;
        border-radius: 0 25px 25px 0;
        background-color:rgb(177, 91, 104); /* Xanh ngọc */
        border-color:#2BB3A9; /* Đảm bảo viền cùng màu với nền */
        font-weight: bold;
        

        &:hover {
            background-color: #6BCB77; /* Xanh lá */
            border-color: #6BCB77;
        }
    }

    .ant-input-group-addon {
        overflow: hidden; /* tránh cắt tròn bị xấu */
    }
`;