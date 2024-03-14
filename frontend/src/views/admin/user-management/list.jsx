import React, { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { useStateContext } from "../../../hooks/stateContext";
import Notification from "../../../components/Notification";

function UserManagementList() {
  const [isLoading, setisLoading] = useState(false);
  const [users, setusers] = useState([]);

  const { notification, setNotification } = useStateContext();

  const onClickDelete = (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    axiosClient.delete(`/users/${userId}`).then(() => {
      setNotification("User was successfully deleted");
      getUsers();
    });
  };

  const getUsers = () => {
    setisLoading(true);
    axiosClient
      .get("/users")
      .then(({ data }) => {
        setisLoading(false);
        setusers(data.data);
      })
      .catch(() => {
        setisLoading(false);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="w-full h-fit">
      {notification != "" && (
        <div className="my-3">
          <Notification type="success" alertText={notification} />
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      ) : (
        <>
          <div className="flex justify-end mb-3">
            <button className="btn bg-[#0A055B] btn-md">
              <Link to="/administrator/user-management/create">Add New</Link>
            </button>
          </div>
          <div className="overflow-x-auto bg-slate-600 rounded-sm">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((el, idx) => (
                  <tr className="hover" key={idx}>
                    <th>{idx + 1}</th>
                    <td>{el.name}</td>
                    <td>{el.email}</td>
                    <td>
                      <button className="btn btn-square btn-outline btn-sm btn-warning mr-4">
                        <Link to={`/administrator/user-management/${el.id}`}>
                        <MdEdit size={20} />
                        </Link>
                      </button>
                      <button className="btn btn-square btn-outline btn-sm btn-error" onClick={() => onClickDelete(el.id)}>
                        <MdDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center items-center mt-4">
            <div className="join grid grid-cols-2">
              <button className="join-item btn btn-outline text-black btn-sm">
                Previous page
              </button>
              <button className="join-item btn btn-outline text-black btn-sm">
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UserManagementList;
