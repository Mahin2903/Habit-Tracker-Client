import React, { useEffect, useState } from "react";
import UseAxios from "../Hooks/UseAxios";
import UseAuth from "../Hooks/UseAuth";
import Swal from "sweetalert2";
import Loader from "../Authentication/Loader";

const MyHabits = () => {
  const { user } = UseAuth();
  const { AxiosInstance } = UseAxios();

  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Modal state
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Load habits
  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);

    AxiosInstance.get(`/habits?email=${user?.email}`)
      .then((res) => setHabits(res.data))
      .catch(() => {
        Swal.fire("Error", "Failed to load habits", "error");
      })
      .finally(() => setLoading(false));
  }, [user]);

  // 🗑 Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This habit will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        AxiosInstance.delete(`/habits/${id}`)
          .then(() => {
            setHabits((prev) => prev.filter((h) => h._id !== id));

            Swal.fire("Deleted!", "Habit deleted", "success");
          })
          .catch(() => {
            Swal.fire("Error", "Delete failed", "error");
          });
      }
    });
  };

  // ✅ Complete
  const handleComplete = (habit) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const todayStr = today.toDateString();
    const lastDateStr = habit.lastCompletedDate
      ? new Date(habit.lastCompletedDate).toDateString()
      : null;

    if (lastDateStr === todayStr) {
      return Swal.fire("Already done today!");
    }

    let newStreak = 1;
    if (lastDateStr === yesterday.toDateString()) {
      newStreak = (habit.streak || 0) + 1;
    }

    AxiosInstance.patch(`/habits/${habit._id}`, {
      completed: true,
      streak: newStreak,
      lastCompletedDate: today,
    }).then(() => {
      setHabits((prev) =>
        prev.map((h) =>
          h._id === habit._id
            ? { ...h, streak: newStreak, lastCompletedDate: today }
            : h,
        ),
      );
    });
  };

  // ✅ Update Handler
  const handleUpdate = (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedHabit = {
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      time: form.time.value,
      image: form.image.value || selectedHabit.image,
    };

    AxiosInstance.patch(`/habits/${selectedHabit._id}`, updatedHabit)
      .then(() => {
        setHabits((prev) =>
          prev.map((h) =>
            h._id === selectedHabit._id ? { ...h, ...updatedHabit } : h,
          ),
        );

        Swal.fire({
          icon: "success",
          title: "Updated!",
          timer: 1200,
          showConfirmButton: false,
        });

        setIsModalOpen(false);
      })
      .catch(() => {
        Swal.fire("Error", "Update failed", "error");
      });
  };

  // 🔄 Loading
  if (loading) {
    return (
      <div className="mx-auto my-80 flex justify-center">
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div className="p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold text-secondary mb-4">My Habits</h2>

      <table className="table w-full bg-base-200 rounded-lg">
        <thead>
          <tr className="text-secondary">
            <th>Title</th>
            <th>Category</th>
            <th>Streak</th>
            <th className="hidden md:block">Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {habits.map((habit) => (
            <tr key={habit._id}>
              <td>{habit.title}</td>
              <td>{habit.category}</td>
              <td>{habit.streak || 0} 🔥</td>
              <td className="hidden md:block">
                {new Date(habit.createdAt).toLocaleDateString()}
              </td>

              <td className="space-x-2">
                {/* Update */}
                <button
                  onClick={() => {
                    setSelectedHabit(habit);
                    setIsModalOpen(true);
                  }}
                  className="btn btn-xs btn-outline btn-secondary"
                >
                  Update
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(habit._id)}
                  className="btn btn-xs btn-error text-white"
                >
                  Delete
                </button>

                {/* Complete */}
                <button
                  onClick={() => handleComplete(habit)}
                  className="btn btn-xs btn-success text-white"
                >
                  Done
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {habits.length === 0 && (
        <p className="text-center mt-6 text-gray-400">No habits found 😢</p>
      )}

      {isModalOpen && selectedHabit && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-base-200 p-6 rounded-xl w-full max-w-lg shadow-xl">
            <h2 className="text-xl font-bold text-secondary mb-4">
              Update Habit
            </h2>

            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                type="text"
                name="title"
                defaultValue={selectedHabit.title}
                className="input input-bordered w-full"
                required
              />

              <textarea
                name="description"
                defaultValue={selectedHabit.description}
                className="textarea textarea-bordered w-full"
                required
              />

              <select
                name="category"
                defaultValue={selectedHabit.category}
                className="select select-bordered w-full"
              >
                <option>Morning</option>
                <option>Work</option>
                <option>Fitness</option>
                <option>Evening</option>
                <option>Study</option>
              </select>

              <input
                type="time"
                name="time"
                defaultValue={selectedHabit.time}
                className="input input-bordered w-full"
              />

              <input
                type="text"
                name="image"
                defaultValue={selectedHabit.image}
                className="input input-bordered w-full"
              />

              <input
                value={selectedHabit.userEmail}
                readOnly
                className="input input-bordered w-full bg-gray-200"
              />

              <input
                value={selectedHabit.userName}
                readOnly
                className="input input-bordered w-full bg-gray-200"
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-sm"
                >
                  Cancel
                </button>

                <button className="btn btn-secondary btn-sm">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyHabits;
