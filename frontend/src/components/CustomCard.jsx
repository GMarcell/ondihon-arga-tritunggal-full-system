import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

function CustomCard({news, handleDelete}) {
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{news.title}</h2>
        <p>{news.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-square btn-outline btn-md btn-warning">
            <Link to={`/administrator/user-management/update-user/${news?.id}`}>
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
