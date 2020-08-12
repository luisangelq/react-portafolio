import React, {Component} from "react";

import PortafolioItem from "./portafolio-item"

export default class PortafolioContainer extends Component {
    constructor(){
        super();

        this.state = {
            pageTitle: "Welcome to my portafolio",
            data: [
                {title: "Quip"},
                {title: "Eventbrite"}, 
                {title: "Ministry safe"}, 
                {title: "SwingAway"} 
                ]
        };

        console.log("Portafolio container");
    }

    portafolioItems(){

        return this.state.data.map(item => {
            return <PortafolioItem title={item.title} url={"google.com"}/>;
        });
    }

    render() {
        return (
            <div>
                <h2>{this.state.pageTitle}</h2>
                {this.portafolioItems()}
            </div>
        )
    }
}