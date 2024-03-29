import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

function CustomCard({
  item,
  handleDelete,
  menuName,
  fromAdmin = true,
  detailLink,
}) {
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure className="flex justify-center p-3 items-center">
        <img
          src={
            import.meta.env.VITE_API_BASE_URL + "/storage/" + item?.image_link
          }
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item?.title ?? item?.company_name}</h2>
        <p>
          {item.description.length > 100
            ? item.description.substring(0, 100) + "..."
            : item.description}
        </p>
        <div className="card-actions justify-end mt-3">
          {fromAdmin ? (
            <>
              <button className="btn btn-square btn-outline btn-md btn-warning">
                <Link
                  to={`/administrator/${menuName}-management/update-${menuName}/${item?.id}`}
                >
                  <MdEdit size={20} />
                </Link>
              </button>
              <button
                className="btn btn-square btn-outline btn-md btn-error"
                onClick={() => handleDelete(item?.id)}
              >
                <MdDelete size={20} />
              </button>
            </>
          ) : (
            <button className="btn btn-outline btn-md btn-warning" onClick={() => console.log(detailLink)}>
              <Link to={detailLink}>Read More</Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomCard;
