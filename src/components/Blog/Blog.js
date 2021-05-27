import './Blog.scss'
import React from 'react'
import Path from '../../img/Path 1.png'

import { useState, useEffect } from 'react'
import { all, know } from '../Firebase'
const Blog = () => {
  const [blogs, setBlogs] = useState([])
  const saveEventsInBlog = (data) => {
    setBlogs(data)
  }
  const handleGetName = (e) => {
    const name = e.target.innerHTML.split('(')
    know(name[0], saveEventsInBlog)
  }
  useEffect(() => {
    all(saveEventsInBlog)
  }, [])
  // const allBlogs = []
  // blogs.forEach((blog) => {
  //   allBlogs.push({
  //     id: blog.id,
  //     imgUrl: blog.imgUrl,
  //     webUrl: blog.webUrl,
  //     title: blog.title,
  //     introduce: blog.introduce,
  //     sort: blog.sort,
  //   })
  // })
  return (
    <div className="main-blog">
      <div className="title">
        <h1>部落格</h1>
        <img src={Path} alt=""></img>
      </div>

      <div className="main-content">
        <div className="main-button">
          <div className="main-button-top">
            <p>全部分類</p>
            <div className="plus"></div>
          </div>
          <ol id="blog">
            <li onClick={() => all(saveEventsInBlog)}>全部分類(12) </li>
            <li className="blog-1" onClick={(e) => handleGetName(e)}>
              認識中藥材(2)
            </li>
            <li className="blog-2" onClick={(e) => handleGetName(e)}>
              冬令進補(2)
            </li>
            <li className="blog-3" onClick={(e) => handleGetName(e)}>
              除濕(2)
            </li>
            <li className="blog-4" onClick={(e) => handleGetName(e)}>
              精神、失眠(2)
            </li>
            <li className="blog-5" onClick={(e) => handleGetName(e)}>
              女性生理(2)
            </li>
            <li className="blog-6" onClick={(e) => handleGetName(e)}>
              其他(2)
            </li>
          </ol>
        </div>

        <div className="main-article">
          <ul>
            {blogs.map((marker) => (
              <li className="blog-1" id={marker.id} key={marker.id}>
                <h3>{marker.sort}</h3>
                <div className="main-article-content">
                  <img src={marker.imgUrl} alt=""></img>
                  <div className="text">
                    <p>{marker.title}</p>
                    <p>{marker.introduce}</p>
                    <a href={marker.webUrl}>view more</a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
export default Blog
