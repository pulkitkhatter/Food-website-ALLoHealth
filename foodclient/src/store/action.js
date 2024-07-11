// action.js
export const SELECT_PERSON = "SELECT_PERSON";
export const SELECT_MEAL = "SELECT_MEAL";
export const DESELECT_MEAL = "DESELECT_MEAL";
export const SELECT_DRINK = "SELECT_DRINK";
export const DESELECT_DRINK = "DESELECT_DRINK";
export const SET_SELECTED_TAG = "SET_SELECTED_TAG";
export const ADD_PERSON = "ADD_PERSON";
export const selectperson = (personId) => ({
  type: SELECT_PERSON,
  payload: personId,
});

export const selectmeal = (personId, mealId) => ({
  type: "SELECT_MEAL",
  payload: { personId, mealId },
});

export const addPerson = (person) => ({
  type: ADD_PERSON,
  payload: person,
});
export const deselectmeal = (personId) => ({
  type: "DESELECT_MEAL",
  payload: { personId },
});

export const selectdrink = (personId, mealId, drinkId) => ({
  type: "SELECT_DRINK",
  payload: { personId, mealId, drinkId },
});

export const deselectdrink = (personId) => ({
  type: "DESELECT_DRINK",
  payload: { personId },
});

export const setSelectedTag = (tag) => ({
  type: SET_SELECTED_TAG,
  payload: tag,
});
