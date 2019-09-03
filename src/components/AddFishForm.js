
import React from "react";
import PropTypes from "prop-types";

export default class AddFishForm extends React.Component {

nameRef = React.createRef();
priceRef = React.createRef();
statusRef = React.createRef();
descRef = React.createRef();
imageRef = React.createRef();

static propTypes = {
  addFish: PropTypes.func
};

 createFish = (e) => {
// stop the form from submitting
    e.preventDefault();
    const fish = {
      name: this.nameRef.value.value,
      price: parseFloat(this.priceRef.value.value),
      status: this.statusRef.value.value,
      desc: this.descRef.value.value,
      image: this.imageRef.value.value,
    };
    this.props.addFish(fish);
    // refresh the form 
    e.currentTarget.reset();
    };
   
    render() {
        return (
         <form className="fish-edit" onSubmit={this.createfish}>
         <input name="name" ref={this.nameRef} type="text" placeholder="Name" />
         <input
          name="price" 
          ref={this.priceRef}
           type="text"
            placeholder="Price" />
         <select name="status" ref={this.statusRef}>
             <option value="available">Fresh!!</option>
             <option value="unavailabel">Sold Out!</option>
         </select> 
          <input name="desc" type="text" placeholder="Desc" />
         <input name="image" type="text" placeholder="Image" />
         <button type="submit">Add Fish</button>
          </form>
        );
    }    
}