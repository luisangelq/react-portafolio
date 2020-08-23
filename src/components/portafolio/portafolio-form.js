import React, { Component } from "react";
import Axios from "axios";


export default class PortafolioForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      category: "Technology",
      position: "",
      url: "",
      thumb_image: "",
      banner_image: "",
      logo: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  buildForm() {
    let formData = new FormData();
    formData.append("portfolio_item[name]", this.state.name);
    formData.append("portfolio_item[description]", this.state.description);
    formData.append("portfolio_item[url]", this.state.url);
    formData.append("portfolio_item[category]", this.state.category);
    formData.append("portfolio_item[position]", this.state.position);

    return formData;
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    Axios.post(
      "https://luisangel.devcamp.space/portfolio/portfolio_items",
      this.buildForm(),
      { withCredentials: true }
    ).then(response => {
      this.props.handleSuccessfulFormSubmission(response.data.portfolio_item);
      console.log(response);
    }).catch(error => {
      console.log(error);
    }) 

    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Portfolio form</h1>

        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Portfolio item name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="url"
              placeholder="URL"
              value={this.state.url}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <input
              type="text"
              name="position"
              placeholder="Position"
              value={this.state.position}
              onChange={this.handleChange}
            />
            <select
            name="category"
            value={this.state.category}
            onChange={this.handleChange}>
              
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="learn">learn</option>
            </select>
          </div>

          <div>
            <textarea
              type="text"
              name="description"
              placeholder="Description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    );
  }
}
