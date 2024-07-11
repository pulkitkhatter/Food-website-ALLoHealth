// reducer.js
import {
  SELECT_PERSON,
  SELECT_MEAL,
  DESELECT_MEAL,
  SELECT_DRINK,
  DESELECT_DRINK,
  SET_SELECTED_TAG,
} from "./action";

const initialState = {
  people: [
    { id: "person1", name: "Pulkit", selectedMeal: null, selectedDrinks: [] },
    { id: "person2", name: "Shubham ", selectedMeal: null, selectedDrinks: [] },
    { id: "person3", name: "Nishant", selectedMeal: null, selectedDrinks: [] },
  ],
  selectedPerson: null,
  selectedTag: "All",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_PERSON:
      return {
        ...state,
        selectedPerson: action.payload,
      };
    case "SELECT_MEAL":
      return {
        ...state,
        people: state.people.map((person) =>
          person.id === action.payload.personId
            ? {
                ...person,
                selectedMeal: action.payload.mealId,
                selectedDrink: null,
              }
            : person
        ),
      };
    case "DESELECT_MEAL":
      return {
        ...state,
        people: state.people.map((person) =>
          person.id === action.payload.personId
            ? { ...person, selectedMeal: null, selectedDrink: null }
            : person
        ),
      };
    case "SELECT_DRINK":
      return {
        ...state,
        people: state.people.map((person) =>
          person.id === action.payload.personId &&
          person.selectedMeal === action.payload.mealId
            ? { ...person, selectedDrink: action.payload.drinkId }
            : person
        ),
      };
    case "DESELECT_DRINK":
      return {
        ...state,
        people: state.people.map((person) =>
          person.id === action.payload.personId
            ? { ...person, selectedDrink: null }
            : person
        ),
      };
    case SET_SELECTED_TAG:
      return {
        ...state,
        selectedTag: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
