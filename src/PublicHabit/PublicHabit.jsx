import React, { useEffect, useState } from "react";
import UseAxios from "../Hooks/UseAxios";
import { Link } from "react-router";
import { FaGripfire } from "react-icons/fa";
import Loader from "../Authentication/Loader";

const PublicHabit = () => {
  const { AxiosInstance } = UseAxios();

  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AxiosInstance.get("/habits")
      .then((res) => {
        
        setHabits(res.data);
        console.log(res.data)
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  // 🔄 Loading
  if (loading) {
    return <div className="mx-auto my-80 flex justify-center"><Loader></Loader></div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-secondary mb-6">
        Public Habits
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {habits.map((habit) => (
          <Link key={habit._id} to={`/habits/${habit._id}`}>
            <div className="card bg-base-200 shadow-lg p-4 hover:shadow-xl transition duration-300 cursor-pointer">

              {/* Image */}
              <img
                src={habit.image || "https://via.placeholder.com/300"}
                alt=""
                className="w-full h-40 object-cover rounded-lg mb-3"
              />

              {/* Title */}
              <h3 className="font-bold text-xl text-secondary">
                {habit.title}
              </h3>

              {/* Category */}
              <p className="text-xs px-2 py-1 w-fit rounded bg-green-500 text-white mt-2">
                {habit.category}
              </p>

              {/* Description */}
              <p className="text-sm mt-2 text-gray-400">
                {habit.description?.slice(0, 70)}...
              </p>

              {/* Footer */}
              <div className="flex justify-between items-center mt-4">
                <span className="flex items-center gap-1 text-orange-400 font-semibold">
                  <FaGripfire />
                  {habit.streak || 0}
                </span>

                <span className="text-xs text-gray-500">
                  {habit.userName}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty */}
      {habits.length === 0 && (
        <p className="text-center mt-6 text-gray-400">
          No habits found 😢
        </p>
      )}
    </div>
  );
};

export default PublicHabit;