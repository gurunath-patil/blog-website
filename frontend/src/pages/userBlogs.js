import React, { useEffect, useState } from 'react'
import BlogCard from "./Card"
import { baseUrl } from '../URL'

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([])
  const getUserBlogs = async () => {
    const id = localStorage.getItem('userId')
    try {
      const response = await fetch(`${baseUrl}/api/v1/blogs/user-blog/${id}`, {
        method: "GET",
      })
      if (response.status === 200) {
        const data = await response.json();
        if (data.success) {
          setBlogs(data?.userBlog)
          // console.log(data?.userBlog.blogs);               
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUserBlogs()
  }, [])


  return (
    <div className='pt-5 h-screen' style={{backgroundColor:'#6A9AB0'}}>
      {blogs && blogs.length > 0 ? (blogs.map((blog) => (
       
        <BlogCard
          id={blog._id}
          userId={true}
          title={blog.title}
          description={blog.description}
          // image={require(`../uploads/${blog?.image}`)}
          image={'http://localhost:4000/uploads/'+ blog?.image}
          username={blog.user}
          time={blog.createdAt}
        />))) : (
        <h1>You Haven't Created any blog</h1>
      )
      }
    </div>
  )
}

export default UserBlogs