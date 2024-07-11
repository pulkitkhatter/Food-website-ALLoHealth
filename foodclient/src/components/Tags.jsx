import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setSelectedTag } from "../store/action";

function Tags() {
  const [labels, setLabels] = useState([]);
  const selectedTag = useSelector((state) => state.meals.selectedTag);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const response = await axios.get(
          "https://allo-health-backend-1.onrender.com/getlabels"
        );
        setLabels([{ id: "All", label: "All" }, ...response.data]);
      } catch (error) {
        console.error("Error fetching labels:", error);
      }
    };

    fetchLabels();
  }, []);

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
    <div className="p-5">
      <div className="bg-white flex flex-wrap gap-4 w-full p-4 rounded-lg shadow-md">
        {labels.map((tag, index) => (
          <div
            key={tag.id}
            className={`rounded-full px-4 py-2 cursor-pointer flex items-center justify-center text-center text-white transition-all duration-200 ease-in-out ${
              tagColors[index % tagColors.length]
            } ${
              selectedTag === tag.id
                ? "scale-105 shadow-lg bg-teal-700"
                : "hover:scale-105 hover:bg-teal-600"
            }`}
            onClick={() => dispatch(setSelectedTag(tag.id))}
          >
            {tag.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tags;
