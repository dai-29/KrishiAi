// src/components/Blog.js
import React from "react";

function Blog() {
  const blogPosts = [
    {
      title: "Lorem elitr magna stet eirmod labore amet",
      date: "Jan 01, 2050",
      image: "/img/blog-1.jpg",
      link: "#",
    },
    {
      title: "Dolor sit amet consetetur sadipscing elitr",
      date: "Feb 15, 2050",
      image: "/img/blog-2.jpg",
      link: "#",
    },
    {
      title: "Tempor invidunt ut labore et dolore magna",
      date: "Mar 10, 2050",
      image: "/img/blog-3.jpg",
      link: "#",
    },
  ];

  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="mx-auto text-center mb-5" style={{ maxWidth: "500px" }}>
          <h6 className="text-primary text-uppercase">Our Blog</h6>
          <h1 className="display-5">Latest Articles From Our Blog Post</h1>
        </div>

        <div className="row g-4">
          {blogPosts.map((post, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div className="card border-0 shadow-sm">
                <img
                  src={post.image}
                  className="card-img-top"
                  alt={post.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="text-muted">{post.date}</p>
                  <a href={post.link} className="btn btn-primary">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
