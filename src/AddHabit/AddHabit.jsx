import React from "react";
import UseAuth from "../Hooks/UseAuth";
import UseAxios from "../Hooks/UseAxios";
import Swal from "sweetalert2";

const AddHabit = () => {
  const { user } = UseAuth();
  const { AxiosInstance } = UseAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const created_at = new Date().toISOString();

    const form = e.target;

    const habitData = {
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      time: form.time.value,
      image: form.image.value, // optional (URL for now)
      userEmail: user?.email,
      userName: user?.displayName,
      createdAt: created_at,
    };

 
    AxiosInstance.post("/habits", habitData)
      .then((data) => {
        // console.log(data.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-100 px-4">
      <div className="card w-full max-w-lg bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center text-secondary">
            Add New Habit
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <input
              type="text"
              name="title"
              placeholder="Habit Title"
              className="input input-bordered w-full"
              required
            />

            {/* Description */}
            <textarea
              name="description"
              placeholder="Description"
              className="textarea textarea-bordered w-full"
              required
            ></textarea>

            {/* Category */}
            <select
              name="category"
              className="select select-bordered w-full"
              required
            >
              <option value="">Select Category</option>
              <option>Morning</option>
              <option>Work</option>
              <option>Fitness</option>
              <option>Evening</option>
              <option>Study</option>
            </select>

            {/* Time */}
            <input
              type="time"
              name="time"
              className="input input-bordered w-full"
              required
            />

            {/* Image (optional) */}
            <input
              type="text"
              name="image"
              placeholder="Image URL (optional)"
              className="input input-bordered w-full"
            />

            {/* User Email (readonly) */}
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full bg-gray-200"
            />

            {/* User Name (readonly) */}
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered w-full bg-gray-200"
            />

            {/* Submit */}
            <button className="btn btn-secondary w-full">Add Habit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddHabit;
