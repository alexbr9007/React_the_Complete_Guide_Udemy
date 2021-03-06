import React, { Component } from "react";
import "./App.css";
import Person from "./Person/Person";
import Radium, { StyleRoot } from "radium";

class App extends Component {
  state = {
    people: [
      { id: "a123", name: "Alex", age: 28 },
      { id: "b123", name: "Liz", age: 29 },
      { id: "c123", name: "Stephanie", age: 30 }
    ],
    // showPersons is used to display the cards of the other people with the if conditional
    showPersons: false
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
    const persons = [...this.state.people];
    persons.splice(personIndex, 1);
    // update the previous list of persons with the updated version of persons
    this.setState({ people: persons });
  };

  // this method belongs to the class App and it displays the cards of each person
  togglePersonsHandler = () => {
    // copy the variable with the original value, do not change the values through the original variable
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  render() {
    const style = {
      backgroundColor: "green",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer",
      // sudo selector
      ":hover": {
        backgroundColor: "lightgreen",
        color: "black"
      }
    };

    let persons = null;

    //if showPersons === true then display the contents of the card
    if (this.state.showPersons) {
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
      style.backgroundColor = "red";
      // when the button is activated you turn the color of the button to salmon
      //style.backgroundColor = 'red';
      style[":hover"] = {
        backgroundColor: "salmon",
        color: "white"
      };
    }

    const classes = [];
    // I had to use the .join because the array had to be converted into a string, so it could be read by className.
    //const assignedClasses = []
    //const classes = ['red', 'bold'].join(' ');

    if (this.state.people.length <= 2) {
      classes.push("red"); // classes = ['red']
    }
    if (this.state.people.length <= 1) {
      classes.push("bold"); // classes = ['red', 'bold']
    }

    return (
      // className = {classes.join(' ')} // we need to join the elements in the classes array in order for className to read it
      <StyleRoot>
        <div className="App">
          <h1>React App</h1>
          <p className={classes.join(" ")}>This is working!</p>
          <button style={style} onClick={this.togglePersonsHandler}>
            Switch name
          </button>
          {persons}
        </div>
      </StyleRoot>
    );
  }
}

export default Radium(App);
