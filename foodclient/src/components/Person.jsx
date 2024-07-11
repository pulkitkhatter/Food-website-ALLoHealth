import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectperson } from "../store/action";
import axios from "axios";

function Person() {
  const people = useSelector((state) => state.meals.people);
  const selectedPerson = useSelector((state) => state.meals.selectedPerson);
  const [mealsArray, setMealsArray] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getmeals");
        setMealsArray(response.data);
      } catch (error) {
        console.error("Error fetching meals data:", error);
      }
    };

    fetchMeals();
  }, []);

  const selectedPersonData = people.find(
    (person) => person.id === selectedPerson
  );
  const selectedMeal = selectedPersonData
    ? mealsArray.find((meal) => meal.id === selectedPersonData.selectedMeal)
    : null;
  const selectedDrink =
    selectedPersonData && selectedMeal
      ? selectedMeal.drinks.find(
          (drink) => drink.id === selectedPersonData.selectedDrink
        )
      : null;

  const totalCost = selectedMeal
    ? selectedMeal.price + (selectedDrink ? selectedDrink.price : 0)
    : 0;

  const tagColors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-indigo-500",
    "bg-purple-500",
    "bg-pink-500",
  ];

  return (
    <div
      className="min-h-screen bg-gray-100 flex items-center justify-center bg-fixed bg-cover"
      style={{ backgroundImage: "url('/path/to/your/background-image.jpg')" }}
    >
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Select Passenger
        </h2>
        <div className="space-y-3 mb-6">
          {people.map((person) => (
            <div
              key={person.id}
              className={`rounded-lg p-4 cursor-pointer transition-colors duration-300 ${
                tagColors[person.id % tagColors.length]
              } ${
                selectedPerson === person.id
                  ? "bg-blue-800 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => dispatch(selectperson(person.id))}
            >
              <p className="text-lg font-medium">{person.name}</p>
            </div>
          ))}
        </div>
        {selectedPersonData && (
          <div className="space-y-6">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Selected Meal
              </h3>
              {selectedMeal ? (
                <div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">
                    {selectedMeal.title}
                  </h4>
                  <p className="text-gray-700 mb-1">
                    <strong>Price:</strong> ${selectedMeal.price.toFixed(2)}
                  </p>
                </div>
              ) : (
                <p className="text-gray-700">No meal selected</p>
              )}
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Selected Drink
              </h3>
              {selectedDrink ? (
                <div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">
                    {selectedDrink.title}
                  </h4>
                  <p className="text-gray-700 mb-1">
                    <strong>Price:</strong> ${selectedDrink.price.toFixed(2)}
                  </p>
                </div>
              ) : (
                <p className="text-gray-700">No drink selected</p>
              )}
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Total Cost
              </h3>
              <p className="text-2xl font-bold text-gray-800">
                ${totalCost.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Person;
