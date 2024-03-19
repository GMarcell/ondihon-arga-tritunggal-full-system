import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

function CustomCard({ news, handleDelete }) {
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure>
        <img
          src={
            import.meta.env.VITE_API_BASE_URL + "/storage/" + news?.image_link
          }
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{news.title}</h2>
        <p>
          {news.description.length > 100
            ? news.description.substring(0, 100) + "..."
            : news.description}
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-square btn-outline btn-md btn-warning">
            <Link to={`/administrator/news-management/update-news/${news?.id}`}>
              <MdEdit size={20} />
            </Link>
          </button>
          <button
            className="btn btn-square btn-outline btn-md btn-error"
            onClick={() => handleDelete(news?.id)}
          >
            <MdDelete size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomCard;
