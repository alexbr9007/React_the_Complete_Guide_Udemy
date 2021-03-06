import React, { Component } from "react";
import "./App.css";
import Person from "./Person/Person";

class App extends Component {
  /* 
    This extended class contains a state object property that contains 3 other properties. 
    People is an array that contains 3 elements, otherState is just an example property and showPeople is a 
    property that is used to display the rest of the card elements when a button is clicked. 

  */

  state = {
    people: [
      { id: "a123", name: "Alex", age: 28 },
      { id: "b123", name: "Liz", age: 29 },
      { id: "c123", name: "Stephanie", age: 30 }
    ],
    otherState: "some other value",
    showPeople: false
  };

  // change the name of the person in each paragraph once you type in the input field
  nameChangeHandler = (event, id) => {
    // get the value of the person you want to change by its id
    const personIndex = this.state.people.findIndex(p => {
      return p.id === id;
    });

    // make a copy of the index of the personIndex
    const person = {
      ...this.state.people[personIndex]
    };

    // change the name of the person to the new value
    person.name = event.target.value;

    //make a copy of the people objects
    const copyPeople = [...this.state.people];

    //change the value of the copied object people
    copyPeople[personIndex] = person;

    //update the state of the old object people to the new state
    this.setState({ people: copyPeople });
  };

  deletePersonHandler = personIndex => {
    //const persons = this.state.people.slice(); //old feature before ES6
    //the below is a ES6 feature that creates a new array based on an existing object (people)
    // and this is used to avoid unpredictable behavior of our application.
    // A reference object should not be mutated, so that's why I had to use the syntax from below
    const persons = [...this.state.people]; // spread operator
    persons.splice(personIndex, 1);
    // update the previous list of persons with the updated version of persons
    this.setState({ people: persons });
  };

  togglePersonsHandler = () => {
    // copy the variable with the original value, do not change the values through the original variable
    const doesShow = this.state.showPeople;
    this.setState({ showPeople: !doesShow });
  };

  render() {
    const style = {
      backgroundColor: "white",
      font: "inherit",
      border: "3px solid blue",
      padding: "8px",
      cursor: "pointer"
    };

    let persons = null;

    //if showPeople === true then display the contents of the card
    if (this.state.showPeople) {
      persons = (
        // persons contain the mapping of each person of the array called people
        // key is used in react to keep track of all the elements id or indexes
        <div>
          {this.state.people.map((person, index) => {
            return (
              <Person
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={event => this.nameChangeHandler(event, person.id)}
              />
            );
          })}
        </div>
      );
    }

    return (
      <div className="App">
        <h1>React App</h1>
        <p>This is working!</p>
        <button style={style} onClick={this.togglePersonsHandler}>
          Display the rest of the card elements
        </button>
        {persons}
      </div>
    );
  }
}

export default App;
