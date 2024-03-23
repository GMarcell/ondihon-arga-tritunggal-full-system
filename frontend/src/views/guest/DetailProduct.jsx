import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client";

function DetailProduct(props) {
  console.log(props);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [ProductDetail, setProductDetail] = useState(null);
  const [youtubeID, setYoutubeID] = useState(null);

  const getProductInfo = (id) => {
    setIsLoading(true);
    axiosClient
      .get(`/get${props?.type ?? "Product"}Info/${id}`)
      .then(({ data }) => {
        setIsLoading(false);
        setProductDetail(data?.data);
        setYoutubeID(
          data.data.video_link == undefined
            ? undefined
            : data.data.video_link?.split("=")?.pop()
        );
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
          {ProductDetail?.video_link && (
            <div className="flex justify-center items-center mt-3">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeID}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
                className="w-2/3 max-w-xl"
              />
            </div>
          )}
          <button
            className="btn btn-primary mt-5"
            onClick={() =>
              props?.type?.toLowerCase() == "product"
                ? navigate(`/product/` + ProductDetail?.type)
                : navigate(`/news-article`)
            }
          >
            Back
          </button>
        </>
      )}
    </div>
  );
}

export default DetailProduct;
