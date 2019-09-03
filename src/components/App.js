import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

export default class App extends React.Component {
    static propTypes = {
         match: PropTypes.object.isRequired 
    };

    state = {
        fishes: {},
        order: {}
    };

    componentDidMount() {
        const { params } = this.props.match;
        // first reinstate our localtorage
        const localStorageRef = localStorage.getItem(params.storeId);
        if(localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) })
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: "fishes"
        });
    }

    componentDidUpdate() {
        localStorage.setItem(
            this.props.match.params.storeId,
            JSON.stringify(this.state.order)
        );
    }
 
    // Unmount from App component to prevent memory leak
    componentWillUnmout() {
        base.removeBinding(this.ref);
    }

    addFish = (fish) => {

        // Take a copy of the existing state
        const fishes = {...this.state.fishes };

        // Add our new fish to that fishes variable
        fishes[`fish${Date.now()}`] = fish;

        // Set the new fishes object to state
        this.setState({ fishes });

    };

     updateFish = (key, updatedFish) => {
         // Take a copy of the current state
         const fishes = {...this.state.fishes };
         // Update that state
         fishes[key] = updatedFish;
         //Set that to state
         this.setState({ fishes });
     };

     deleteFish = key => {
         // Take a copy of state
         const fishes = {...this.state.fishes };
         // Update the state
         fishes[key] = null;
         // Update state 
         this.setState({ fishes });
     };

    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes });
    };

    addToOrder = (key) => {
        // Take a copy of state
        const order = { ...this.state.order };

       // Either add to the order, or update the number in our order
       order[key] = order[key] + 1 || 1;

       // Call setState to update out state object
       this.setState({ order }); 

    };

    removeFromOrder = key => {
        // Take a compy of state
        const order = {...this.state.order };
        // Remove that item from order
        delete order[key];
        // Call setState to update our state object
        this.setState({ order });
    };
    
    render() {
        return (
            
            <div className="catch-of-the-day">
              <div className="menu">
              
                  <Header tagline="Fresh Fish Is Best" />

                  <ul className="fishes">
                  {Object.keys(this.state.fishes).map(key => (
                      <Fish 
                      key={key}
                      index={key}
                       details={this.state.fishes[key]} 
                       addToOrder={this.addToOrder}
                   />
                  ))}
                </ul>
              </div>
              
              <Inventory 
              addFish={this.addFish} 
              updateFish={this.updateFish}
              deleteFish={this.deleteFish}
              loadSampleFishes={this.loadSampleFishes}
              fishes={this.state.fishes}
              storeId={this.props.match.params.storeId}
              />

             <Order 
             fishes={this.state.fishes} 
             order={this.state.order} 
             removeFromOrder={this.removeFromOrder}
             //loadSampleFishes={this.loadSampleFishes}
             deleteFish={this.deleteFish}
             updateFish={this.updateFish}
             />           
               

            </div>
            
        );
    }
}

