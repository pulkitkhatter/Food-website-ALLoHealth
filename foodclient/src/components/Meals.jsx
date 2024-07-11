import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  selectmeal,
  deselectmeal,
  selectdrink,
  deselectdrink,
} from "../store/action";
import wine from "../assets/sweetrosewine.jpg";
import juice from "../assets/juice-glass.jpg";
import beer from "../assets/beer.avif";

function Meals() {
  const [mealsArray, setMealsArray] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const mealsPerPage = 2;

  const selectedTag = useSelector((state) => state.meals.selectedTag);
  const selectedPerson = useSelector((state) => state.meals.selectedPerson);
  const selectedPersonData = useSelector((state) =>
    state.meals.people.find(
      (person) => person.id === state.meals.selectedPerson
    )
  );
  const dispatch = useDispatch();

  const drinkImages = {
    Vine: wine,
    Juice: juice,
    Beer: beer,
  };

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get(
          "https://run.mocky.io/v3/4dac4f98-a3d6-445f-8011-e349ec686a54"
        );
        setMealsArray(response.data);
      } catch (error) {
        console.error("Error fetching meals data:", error);
      }
    };

    fetchMeals();
  }, []);

  useEffect(() => {
    if (selectedTag === "All") {
      setFilteredMeals(mealsArray);
    } else {
      const filtered = mealsArray.filter((meal) =>
        meal.labels.includes(selectedTag)
      );
      setFilteredMeals(filtered);
    }
  }, [selectedTag, mealsArray]);

  const handleSelectMeal = (mealId) => {
    if (selectedPersonData?.selectedMeal === mealId) {
      dispatch(deselectmeal(selectedPerson));
    } else {
      dispatch(selectmeal(selectedPerson, mealId));
    }
  };

  const handleSelectDrink = (mealId, drinkId) => {
    if (
      selectedPersonData?.selectedDrink === drinkId &&
      selectedPersonData?.selectedMeal === mealId
    ) {
      dispatch(deselectdrink(selectedPerson));
    } else {
      dispatch(selectdrink(selectedPerson, mealId, drinkId));
    }
  };

  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = filteredMeals.slice(indexOfFirstMeal, indexOfLastMeal);

  const totalPages = Math.ceil(filteredMeals.length / mealsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const tagColors = [
    "bg-teal-500",
    "bg-orange-500",
    "bg-lime-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-cyan-500",
    "bg-amber-500",
  ];

  return (
    <div className="p-4 overflow-x-hidden">
      {currentMeals.map((meal) => (
        <div
          key={meal.id}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-6"
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 w-full h-48 md:h-auto">
              <img
                className="w-full h-full object-cover"
                src={meal.img}
                alt={meal.title}
                style={{ maxHeight: "300px" }} // Adjust max height as needed
              />
            </div>
            <div className="p-5 flex flex-col justify-between w-full">
              <div>
                <h2 className="text-2xl font-bold mb-3 text-teal-700">
                  {meal.title}
                </h2>
                <p className="text-gray-700 mb-2">
                  <strong>Starter:</strong> {meal.starter}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Desert:</strong> {meal.desert}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Price:</strong> ${meal.price.toFixed(2)}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {meal.labels.map((label, index) => (
                    <span
                      key={label}
                      className={`rounded-full px-3 py-1 text-sm text-white ${
                        tagColors[index % tagColors.length]
                      }`}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2 text-teal-700">
                  Drinks
                </h2>
                <div className="flex flex-row flex-wrap gap-4">
                  {meal.drinks.map((drink) => (
                    <div
                      key={drink.id}
                      className={`flex items-center cursor-pointer rounded-lg p-3 font-medium transition-colors ${
                        selectedPersonData?.selectedDrink === drink.id &&
                        selectedPersonData?.selectedMeal === meal.id
                          ? "bg-teal-200"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                      onClick={() => handleSelectDrink(meal.id, drink.id)}
                    >
                      {drinkImages[drink.title] && (
                        <img
                          src={drinkImages[drink.title]}
                          alt={drink.title}
                          className="w-12 h-12 mr-3 rounded-full"
                        />
                      )}
                      {drink.title}
                    </div>
                  ))}
                  {selectedPerson && (
                    <button
                      className={`mt-3 px-4 py-2 rounded-lg font-medium ${
                        selectedPersonData.selectedMeal === meal.id
                          ? "bg-purple-300 border border-purple-400"
                          : "bg-amber-300 border border-amber-400"
                      }`}
                      onClick={() => handleSelectMeal(meal.id)}
                    >
                      {selectedPersonData.selectedMeal === meal.id
                        ? "Deselect"
                        : "Select"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-center mt-6">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="mx-2 px-4 py-2 bg-purple-300 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="mx-2 px-4 py-2 bg-purple-300 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Meals;
