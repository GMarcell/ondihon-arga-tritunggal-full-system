import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../axios-client";
import CustomInput from "../../components/Input";
import { useForm, Controller } from "react-hook-form";
import CustomCard from "../../components/CustomCard";
import ArticleComponent from "./ArticleComponent";
import NewsComponent from "./NewsComponent";

function ArticleNewsComponent() {
  const [type, setType] = useState("news");

  return (
    <div className="w-full h-full min-h-[30vh] bg-gray-200">
      <div role="tablist" className="tabs tabs-boxed tabs-lg">
        <a
          role="tab"
          className={`tab text-black tab-border-color:black ${
            type == "news" ? "tab-active" : ""
          }`}
          onClick={() => setType('news')}
        >
          News
        </a>
        <a
          role="tab"
          className={`tab text-black tab-border-color:black ${
            type == "article" ? "tab-active" : ""
          }`}
          onClick={() => setType('article')}
        >
          Article
        </a>
      </div>

      {
        type == 'news' ? (
          <NewsComponent/>
          ) : (
          <ArticleComponent/>
        )
      }
    </div>
  );
}

export default ArticleNewsComponent;
