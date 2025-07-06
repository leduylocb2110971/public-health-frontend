import React from "react";
import {
    FAQSectionContainer,
    FAQTitle,
    FAQList,
    FAQItem,
    Question,
    Answer
} from "./style";

const FAQComponent = () => {
    const faqData = [
        {
            question: "📌 Tôi có thể đặt lịch khám online không?",
            answer: "Có. Bạn có thể đặt lịch qua form liên hệ hoặc liên hệ hotline để được hướng dẫn chi tiết.",
        },
        {
            question: "⏰ Thời gian làm việc của trung tâm là khi nào?",
            answer: "Trung tâm làm việc từ 7:30 đến 17:00 các ngày thứ 2 đến thứ 7. Nghỉ chủ nhật.",
        },
        {
            question: "📂 Tôi có thể gửi hồ sơ khám bệnh qua email không?",
            answer: <>Hoàn toàn được. Gửi vào địa chỉ <a href="mailto:cskh@bvcrheci.vn">cskh@bvcrheci.vn</a>.</>,
        },
        {
            question: "📍 Tôi đến trung tâm bằng cách nào?",
            answer: "Trung tâm nằm tại đường 3/2, Xuân Khánh, Ninh Kiều, Cần Thơ. Bạn có thể đến bằng xe máy, xe buýt, hoặc taxi.",
        },
        {
            question: "📞 Tôi có thể liên hệ qua số điện thoại nào?",
            answer: "Bạn có thể gọi đến số (84-28) 3622 2022 để được hỗ trợ.",
        },
        {
            question: "🌐 Tôi có thể tìm thêm thông tin ở đâu?",
            answer: <>Bạn có thể truy cập website <a href="https://www.bvcrheci.vn" target="_blank" rel="noreferrer">www.bvcrheci.vn</a> để xem dịch vụ, bảng giá và tin tức mới nhất.</>,
        }
    ];
    return (
    <FAQSectionContainer>
      <FAQTitle>Câu hỏi thường gặp</FAQTitle>
      <FAQList>
        {faqData.map((faqData, index) => (
          <FAQItem key={index}>
            <Question>{faqData.question}</Question>
            <Answer>{faqData.answer}</Answer>
          </FAQItem>
        ))}
      </FAQList>
    </FAQSectionContainer>
  );
};
export default FAQComponent;