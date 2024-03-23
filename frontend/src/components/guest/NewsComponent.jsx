import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../Input";
import axiosClient from "../../axios-client";
import CustomCard from "../CustomCard";

function NewsComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [pageNews, setPageNews] = useState(1);
  const [allNews, setAllNews] = useState([])
  const [lastPageNews, setLastPageNews] = useState(0);

  const { register, control, getValues } = useForm({
    defaultValues: {
      searchNews: '',
      searchArticles: ''
    },
  });

  const getNews = () => {
    setIsLoading(true);
    axiosClient
      .get("/getAllNews", {
        params: {
          page: pageNews,
          per_page: 9,
          search: getValues("searchNews") == "" ? undefined : getValues("searchNews"),
        },
      })
      .then(({ data }) => {
        setIsLoading(false);
        setAllNews(data.data);
        setLastPageNews(data.meta.last_page);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getNews();
  }, [pageNews]);

  return (
    <div className="w-full h-full min-h-[30vh] bg-gray-200">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      ) : (
        <div className="p-3">
          <div className="flex justify-between mb-3 gap-3">
            <div className="flex w-2/3 gap-3 z-50">
              <CustomInput
                name="searchNews"
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
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {allNews?.map((el, idx) => (
              <CustomCard key={idx} item={el} fromAdmin={false} detailLink={`/news/detail/${el.id}`}/>
            ))}
          </div>

          <div className="flex justify-center items-center mt-4 ">
            <div className="join">
              {[...Array(lastPageNews)].map((_, idx) => (
                <button
                  key={idx}
                  className={`join-item btn ${
                    pageNews == idx + 1 ? "btn-active" : ""
                  }`}
                  onClick={() => setPageNews(idx + 1)}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewsComponent