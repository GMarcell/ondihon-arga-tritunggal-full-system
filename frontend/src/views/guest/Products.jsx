import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../axios-client";
import CustomInput from "../../components/Input";
import { useForm, Controller } from "react-hook-form";
import CustomCard from "../../components/CustomCard";

function Products() {
  const selectOption = [
    {
      label: "Air System",
      value: 1,
    },
    {
      label: "Gas Generation",
      value: 2,
    },
    {
      label: "Instalation",
      value: 3,
    },
  ];

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [Products, setProducts] = useState([]);
  const [lastPage, setLastPage] = useState(0);

  const { register, control, getValues } = useForm({
    defaultValues: {
      type: id,
      search: ''
    },
  });

  const getProductType = (id) => {
    setIsLoading(true);
    axiosClient
      .get("/getProductByType", {
        params: {
          page: page,
          per_page: 9,
          type: id,
          search: getValues("search") == "" ? undefined : getValues("search"),
        },
      })
      .then(({ data }) => {
        setIsLoading(false);
        setProducts(data.data);
        setLastPage(data.meta.last_page);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getProductType(getValues("type"));
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
            <div className="flex gap-3 z-50">
              <label className="form-control w-full">
                <Controller
                  control={control}
                  name="type"
                  render={({ field }) => (
                    <select
                      className={`select select-bordered w-full disabled:bg-slate-50 disabled:border-slate-50 bg-slate-50 text-black z-50`}
                      onChange={(e) => field.onChange(e.target.value)}
                      disabled={isLoading}
                    >
                      <option disabled>Product Type</option>
                      {selectOption.map((el, idx) => (
                        <option
                          key={idx}
                          value={el.value}
                          selected={getValues("type") == el.value}
                        >
                          {el.label}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </label>
              <CustomInput
                name="search"
                hookForm={register}
                labelText="Search"
                useLabel={false}
              />
              <button
                className="btn bg-[#0A055B] btn-md"
                onClick={() => getProductType(getValues('type'))}
              >
                Search
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {Products?.map((el, idx) => (
              <CustomCard item={el} fromAdmin={false} detailLink={`/product/detail/${el.id}`}/>
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

export default Products;
