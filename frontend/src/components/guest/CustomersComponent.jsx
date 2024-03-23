import { Typography } from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
import langContext from "../../hooks/langContext";
import { customerWord } from "../../bilinggual";
import { CLIENTSName } from "../../constants";
import axiosClient from "../../axios-client";

export default function CustomersComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [allCustomers, setAllCustomers] = useState([]);

  const getCustomers = () => {
    setIsLoading(true);
    axiosClient
      .get("/getAllCustomer", {
        params: {
          page: page,
          per_page: 12,
        },
      })
      .then(({ data }) => {
        setIsLoading(false);
        setAllCustomers(data.data);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const { language } = useContext(langContext);
  return (
    <section className="px-8 py-28 bg-gray-200" id="clients">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      ) : (
        <div className="container mx-auto text-center">
          <Typography
            variant="h2"
            color="blue-gray"
            className="mb-8 !leading-tight text-4xl md:text-6xl text-center text-[#1C3A96] font-bold"
            placeholder=""
          >
            {customerWord[language]}
          </Typography>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {allCustomers?.map((item, idx) => (
              <img
                key={idx}
                alt={item?.company_name}
                width={1500}
                height={1500}
                className="w-52"
                src={
                  import.meta.env.VITE_API_BASE_URL +
                  "/storage/" +
                  item?.image_link
                }
              />
            ))}
            {/* {CLIENTSName.map((logo, key) => (
              <img
                key={key}
                alt={logo}
                width={1500}
                height={1500}
                className="w-52"
                src={`/logos/${logo}.png`}
              />
            ))} */}
          </div>
        </div>
      )}
    </section>
  );
}
