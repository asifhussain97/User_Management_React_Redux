import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userEdit, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { profileValidate } from "./validate";
const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, update, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const [userData, setUserData] = useState({
    name: "",
    email: "",

    image: "",
    userId: "",
  });
  const [error, setError] = useState({
    name: "",
    email: "",
    image: "",
  });
  const [image, setImage] = useState("");

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate("/login");
    } else {
      console.log(user, "user");
      setUserData({
        userId: user._id,
        name: user.name,
        email: user.email,

        image: user.image || "",
      });
    }
    dispatch(reset());
  }, [user, isError, isSuccess, dispatch, message, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({}); // Reset error state

    const errors = profileValidate(userData);
    if (Object.keys(errors).length !== 0) {
      console.log("jhfjdhfjkdh", userData, "djgsjgdjsgj", errors);
      setError(errors); // Set error state if validation fails
    } else {
      // If no errors, proceed with submission
      const { userId, name, email, image } = userData;
      dispatch(userEdit({ userId, name, email, image })).then(() => {
        toast.success("Update successful");
      });
    }
  };

  const uploadImage = (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload a file");

      return;
    }

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "eys3nf4g");
    data.append("cloud_name", "dgkfbywof");

    fetch("https://api.cloudinary.com/v1_1/dgkfbywof/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUserData({ ...userData, image: data.url });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
    <div className="container">
  <button
    className="btn btn-primary m-3"
    onClick={() => {
      navigate("/");
    }}
  >
    Back
  </button>

  <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
    <form action="" encType="multipart/form-data">
      <div className="bg-gradient rounded-lg p-4 d-flex justify-content-between">
        <div className="d-flex flex-column align-items-center w-50 p-2"> 
          <div className="profile">
            <div className="profile-image mb-3">
              <img
                src={userData?.image ? userData.image : "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg"}
                alt="profile"
                className="img-fluid"
              />
            </div>

            <div className="profile-card">
              <div className="profile-buttons">
                <div className="mb-3">
                  <label htmlFor="profile" className="btn btn-secondary">
                    Choose File
                  </label>
                  <input
                    onChange={(e) => setImage(e.target.files[0])}
                    type="file"
                    name="profile"
                    id="profile"
                    className="d-none"
                  />
                </div>
                {error.image && (
                  <p className="text-danger">{error.image}</p>
                )}

                <button className="btn btn-primary" onClick={uploadImage}>
                  Upload!
                </button>
              </div>
              <input
                name="userId"
                type="hidden"
                value={userData.userId}
              />
            </div>
          </div>
        </div>

        <div className="w-50 p-5 mt-5">              
          <div className="mb-3 mt-4">
            <label htmlFor="user_name" className="form-label">
              User Name
            </label>
            <input
              name="name"
              type="text"
              className="form-control"
              value={userData.name}
              onChange={handleInputChange}
            />
            {error.name && <p className="text-danger">{error.name}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              value={userData.email}
              onChange={handleInputChange}
            />
            {error.email && <p className="text-danger">{error.email}</p>}
          </div>

          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-success"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>

    </>
  );
};

export default Profile;