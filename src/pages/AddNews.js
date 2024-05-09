import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { base_url } from "../utils/base_url";

const AddNews = () => {
  const navigate = useNavigate();

  const [news, setNews] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setNews((prevNews) => ({
      ...prevNews,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newsResponse = await axios.post(`${base_url}/news`, {
        title: news.title,
        content: news.content,
        category: news.category,
        tags: news.tags,
      });

      const newsId = newsResponse.data._id;

      const formData = new FormData();
      formData.append("image", news.image);

      await axios.post(`${base_url}/uploadImage/news/${newsId}`, formData);

      console.log("News and image added successfully");

      toast.success("News and image added successfully!");

      navigate("/admin/news-list");
    } catch (error) {
      console.error("Error adding news:", error);

      toast.error("Error adding news. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Add News</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={news.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Category:</label>
          <select
            name="category"
            className="form-control"
            value={news.category}
            onChange={handleChange}
          >
          <option value="">Select a Category</option>
            <option value="Politics">Politics</option>
            <option value="World News">World News</option>
            <option value="Business and Finance">Business and Finance</option>
            <option value="Technology">Technology</option>
            <option value="Science">Science</option>
            <option value="Health">Health</option>
            <option value="Environment">Environment</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Sports">Sports</option>
            <option value="Education">Education</option>
            <option value="Crime and Justice">Crime and Justice</option>
            <option value="Social Issues">Social Issues</option>
            <option value="Travel">Travel</option>
            <option value="Opinion and Analysis">Opinion and Analysis</option>
            <option value="Breaking News">Breaking News</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Tags:</label>
          <input
            type="text"
            name="tags"
            className="form-control"
            value={news.tags}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Content:</label>
          <textarea
            name="content"
            className="form-control"
            value={news.content}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Image:</label>
          <input
            type="file"
            name="image"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-success form-control">
            Add News
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNews;
