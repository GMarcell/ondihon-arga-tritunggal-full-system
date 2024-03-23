import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import CustomInput from '../Input';
import axiosClient from '../../axios-client';
import CustomCard from '../CustomCard';

function ArticleComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [allArticles, setAllArticles] = useState([])
  const [lastPage, setLastPage] = useState(0);

  const { register, control, getValues } = useForm({
    defaultValues: {
      searchArticles: ''
    },
  });

  const getArticle = () => {
    setIsLoading(true);
    axiosClient
      .get("/getAllArticles", {
        params: {
          page: page,
          per_page: 9,
          search: getValues("searchArticles") == "" ? undefined : getValues("searchArticles"),
        },
      })
      .then(({ data }) => {
        setIsLoading(false);
        setAllArticles(data.data);
        setLastPage(data.meta.last_page);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getArticle();
  }, [page]);

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
                name="searchArticles"
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
            {allArticles?.map((el, idx) => (
              <CustomCard key={idx} item={el} fromAdmin={false} detailLink={`/article/detail/${el.id}`}/>
            ))}
          </div>

          <div className="flex justify-center items-center mt-4 ">
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
        </div>
      )}
    </div>
  );
}

export default ArticleComponent