import React, { Component } from "react";
import Axios from "axios";
import ReactHtmlParser from "react-html-parser";

import BlogForm from "./blog-form";

export default class BlogDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentId: this.props.match.params.slug,
      blogItem: {},
      editMode: false,
    };

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleFeaturedImageDelete = this.handleFeaturedImageDelete.bind(this);
  }

  handleFeaturedImageDelete() {
    this.setState({
      blogItem: {
        featured_image_url: "",
      },
    });
  }

  handleEditClick() {
    this.setState({
      editMode: true,
    });
  }

  getBlogItem() {
    Axios.get(
      `https://luisangel.devcamp.space/portfolio/portfolio_blogs/${this.state.currentId}`
    )
      .then((response) => {
        this.setState({
          blogItem: response.data.portfolio_blog,
        });
      })
      .catch((error) => {
        console.log("getBlogItem", error);
      });
  }

  componentDidMount() {
    this.getBlogItem();
  }
  render() {
    const {
      title,
      content,
      featured_image_url,
      blog_status,
    } = this.state.blogItem;

    const contentManager = () => {
      if (this.state.editMode) {
        return (
          <BlogForm
            editMode={this.state.editMode}
            blog={this.state.blogItem}
            handleFeaturedImageDelete={this.handleFeaturedImageDelete}
          />
        );
      } else {
        return (
          <div className="content-container">
            <h1 className="title-center" onClick={this.handleEditClick}>
              {title}
            </h1>

            {featured_image_url ? (
              <div className="feature-image-wrapper">
                <img src={featured_image_url} />
              </div>
            ) : null}

            <div className="content">{ReactHtmlParser(content)}</div>
          </div>
        );
      }
    };
    return <div className="blog-container">{contentManager()}</div>;
  }
}
