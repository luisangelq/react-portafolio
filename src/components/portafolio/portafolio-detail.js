import React, { Component } from "react";
import Axios from "axios";

// banner_image_url: "https://devcamp-space.s3.amazonaws.com/fP2anGEArVNjMsCTRYhvrkZj?response-content-disposition=inline%3B%20filename%3D%22dailysmarty.jpg%22%3B%20filename%2A%3DUTF-8%27%27dailysmarty.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJEHZJNHM5JFESRRQ%2F20200905%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20200905T045031Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=37c340c0d5119d3e5f1625a7c88ab3de67b9c005c4b1c57951edb789da1f8c27"
// category: "Health"
// column_names_merged_with_images: (9) ["id", "name", "description", "url", "category", "position", "thumb_image", "banner_image", "logo"]
// description: "Site where you can order food supplements"
// id: 21112
// logo_url: "https://devcamp-space.s3.amazonaws.com/9VL1eS3FY2xmrG7ArjmsecjH?response-content-disposition=inline%3B%20filename%3D%22dailysmarty.png%22%3B%20filename%2A%3DUTF-8%27%27dailysmarty.png&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJEHZJNHM5JFESRRQ%2F20200905%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20200905T045031Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=6c8419c11340fde338ab58a03c88fb031813a57b613c49391b1cb746218a3d58"
// name: "UmbralSalud"
// position: 2
// thumb_image_url: "https://devcamp-space.s3.amazonaws.com/dnQmQK1b6rH6QCaQQAEPVTTt?response-content-disposition=inline%3B%20filename%3D%22dailysmarty.jpg%22%3B%20filename%2A%3DUTF-8%27%27dailysmarty.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJEHZJNHM5JFESRRQ%2F20200905%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20200905T045031Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=32d3a859560380134241b8c64fd0404d8908c30cf6fd8911cf8d373403e76c70"
// url: "https://www.facebook.com/UmbralSalud-102499594819734"

export default class PortfolioDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentId: this.props.match.params.slug,
      portfolioItem: {},
    };

    this.getPortfolioItem = this.getPortfolioItem.bind(this);
  }

  componentWillMount() {
    this.getPortfolioItem();
  }

  getPortfolioItem() {
    Axios.get(
      `https://luisangel.devcamp.space/portfolio/portfolio_items/${this.state.currentId}`,
      { withCredentials: true }
    )
      .then((response) => {
        this.setState({
          portfolioItem: response.data.portfolio_item,
        });
      })
      .catch((error) => {
        console.log("error get portfolioItem", error);
      });
  }
  render() {
    const {
      banner_image_url,
      category,
      description,
      logo_url,
      name,
      thumb_image_url,
      url,
    } = this.state.portfolioItem;

    const bannerStyles = {
        backgroundImage: "url(" + banner_image_url + ")",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center"
      }

      const logoStyles = {
        width: "200px"
      };
    return (
      <div className="portfolio-detail-wrapper">
        <div className="banner" style={bannerStyles}>
          <img src={logo_url} style={logoStyles}/>
        </div>

        <div className="portfolio-detail-description-wrapper">
          <div className="description">{description}</div>
        </div>

        <div className="bottom-content-wrapper">
            <a href={url} className="site-link" target="_blank">
                Visit {name}
            </a>
        </div>
      </div>
    );
  }
}
