import styled from "styled-components";
import Slider from "react-slick";

export const WrapperSliderStyle = styled(Slider)`
    max-width: 1500px; // Chiều rộng tối đa của slider, không cho nó bị quá rộng dẫn đến các phần tử bị giãn ra quá mức
    margin: 0 auto;
    & .slick-arrow.slick-prev,
    & .slick-arrow.slick-next {
        z-index: 10;
        top: 50%;
        transform: translateY(-50%);

        &::before {
            font-size: 30px;
            color: #ccc;
            transition: color 0.3s ease;
        }

        &:hover::before {
            color: #6BCB77; /* Màu của mũi tên khi hover */
        }
    }

    & .slick-arrow.slick-prev {
        left: 10px;
    }

    & .slick-arrow.slick-next {
        right: 10px;
    }

    & .slick-slide {
        min-width: 0; /* ⚠️ Sửa lại */
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
    }

    & .slick-dots {
        bottom: -25px;

        li button:before {
            font-size: 10px;
            color: #ccc;
        }

        li.slick-active button:before {
            color: #6BCB77; /* Màu của chấm đang active */
        }
    }

    /* ✅ Responsive cho mobile */
    @media (max-width: 576px) {
        & .slick-arrow.slick-prev,
        & .slick-arrow.slick-next {
            display: none; /* Ẩn mũi tên trên mobile để không cấn UI */
        }

        & .slick-slide {
            padding: 0 5px;
            min-width: 0; /* Đảm bảo không bị tràn */
        }
    }
`;