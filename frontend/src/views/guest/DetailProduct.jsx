import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client";

function DetailProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [ProductDetail, setProductDetail] = useState(null);

  const getProductInfo = (id) => {
    setIsLoading(true);
    axiosClient
      .get(`/getProductInfo/${id}`)
      .then(({ data }) => {
        setIsLoading(false)
        setProductDetail(data?.data);
      })
      .catch(() => setIsLoading(false));
  };

  useEffect(() => {
    getProductInfo(id);
  }, []);

  return (
    <div className="w-full h-full min-h-[30vh] bg-gray-200 p-4">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      ) : (
        <>
          <h3 className="font-bold text-brand-500 text-center text-md capitalize text-[33px] text-black">
            {ProductDetail?.title}
          </h3>
          <div className="p-3 flex justify-center items-center">
            <img
              src={
                import.meta.env.VITE_API_BASE_URL +
                "/storage/" +
                ProductDetail?.image_link
              }
              className="max-h-96"
            />
          </div>
          <h3 className="text-black">{ProductDetail?.description}</h3>
          <button
            className="btn btn-primary mt-5"
            onClick={() => navigate("/product/" + ProductDetail?.type)}
          >
            Back
          </button>
        </>
      )}
    </div>
  );
}

export default DetailProduct;
