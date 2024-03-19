import React from "react";

function ArticlePreview(props) {
  const youtubeID = props?.video?.split("=")?.pop();

  return (
    <div className="w-full">
      <h3 className="font-bold text-brand-500 text-center text-md capitalize text-[33px]">
        {props?.title ?? "-"}
      </h3>
      <div className="p-3 flex justify-center items-center">
        <img
          src={
            props?.isOldData
              ? import.meta.env.VITE_API_BASE_URL + "/storage/" + props?.image
              : props?.image
          }
          className="max-h-96"
        />
      </div>
      <h3>{props?.desc ?? "-"}</h3>
      {props?.video && (
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
    </div>
  );
}

export default ArticlePreview;
