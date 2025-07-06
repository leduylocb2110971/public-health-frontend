import styled from "styled-components";

// Styled Components
export const HeaderContainer = styled.header`
    width: 100%;
    background-color: #2BB3A9; //Màu nền của cái thanh header
    padding: 5px 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    box-sizing: border-box; /* Để padding không làm tràn */
    /* Bù thêm padding-top nếu bị header che khi fixed */
    @media (max-width: 768px) {
        padding: 0; /* Giảm padding trên thiết bị nhỏ */
    }
  
`;

export const LogoSection = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    cursor: pointer;
    
`;

export const BrandTitle = styled.h3`
    font-weight: bold;
    font-size: 28px;
    color: #ffffff;// Màu của chữ logo
    margin: 0;
    font-family: "Poppins", sans-serif;
    /* text-transform: uppercase; */
    letter-spacing: 1px;
    @media (max-width: 768px) {
        font-size: 24px; // Giảm kích thước chữ trên thiết bị nhỏ
    }
`;

export const NavButtons = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 16px;
    height: 100%;
    flex: 1; // Cho phép phần này co giãn để chiếm không gian còn lại
    @media (max-width: 1024px) {
        flex-wrap: wrap;
        justify-content: center;
        gap: 12px;
    }
    @media (max-width: 768px) {
        display: none;
    }
`;
export const SearchWrapper = styled.div`
    flex: 1;
    min-width: 100px;
    max-width: 200px;
`;

export const PopupItem = styled.p`
    margin: 0;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 4px;
    background-color: ${(props) =>
        props.$isSelected ? "#f0f0f0" : "transparent"};
    color: ${(props) => (props.$isSelected ? "#1890ff" : "inherit")};
    &:not(:last-child) {
        border-bottom: 1px solid #f0f0f0;
    }
    &:hover {
        background-color: #f0f0f0;
        color: #6BCB77;
    }
`;
export const MobileMenuButton = styled.div`
    display: none;
    justify-content: flex-end;
    align-items: center;
    gap: 16px;
    height: 100%;
    @media (max-width: 768px) {
        display: flex;
    }
`;