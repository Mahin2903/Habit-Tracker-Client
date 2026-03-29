import React, { useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router";
import UseAxios from "../Hooks/UseAxios";
import UseAuth from "../Hooks/UseAuth";
import Swal from "sweetalert2";
import { FaGripfire } from "react-icons/fa";

const HabitDetails = () => {
  const data = useLoaderData();
  const { AxiosInstance } = UseAxios();
  const { user } = UseAuth();
  const location = useLocation();
  const navigate = useNavigate();

//   console.log(location);

  if (location.state) {
    navigate(location.state);
  }

//   useEffect(() => {
//     if (!location.state) {
//       navigate("/");
//     }
//   }, [location.state, navigate]);

  const isOwner = user?.email === data.userEmail;

  const [habit, setHabit] = useState({
    ...data,
    streak: data.streak || 0,
    completionHistory: data.completionHistory || [],
  });

  // ✅ Progress (last 30 days)
  const calculateProgress = () => {
    const today = new Date();
    let count = 0;

    for (let i = 0; i < 30; i++) {
      const d = new Date();
      d.setDate(today.getDate() - i);

      const exists = habit.completionHistory.some(
        (date) => new Date(date).toDateString() === d.toDateString(),
      );

      if (exists) count++;
    }

    return Math.round((count / 30) * 100);
  };

  const progress = calculateProgress();

  // ✅ COMPLETE (only if owner)
  const handleComplete = () => {
    const today = new Date().toDateString();

    const alreadyDone = habit.completionHistory.some(
      (d) => new Date(d).toDateString() === today,
    );

    if (alreadyDone) {
      return Swal.fire("Already completed today!");
    }

    const updatedHistory = [...habit.completionHistory, new Date()];

    const yesterday = new Date();
    yesterday.setDate(new Date().getDate() - 1);

    const lastDate =
      habit.completionHistory.length > 0
        ? new Date(
            habit.completionHistory[habit.completionHistory.length - 1],
          ).toDateString()
        : null;

    let newStreak = 1;

    if (lastDate === yesterday.toDateString()) {
      newStreak = habit.streak + 1;
    }

    AxiosInstance.patch(`/habits/${habit._id}`, {
      completionHistory: updatedHistory,
      streak: newStreak,
    }).then(() => {
      setHabit({
        ...habit,
        completionHistory: updatedHistory,
        streak: newStreak,
      });

      Swal.fire({
        title: "Completed!",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
      });
    });
  };

  // ✅ ADOPT (with already-added check)
  const handleAdopt = async () => {
    try {
      // 🔍 Check existing habits
      const res = await AxiosInstance.get("/habits", {
        params: { email: user.email },
      });

      const alreadyExists = res.data.some(
        (h) => h.originalId === habit._id || h._id === habit._id,
      );

      if (alreadyExists) {
        return Swal.fire({
          icon: "warning",
          title: "Already Added",
          text: "This habit is already in your list",
        });
      }

      // ✅ Add habit
      await AxiosInstance.post(`/habits/adopt/${habit._id}`, {
        userEmail: user.email,
        userName: user.displayName,
      });

      Swal.fire({
        title: "Added to your habits!",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-base-200 rounded-2xl shadow-xl overflow-hidden">
        {/* Image */}
        <img
          src={habit.image || "https://via.placeholder.com/800x300"}
          alt=""
          className="w-full h-64 object-cover"
        />

        <div className="p-6">
          {/* Title */}
          <h1 className="text-3xl font-bold text-secondary">{habit.title}</h1>

          {/* Category */}
          <span className="inline-block mt-2 px-3 py-1 text-sm bg-green-500 text-white rounded-full">
            {habit.category}
          </span>

          {/* Description */}
          <p className="mt-4 text-gray-300 leading-relaxed">
            {habit.description}
          </p>

          {/* Creator */}
          <p className="mt-4 text-sm text-gray-400">
            Created by:{" "}
            <span className="text-secondary font-semibold">
              {habit.userName}
            </span>
          </p>

          {/* Streak */}
          <div className="mt-4">
            <span className="badge flex items-center gap-2 badge-secondary px-4 py-3 text-white">
              <FaGripfire /> Streak: {habit.streak}
            </span>
          </div>

          {/* Progress */}
          <div className="mt-6">
            <p className="mb-2 font-semibold">
              Progress (Last 30 Days): {progress}%
            </p>

            <progress
              className="progress progress-secondary w-full"
              value={progress}
              max="100"
            ></progress>
          </div>

          {/* 🔥 Button */}
          {isOwner ? (
            <button
              onClick={handleComplete}
              className="btn btn-secondary w-full mt-6"
            >
              Mark Complete
            </button>
          ) : (
            <button
              onClick={handleAdopt}
              className="btn btn-secondary w-full mt-6"
            >
              Start This Habit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HabitDetails;
