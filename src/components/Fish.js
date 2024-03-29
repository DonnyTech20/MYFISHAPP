import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";


export default class Fish extends React.Component {
          static propTypes = {
              details: PropTypes.shape({ 
              image: PropTypes.string,
              name: PropTypes.string,
              desc: PropTypes.string,
              price: PropTypes.number
            }),
              addToOrder: PropTypes.func,
          };      

    render() {
        const { image, name, price, desc, 
            status } = this.props.details;
        const isAvailable = status === 
        "available";
        return (
            <li className="menu-fish">
            <img src={image} alt={name} />
            <h3 className="fish-name">
                {name}
                <span className="price">{formatPrice(price)} </span>
            </h3>
            <p>{desc}</p>
            <button 
            disabled={!isAvailable} 
            onClick={this.handleClick}>
            {!isAvailable ? "Add To Order" : "Sold Out!"}
            </button>
            
            <button>Add To Cart</button>

            </li>
        );
    }
}