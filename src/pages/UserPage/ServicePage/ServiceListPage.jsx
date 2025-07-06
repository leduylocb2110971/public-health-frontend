import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import * as ServiceService from "../../../services/ServiceService";
import * as ServiceTypeService from "../../../services/ServiceTypeService";
import { useParams, useNavigate } from 'react-router-dom';
import BannerComponent from '../../../components/BannerComponent/BannerComponent';
import ServiceCardComponent from '../../../components/CardComponent/ServiceCardComponent';
import BreadcrumbComponent from '../../../components/BreadcrumbComponent/BreadcrumbComponent';
import {
  WrapperSection,
  ServiceGroup,
  GroupHeading,
  ServiceGrid,
} from './style';
import { Divider } from 'antd';

const ServiceListPage = () => {
  const { serviceTypeId } = useParams();
  const navigate = useNavigate();

  const queryGetServiceType = useQuery({
    queryKey: ['getServiceType', serviceTypeId],
    queryFn: () => ServiceTypeService.getServiceType(serviceTypeId),
  });

  const queryGetAllServicesByType = useQuery({
    queryKey: ['getAllServicesByType', serviceTypeId],
    queryFn: () => ServiceService.getServiceByType(serviceTypeId),
  });

  const { data: serviceResponse, isLoading: isLoadingServices } = queryGetAllServicesByType;
  const { data: serviceTypeResponse, isLoading: isLoadingServiceType } = queryGetServiceType;

  const services = serviceResponse?.data || [];
  const serviceType = serviceTypeResponse?.data;

  const [selectedService, setSelectedService] = useState(null);

  if (isLoadingServices || isLoadingServiceType) {
    return <div>Loading...</div>;
  }
  const idNameMap = {
    [serviceTypeId]: serviceType.name,
  };
  const customNameMap = {
    service: "Dịch vụ",
    serviceType: serviceType.name,
  };

  return (
    <>
    <WrapperSection>
      <ServiceGroup>
        <BreadcrumbComponent idNameMap={idNameMap} customNameMap={customNameMap} />
        <h2 style={{ textAlign: "center" }}>{ serviceType.name }</h2>
        <Divider/>
          <ServiceGrid>
            {services.map((item) => (
              <ServiceCardComponent
                key={item._id}
                image={item.image}
                name={item.name}  
                content={item.content}
                onClick={() => navigate(`/service/${serviceTypeId}/${item._id}`)}
              />
            ))}
          </ServiceGrid>

      </ServiceGroup>
        
            
          
      </WrapperSection>
    </>
  )

};

export default ServiceListPage;
