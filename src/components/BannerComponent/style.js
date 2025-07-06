import styled from "styled-components";
export const BannerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  margin-top : 66px;

  .swiper {
    height: 100%;
  }

  .swiper-slide {
    position: relative;
    background-size: cover;
    background-position: center;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.2); /* 👈 lớp mờ màu đen 40% */
    z-index: 1;
  }

  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    transform: translate(-50%, -50%);
    color: white;
    text-align: center;
    max-width: 700px;
    padding: 0 20px;
  }

  .swiper-button-prev,
  .swiper-button-next {
    color: white;
    z-index: 3;
  }

  .swiper-pagination-bullet {
    background: white;
    opacity: 0.7;
  }

  .swiper-pagination-bullet-active {
    background: #00AEEF;
  }
`;
