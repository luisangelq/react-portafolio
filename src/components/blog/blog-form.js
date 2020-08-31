import React, { Component } from "react";
import Axios from "axios";

export default class BlogForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      blog_status: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  builForm() {
    let formData = new FormData();

    formData.append("portfolio_blog[title]", this.state.title);
    formData.append("portfolio_blog[blog_status]", this.state.blog_status);

    return formData;
  }

  handleSubmit(event) {
    Axios.post(
      "https://luisangel.devcamp.space/portfolio/portfolio_blogs",
      this.builForm(),
      { withCredentials: true }
    )
      .then((response) => {
        this.props.handleSuccessfullFormSubmission(
          response.data.portfolio_blog
        );

        this.setState({
          title: "",
          blog_status: "",
        });
      })
      .catch((error) => {
        console.log("handleSubmit for blog", error);
      });

    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="blog-form-wrapper">
        <div className="two-column">
          <input
            type="text"
            onChange={this.handleChange}
            name="title"
            placeholder="Blog Title"
            value={this.state.title}
          />
          <input
            type="text"
            onChange={this.handleChange}
            name="blog_status"
            placeholder="Blog Status"
            value={this.state.blog_status}
          />
        </div>

        <button className="btn">Save</button>
      </form>
    );
  }
}
