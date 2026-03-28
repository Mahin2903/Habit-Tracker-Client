import React, { useEffect, useState } from "react";
import UseAxios from "../../Hooks/UseAxios";
import { Link } from "react-router";
import { FaGripfire } from "react-icons/fa";
import Loader from "../../Authentication/Loader";

const RecentHabits = () => {
  const { AxiosInstance } = UseAxios();

  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch recent habits
  useEffect(() => {
    AxiosInstance.get("/recentHabits")
      .then((res) => {
        setHabits(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  // 🔄 Loading UI
  if (loading) {
    return (
      <div className="mx-auto my-80 flex justify-center">
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold text-secondary mb-6 text-center my-10">
        Recent Habits
      </h2>

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {habits.map((habit) => (
          <Link
            to={`/habits/${habit._id}`}
            key={habit._id}
            className="card bg-base-200 shadow-lg p-4 hover:shadow-xl transition duration-300"
          >
            {/* Image */}
            <img
              src={habit.image || "https://via.placeholder.com/300"}
              alt=""
              className="w-full h-40 object-cover rounded-lg mb-3"
            />

            {/* Title */}
            <h3 className="font-bold text-xl text-secondary">{habit.title}</h3>

            {/* Category */}
            <p className="text-sm w-fit  px-2 text-white py-0.5 rounded-2xl bg-green-400 text-gray-500">
              {habit.category}
            </p>

            {/* Description */}
            <p className="text-sm mt-2 text-gray-400">
              {habit.description?.slice(0, 60)}...
            </p>

            {/* Footer */}
            <div className="flex justify-between items-center mt-4">
              <span className="text-secondary flex items-center font-semibold">
                <FaGripfire></FaGripfire> {habit.streak || 0}
              </span>

              <span className="text-xs text-gray-400">{habit.userName}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {habits.length === 0 && (
        <p className="text-center text-gray-400 mt-6">
          No recent habits found 😢
        </p>
      )}
    </div>
  );
};

export default RecentHabits;
