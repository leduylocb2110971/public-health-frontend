import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from 'react-router-dom';
import BannerComponent from '../../../components/BannerComponent/BannerComponent';
import * as DepartmentService from '../../../services/DepartmentService';
import * as PositionService from '../../../services/PositionService';
import * as DoctorService from '../../../services/DoctorService';
import CardDoctorComponent from '../../../components/CardDoctorComponent/CardDoctorComponent';
import FillterComponent from '../../../components/FillterComponent/FillterComponent';
import PaginationComponent from '../../../components/PaginationComponent/PaginationComponent';
import { Divider, Flex} from 'antd';
import {
    DoctorSection,
    SectionHeading,
    DoctorGrid,
    PageContent,
    FilterSidebar,
    DoctorListWrapper
}from './style';

const MedicalStaffPage = () => {
    // Lấy danh sách bác sĩ từ API
    const queryGetAllDoctors = useQuery({
        queryKey: ['getAllDoctors'],
        queryFn: () => DoctorService.getAllDoctors(),
    });

    // Lấy danh sách chuyên khoa từ API
    const queryGetAllSpecialties = useQuery({
        queryKey: ['getAllSpecialties'],
        queryFn: () => DepartmentService.getAllDepartments(),
    });
    // Lấy danh sách chức vụ từ API
    const queryGetAllPositions = useQuery({
        queryKey: ['getAllPositions'],
        queryFn: () => PositionService.getAllPositions(),
    });

    const { data: doctorsResponse, isLoading: isLoadingDoctors } = queryGetAllDoctors;
    const doctors = doctorsResponse?.data || [];
    const { data: specialtiesResponse, isLoading: isLoadingSpecialties } = queryGetAllSpecialties;
    const specialties = specialtiesResponse?.data || [];
    const { data: positionsResponse, isLoading: isLoadingPositions } = queryGetAllPositions;
    const positions = positionsResponse?.data || [];

    const navigate = useNavigate();
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedSpecialty, setSelectedSpecialty] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState([]);
    if (isLoadingDoctors) {
        return <div>Loading...</div>;
    }

    //Lọc danh sách bác sĩ theo chuyên khoa và chức vụ đã chọn
    const filteredDoctors = doctors.filter((doctor) => {
        const matchesSpecialty = selectedSpecialty.length === 0 || selectedSpecialty.includes(doctor.department?._id);
        const matchesPosition = selectedPosition.length === 0 || selectedPosition.includes(doctor.position?._id);
        return matchesSpecialty && matchesPosition;
    });
    console.log("doctor", doctors);
    return (
  <>  
    <DoctorSection>
      <SectionHeading>Đội ngũ y tế</SectionHeading>
      <PageContent>
        <FilterSidebar>
          <FillterComponent
            list={specialties}
            selected={selectedSpecialty}
            onChange={(value) => setSelectedSpecialty(value)}
            isLoading={isLoadingSpecialties}
            title="Lọc theo chuyên khoa"
          />
          <Divider/>
          <FillterComponent
            list={positions}
            selected={selectedPosition}
            onChange={(value) => setSelectedPosition(value)}
            isLoading={isLoadingPositions}
            title="Lọc theo chức vụ"
          />
        </FilterSidebar>
        <DoctorListWrapper>
          <PaginationComponent
            data={filteredDoctors}
            pageSize={6} // số bác sĩ mỗi trang
            renderItem={(doctor) => (
              <CardDoctorComponent
                key={doctor._id}
                doctor={doctor}
                onClick={() => navigate(`/medical-staff/${doctor._id}`)}
              />
            )}
          />
        </DoctorListWrapper>
      </PageContent>
    </DoctorSection>
  </>
);
}
export default MedicalStaffPage;

