import React, { Component } from "react";
import axios from "axios";

import PortafolioSideBarList from "../portafolio/portafolio-sidebar-list";
import PortafolioForm from "../portafolio/portafolio-form";

export default class PortfolioManager extends Component {
  constructor() {
    super();

    this.state = {
      portfolioItems: [],
    };

    this.handleSuccessfulFormSubmission = this.handleSuccessfulFormSubmission.bind(
      this
    );
    this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
  }
  componentDidMount() {
    this.getPortafolioItems();
  }

  handleSuccessfulFormSubmission(portfolioItem) {
    this.setState({
      portfolioItems: [portfolioItem].concat(this.state.portfolioItems),
    });
  }

  handleFormSubmissionError(error) {
    console.log("error", error);
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

  render() {
    return (
      <div className="portfolio-manager-wrapper">
        <div className="left-column">
          <PortafolioForm
            handleSuccessfulFormSubmission={this.handleSuccessfulFormSubmission}
            handleFormSubmissionError={this.handleFormSubmissionError}
          />
        </div>

        <div className="right-column">
          <PortafolioSideBarList data={this.state.portfolioItems} />
        </div>
      </div>
    );
  }
}
