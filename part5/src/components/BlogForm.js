import React from 'react'



const BlogForm  =
 ({addBlog,  inputChanged, title, author, url}) => {


  return (
      <form onSubmit={addBlog}>
         <div>
      title
        <input
        type="text"
        value={title}
        name="title"
        onChange={inputChanged}
      />
    </div>
    <div>
      author
        <input
        type="text"
        value={author}
        name="author"
        onChange={inputChanged}
      />
    </div>
    <div>
      url
        <input
        type="text"
        value={url}
        name="url"
        onChange={inputChanged}
      />
    </div>
        <button type="submit">save</button>
      </form>
    )
}
export default BlogForm