import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useStateContext } from "../../../hooks/stateContext";
import Notification from "../../../components/Notification";
import CustomInput from "../../../components/Input";
import { Link } from "react-router-dom";
import axiosClient from "../../../axios-client";
import { MdDelete, MdEdit } from "react-icons/md";
import CustomCard from "../../../components/CustomCard";

function NewsManagementList() {
  const [isLoading, setisLoading] = useState(false);
  const [users, setusers] = useState([]);
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  const { register, getValues } = useForm();

  const { notification, setNotification } = useStateContext();

  const onClickDelete = (newsId) => {
    axiosClient.post(`/news/delete/${newsId}`).then(() => {
      setNotification("News was successfully deleted");
      getNews();
    });
  };

  const getNews = () => {
    setisLoading(true);
    axiosClient
      .get("/news", {
        params: {
          page: page,
          per_page: 9,
          search: getValues("search") == "" ? undefined : getValues("search"),
        },
      })
      .then(({ data }) => {
        setisLoading(false);
        setNews(data.data);
        setLastPage(data.meta.last_page);
      })
      .catch(() => {
        setisLoading(false);
      });
  };

  useEffect(() => {
    getNews();
  }, [page]);

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
          <div className="flex justify-between mb-3 gap-3">
            <div className="flex gap-3">
              <CustomInput
                name="search"
                hookForm={register}
                labelText="Search"
                useLabel={false}
              />
              <button
                className="btn bg-[#0A055B] btn-md"
                onClick={() => getNews()}
              >
                Search
              </button>
            </div>
            <button className="btn bg-[#0A055B] btn-md">
              <Link to="/administrator/news-management/create">Add New</Link>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {news?.map((el, idx) => (
              <CustomCard key={idx} handleDelete={onClickDelete} news={el} />
            ))}
          </div>

          <div className="flex justify-center items-center mt-4">
            <div className="join">
              {[...Array(lastPage)].map((_, idx) => (
                <button
                  key={idx}
                  className={`join-item btn ${
                    page == idx + 1 ? "btn-active" : ""
                  }`}
                  onClick={() => setPage(idx + 1)}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default NewsManagementList;
