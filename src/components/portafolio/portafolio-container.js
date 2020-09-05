import React, { Component } from "react";
import axios from "axios";

import PortafolioItem from "./portafolio-item";

export default class PortafolioContainer extends Component {
  constructor() {
    super();

    this.state = {
      pageTitle: "Welcome to my portafolio",
      isLoading: false,
      data: [],
    };

    this.handleFilter = this.handleFilter.bind(this);
  }
  componentDidMount() {
    this.getPortafolioItems();
  }

  handleFilter(filter) {
    if(filter === "CLEAR_FILTERS") {
      this.getPortafolioItems();
    }else {
      this.getPortafolioItems(filter);
    }
    
  }

  getPortafolioItems(filter = null) {
    axios
      .get("https://luisangel.devcamp.space/portfolio/portfolio_items")
      .then((response) => {
        if(filter){
          this.setState({
            data: response.data.portfolio_items.filter(item => {
              return item.category === filter;
            })
          });
        } else {
          this.setState({
            data: response.data.portfolio_items,
          });
        }
        
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

  portafolioItems() {
    return this.state.data.map((item) => {
      //   console.log("item data", item);
      return <PortafolioItem key={item.id} item={item} />;
    });
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="homapage-wrapper">
        <div className="filter-links">
          <button
            className="btn"
            onClick={() => this.handleFilter("Technology")}
          >
            Technology
          </button>
          <button className="btn" onClick={() => this.handleFilter("Health")}>
            Health
          </button>
          <button className="btn" onClick={() => this.handleFilter("shop")}>
            shop
          </button>
          <button
            className="btn"
            onClick={() => this.handleFilter("CLEAR_FILTERS")}
          >
            All
          </button>
        </div>
        <div className="portafolio-items-wrapper">{this.portafolioItems()}</div>
      </div>
    );
  }
}
