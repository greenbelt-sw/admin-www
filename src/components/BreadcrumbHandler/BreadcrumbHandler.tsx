import React from "react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

interface QueryParams {
  [key: string]: string;
}

const useQuery = (): QueryParams => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const queryParams: QueryParams = {};
  searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });

  return queryParams;
};

const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const BreadcrumbHandler: React.FC = () => {
  const queryParams = useQuery();
  const location = useLocation();
  const currentRoute = location.pathname;

  const routeParts = currentRoute.split("/");
  const breadcrumbText = capitalize(routeParts[1]);
  const breadcrumbLink = `/${routeParts[1]}`;

  return (
    <Breadcrumb
      spacing="8px"
      separator={<ChevronRightIcon color="gray.500" />}
      my={5}
    >
      <BreadcrumbItem>
        <BreadcrumbLink href={breadcrumbLink}>{breadcrumbText}</BreadcrumbLink>
      </BreadcrumbItem>

      {Object.entries(queryParams).map(([key, value]) => (
        <BreadcrumbItem key={key} isCurrentPage>
          <BreadcrumbLink href={`${breadcrumbLink}?${key}=${value}`}>
            {capitalize(key)} {value}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default BreadcrumbHandler;
