import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PortafolioSideBarList = (props) => {
  const portfolioList = props.data.map((item) => {
    return (
      <div key={item.id} className="portafolio-item-thumb">
        <div className="portafolio-thumb-img">
          <img src={item.thumb_image_url} />
        </div>

        <div className="text-content">
          <div className="title">{item.name}</div>

          <div className="actions">
            <div
              className="action-icon"
              onClick={() => props.handleEditClick(item)}>
                
              <FontAwesomeIcon icon="edit" />
            </div>

            <div
              className="action-icon"
              onClick={() => props.handleDeleteClick(item)}>

              <FontAwesomeIcon icon="trash" />
            </div>
          </div>
        </div>
      </div>
    );
  });

  return <div className="portafolio-sidebar-wrapper">{portfolioList}</div>;
};

export default PortafolioSideBarList;
