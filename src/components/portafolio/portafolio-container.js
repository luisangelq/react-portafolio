import React, {Component} from "react";
import axios from "axios";

import PortafolioItem from "./portafolio-item"

export default class PortafolioContainer extends Component {
    constructor(){
        super();

        this.state = {
            pageTitle: "Welcome to my portafolio",
            isLoading: false,
            data: [
                {title: "Quip", category: "eCommerce", slug: "quip"},
                {title: "Eventbrite", category: "Scheduling", slug: "eventbrite"}, 
                {title: "Ministry safe", category: "Enterprise", slug: "ministry-safe"}, 
                {title: "SwingAway", category: "eCommerce", slug: "swingAway"} 
            ]
        };

        this.handleFilter = this.handleFilter.bind(this);
        this.getPortafolioItems = this.getPortafolioItems.bind(this);
    }

    handleFilter(filter) {
        this.setState({
            data: this.state.data.filter(item => {
                return item.category === filter
            })
        })
    }
    getPortafolioItems() {
        axios
          .get("https://luisangel.devcamp.space/portfolio/portfolio_items")
          .then(response => {
            // handle success
            console.log(response);
          })
          .catch(error => {
            // handle error
            console.log(error);
          });
      }

    portafolioItems(){

        return this.state.data.map(item => {
            return <PortafolioItem title={item.title} url={"google.com"} slug={item.slug}/>;
        });
    }


    render() {
        if(this.state.isLoading) {
            return  <div>Loading...</div>;
        }

        this.getPortafolioItems();

        return (
            <div>
                <h2>{this.state.pageTitle}</h2>

                <button onClick={() => this.handleFilter("eCommerce")}>eCommerce</button>
                <button onClick={() => this.handleFilter("Scheduling")}>Scheduling</button>
                <button onClick={() => this.handleFilter("Enterprise")}>Enterprise</button>
                {this.portafolioItems()}

            </div>
        )
    }
}