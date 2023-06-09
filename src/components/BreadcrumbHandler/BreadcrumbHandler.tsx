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
        <BreadcrumbLink href={"/dashboard"}>Dashboard</BreadcrumbLink>
      </BreadcrumbItem>

      {breadcrumbText !== "Dashboard" && (
        <BreadcrumbItem>
          <BreadcrumbLink href={breadcrumbLink}>
            {breadcrumbText}
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}

      {Object.entries(queryParams).map(([key, value], index) => (
        <BreadcrumbItem
          key={key}
          isCurrentPage={index === Object.entries(queryParams).length - 1}
        >
          <BreadcrumbLink
            href={
              index === 0
                ? `${breadcrumbLink}?${key}=${value}`
                : `${breadcrumbLink}?${Object.entries(queryParams)
                    .slice(0, index + 1)
                    .map(([k, v]) => `${k}=${v}`)
                    .join("&")}`
            }
          >
            {capitalize(key)} {value}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default BreadcrumbHandler;
