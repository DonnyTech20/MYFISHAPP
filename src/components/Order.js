import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export default class Order extends React.Component {
    static propTypes = {
        fishes: PropTypes.object,
        order: PropTypes.object,
        removeFromOrder: PropTypes.func
    };
    
    renderOrder = key => {
       const fish = this.props.fishes[key];
       const count = this.props.order[key];
       const isAvailable = fish && fish.status === "available";
       const transitionOptions = {
           classNames: "order",
           key: {key},
           timeout: { enter: 500, exit: 500 }
       };

       // Make sure the fish is loaded before we continue
    if(!fish) return null;

       if(!isAvailable) {
        return (
            <CSSTransition
           classNames="order"
           key={key}
           timeout={{ enter: 250, exit: 250 }}
           >
           
        <li key={key}>
        Sorry {fish ? fish.name : "fish"} is no long available 
        </li>
      </CSSTransition>
     ); 
   }

       return ( 
        <CSSTransition
           classNames="order"
           key={key}
           timeout={{ enter: 250, exit: 250 }}
           >

           <li key={key}>
           {count} lbs {fish.name}
           {formatPrice(count * fish.price)}
           <button onClick={() => this.props.removeFromOrder(key)}>
               &times;
           </button>
       </li>
        </CSSTransition>
        
       );
    };

render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const isAvailable = fish.status === "available";
        if (isAvailable) {
            return prevTotal + (count * fish.price);
        }
        return prevTotal;
    }, 0);


    return (
        <div className="order-wrap">
            <h2>Order</h2>
       <TransitionGroup 
       component="ul" className="order">
            {orderIds.map(this.renderOrder)}
            
            </TransitionGroup>
            
            <div className="total">
                Total:
                <strong>{formatPrice(total)}</strong>
            </div>
        </div>
    );
}

}
