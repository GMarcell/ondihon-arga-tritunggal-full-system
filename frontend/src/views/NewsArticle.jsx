import React from 'react'
import LangController from '../LangController'
import ArticleNewsComponent from '../components/ArticleNewsComponent'

function NewsArticle() {
  return (
    <>
      <LangController>
        <ArticleNewsComponent/>
      </LangController>
    </>
  )
}

export default NewsArticle