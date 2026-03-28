import React from "react";
import { Link, useNavigate, } from "react-router";
import UseAuth from "../Hooks/UseAuth";

const Register = () => {
    const navigate = useNavigate();
  const { SignUp, updateUser } = UseAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const imageFile = form.image.files[0];
    const password = form.password.value;

    try {
      // ✅ 1. Upload image to imgbb
      const formData = new FormData();
      formData.append("image", imageFile);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!data.success) {
        throw new Error("Image upload failed");
      }

      const imageURL = data.data.url;

      // ✅ 2. Create user
      const result = await SignUp(email, password);
      // eslint-disable-next-line no-unused-vars
      const user = result.user;

      // ✅ 3. Update profile with URL (NOT file)
      await updateUser({
        displayName: name,
        photoURL: imageURL,
      });

      alert("Account created successfully");
      navigate("/")
      form.reset();

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="card w-full max-w-md shadow-2xl bg-base-200">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center text-secondary mb-4">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              className="input w-full input-bordered"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your email"
              className="input w-full input-bordered"
              required
            />

            <input
              type="file"
              name="image"
              accept="image/*"
              className="file-input w-full file-input-bordered"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input w-full input-bordered"
              required
            />

            <button className="btn w-full bg-accent text-white hover:bg-secondary border-none">
              Register
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-accent hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;