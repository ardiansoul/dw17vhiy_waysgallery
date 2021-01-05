import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import { API, options } from "../utils/API";

function EditProfilepage() {
  const [mutate] = useMutation((form) => {
    return API.patch(`/user`, { data: form }, options);
  });

  const [artMutate] = useMutation((form) => {
    return API.post(`/upload-arts`, { data: form }, options);
  });

  const [form, setForm] = useState({
    greating: "",
    fullName: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatar = (e) => {
    let imageReader = new FileReader();

    setAvatar(e.target.files[0]);

    imageReader.onloadend = () => {
      setPreview([imageReader.result]);
    };

    imageReader.readAsDataURL(e.target.files[0]);
  };

  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("greating", form.greating);
      data.append("fullName", form.fullName);
      data.append("avatar", avatar);

      await mutate(data, {
        onSuccess: () => {
          history.push("/profile");
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const onDrop = useCallback(async (acceptFiles) => {
    try {
      const art = new FormData();
      art.append("image", acceptFiles[0]);

      await artMutate(art, {
        onSuccess: () => {},
        onError: (error) => {
          console.error({ error });
        },
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  const { getInputProps, getRootProps } = useDropzone({ onDrop });

  return (
    <div className="w-full h-screen relative">
      <Header />
      <div className="w-8/12 m-auto flex justify-between">
        <div className="w-8/12">
          <div
            className="w-full flex justify-center items-center
            border-2 border-base outline-none rounded-md"
            style={{
              height: "400px",
            }}
            {...getRootProps()}
          >
            <input
              {...getInputProps()}
              className="hidden"
              type="file"
              multiple
            />
            <h1 className="font-bold text-xl">
              <span className="text-base">Upload</span> Best Your Art
            </h1>
          </div>
        </div>
        <div className="w-3/12">
          <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            {preview ? (
              <div className="w-32 h-32 flex justify-center items-center mb-10 p-2 border-dashed border-4 border-base rounded-full">
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover object-center rounded-full"
                />
              </div>
            ) : (
              <label
                className="w-32 h-32 flex justify-center items-center mb-10 p-2 border-dashed border-4 border-base rounded-full"
                style={{ cursor: "pointer" }}
              >
                <FontAwesomeIcon
                  icon={faCamera}
                  className="text-6xl text-base"
                />
                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    handleAvatar(e);
                  }}
                />
              </label>
            )}
            <input
              type="text"
              className="w-full h-10 rounded-md px-2 border-2 border-base mb-6"
              placeholder="Greeting"
              name="greating"
              value={form.greating}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <input
              type="text"
              className="w-full h-10 rounded-md px-2 border-2 border-base mb-6"
              placeholder="Full Name"
              name="fullName"
              value={form.fullName}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <button
              type="submit"
              className="w-20 h-8 bg-base text-white rounded-md"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfilepage;
