import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useStateContext } from "../../../hooks/stateContext";
import Notification from "../../../components/Notification";
import CustomInput from "../../../components/Input";
import CustomCard from "../../../components/CustomCard";
import { Link } from "react-router-dom";
import axiosClient from "../../../axios-client";

function ArticleManagementList() {
  const [isLoading, setisLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [notificationType, setNotificationType] = useState("success");

  const { register, getValues } = useForm();

  const { notification, setNotification } = useStateContext();

  const onClickDelete = (articleId) => {
    setisLoading(true);
    axiosClient
      .post(`/article/delete/${articleId}`)
      .then(() => {
        setNotification("News was successfully deleted");
        getArticle();
      })
      .catch((err) => {
        setisLoading(false);
        setNotificationType("delete_failed");
        setNotification(err.response.data);
      });
  };

  const getArticle = () => {
    setisLoading(true);
    axiosClient
      .get("/article", {
        params: {
          page: page,
          per_page: 9,
          search: getValues("search") == "" ? undefined : getValues("search"),
        },
      })
      .then(({ data }) => {
        setisLoading(false);
        setArticles(data.data);
        setLastPage(data.meta.last_page);
      })
      .catch(() => {
        setisLoading(false);
      });
  };

  useEffect(() => {
    getArticle();
  }, [page]);

  return (
    <div className="w-full h-fit">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      ) : (
        <>
          {notification != "" && (
            <div className="my-3">
              <Notification type={notificationType} alertText={notification} />
            </div>
          )}
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
                onClick={() => getArticle()}
              >
                Search
              </button>
            </div>
            <button className="btn bg-[#0A055B] btn-md">
              <Link to="/administrator/article-management/create">Add New</Link>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {articles?.map((el, idx) => (
              <CustomCard
                key={idx}
                handleDelete={onClickDelete}
                item={el}
                menuName="article"
              />
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

export default ArticleManagementList;
