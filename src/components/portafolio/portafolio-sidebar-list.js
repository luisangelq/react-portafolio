import React from 'react';

const PortafolioSideBarList = (props) => {
    const portfolioList = props.data.map((item) => {
        return (
            <div key={item.id} className="portafolio-item-thumb">
                <div className="portafolio-thumb-img">
                    <img src={item.thumb_image_url}/>
                </div>
                <h1 className="title">{item.name}</h1>
                <h2>{item.id}</h2>
            </div>
        )
    })

    return <div className="portafolio-sidebar-wrapper">{portfolioList}</div>
}

export default PortafolioSideBarList;