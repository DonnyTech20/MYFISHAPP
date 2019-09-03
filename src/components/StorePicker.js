// eslint-disable-next-line

import React from "react";
import PropTypes from "prop-types";
import { getFunName } from "../helpers";


export default class StorePicker extends React.Component {
      myInput = React.createRef();
      static propTypes = {
          history: PropTypes.object 
      };
      

    goToStore = (e)  => {
        // Stop the form from submitting
        e.preventDefault();
        // Get the text from that input
        const storeName = this.myInput.value;
        // Change the page to /store/whatever-they-entered
        this.props.history.push(`/store/${storeName}`);
    };

    render() {
        return ( 
        <form className="store-selector" onSubmit={this.goToStore}>
        <h2> Enter A Store</h2>
        <input 
        type="text" 
        ref={this.myInput}
        required
        placeholder="Store Name"
        defaultValue={getFunName()}
         />
        <button type="submit">Checkout Store </button>
        </form>
    );
    }
}


//export default StorePicker;

