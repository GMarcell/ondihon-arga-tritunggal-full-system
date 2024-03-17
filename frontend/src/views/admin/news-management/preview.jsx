import React from "react";

function NewsPreview(props) {
  const youtubeID = props?.video?.split('=')?.pop()

  return (
    <div className="w-full">
      <h3 className="font-bold text-brand-500 text-center text-md capitalize text-[33px]">{props?.title ?? "-"}</h3>
      <div className="p-3">
      <img src={props?.image} />
      </div>
      <h3>{props?.desc ?? "-"}</h3>
      {
        props?.video && (
          <div className="flex justify-center items-center mt-3">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeID}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
        )
      }
    </div>
  );
}

export default NewsPreview;
