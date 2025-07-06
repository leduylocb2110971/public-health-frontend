import React, { useState } from "react";
import { Pagination } from "antd";
import {DoctorGrid} from "../../pages/UserPage/MedicalStaffPage/style"; // Adjust the import path as needed

const PaginationComponent = ({ data = [], pageSize = 4, renderItem }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * pageSize;
  const currentData = data.slice(startIndex, startIndex + pageSize);

  return (
    <>
      <DoctorGrid>
        {renderItem && currentData.map(renderItem)}
      </DoctorGrid>

      {data.length > pageSize && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={data.length}
            onChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            showSizeChanger={false}
          />
        </div>
      )}
    </>
  );
};

export default PaginationComponent;
