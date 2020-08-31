import React, { Component } from "react";
import axios from "axios";

import PortafolioSideBarList from "../portafolio/portafolio-sidebar-list";
import PortafolioForm from "../portafolio/portafolio-form";


export default class PortfolioManager extends Component {
  constructor() {
    super();

    this.state = {
      portfolioItems: [],
      portfolioToEdit: {}
    };

    this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
    this.handleEditFormSubmission = this.handleEditFormSubmission.bind(this);
    this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.clearPortfolioToEdit = this.clearPortfolioToEdit.bind(this);
  }
  

  clearPortfolioToEdit() {
    this.setState({
      portfolioToEdit: {}
    })
  }

  handleEditClick(item) {
    this.setState({
      portfolioToEdit: item
    })
  }
  
  handleDeleteClick(item) {
    axios
      .delete(
        `https://api.devcamp.space/portfolio/portfolio_items/${item.id}`,
        { withCredentials: true }
      )
      .then((response) => {
        this.setState({
          portfolioItems: this.state.portfolioItems.filter(items => {
            return items.id !== item.id;
          })
        })
        return response.data;
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  handleEditFormSubmission() {
    this.getPortafolioItems();
  }

  handleNewFormSubmission(portfolioItem) {
    this.setState({
      portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
    });
  }

  handleFormSubmissionError(error) {
    console.log("este es", error);
  }

  getPortafolioItems() {
    axios
      .get(
        "https://luisangel.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc",
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        this.setState({
          portfolioItems: [...response.data.portfolio_items],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentDidMount() {
    this.getPortafolioItems();
  }

  render() {
    return (
      <div className="portfolio-manager-wrapper">
        <div className="left-column">
          <PortafolioForm
            handleNewFormSubmission={this.handleNewFormSubmission}
            handleEditFormSubmission={this.handleEditFormSubmission}
            handleFormSubmissionError={this.handleFormSubmissionError}
            clearPortfolioToEdit={this.clearPortfolioToEdit}
            portfolioToEdit={this.state.portfolioToEdit}
          />
        </div>

        <div className="right-column">
          <PortafolioSideBarList
            handleDeleteClick={this.handleDeleteClick}
            data={this.state.portfolioItems}
            handleEditClick={this.handleEditClick}
          />
        </div>
      </div>
    );
  }
}
