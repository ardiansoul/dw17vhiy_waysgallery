import Axios from "axios";
import { useCallback, useState } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import { baseUrl } from "../utils/API";
import { useDropzone } from "react-dropzone";
import cloud from "../assets/image/cloud.png";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function AddPostpage() {
  const [localState, setLocalState] = useState({
    form: {
      title: "",
      description: "",
    },
    preview: [],
  });
  const [photo, setPhoto] = useState([]);

  const onDrop = useCallback(
    (acceptFiles) => {
      let imageReader = new FileReader();

      setPhoto([...photo, acceptFiles[0]]);

      imageReader.onloadend = () => {
        setLocalState({
          ...localState,
          preview: [...localState.preview, imageReader.result],
        });
      };
      imageReader.readAsDataURL(acceptFiles[0]);
    },
    [localState, photo]
  );

  const history = useHistory();

  const [mutate] = useMutation((form) => {
    return Axios({
      method: "post",
      url: `${baseUrl}api/v1/post`,
      data: form,
      headers: {
        Authorization: localStorage.token,
        withCredentials: true,
        "Access-Control-Allow-Origin": "*",
      },
    });
  });

  const handleChange = (e) => {
    setLocalState({
      ...localState,
      form: { ...localState.form, [e.target.name]: e.target.value },
    });
  };

  const CKhandler = (event, editor) => {
    const data = editor.getData();
    setLocalState({
      ...localState,
      form: { ...localState.form, description: data },
    });
  };

  const { getInputProps, getRootProps } = useDropzone({ onDrop });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", localState.form.title);
      data.append("description", localState.form.description);
      for (let i = 0; i < photo.length; i++) {
        data.append(`photos`, photo[i]);
      }
      await mutate(data, {
        onSuccess: (data) => {
          history.push("/");
        },
        onError: (error) => {
          console.log({ error });
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full relative">
      <Header />
      <div className="w-10/12 pb-10 flex m-auto justify-between">
        <div
          className="w-6/12"
          style={{
            height: "500px",
            // width: "500px",
          }}
        >
          <div
            className="w-full mb-4 flex justify-center items-center
            border-2 border-base outline-none rounded-md"
            style={{
              height: "350px",
            }}
            {...getRootProps()}
          >
            <input
              {...getInputProps()}
              placeholder="Product Photo"
              className="hidden"
              type="file"
              multiple
            />
            <img src={cloud} alt="upload" />
          </div>
          {localState.preview ? (
            <div className="flex w-full">
              <div
                className="border-2 border-base mx-2 relative"
                style={{
                  width: "300px",
                  height: "150px",
                }}
              >
                {localState.preview[0] && (
                  <img
                    src={localState?.preview[0]}
                    alt={"input"}
                    className="w-full h-full object-cover object-center"
                  />
                )}
              </div>
              <div
                className="border-2 border-base mx-2"
                style={{
                  width: "300px",
                  height: "150px",
                }}
              >
                {localState.preview[1] && (
                  <img
                    src={localState?.preview[1]}
                    alt={"input"}
                    className="w-full h-full object-cover object-center"
                  />
                )}
              </div>
              <div
                className="border-2 border-base mx-2"
                style={{
                  width: "300px",
                  height: "150px",
                }}
              >
                {localState.preview[2] && (
                  <img
                    src={localState?.preview[2]}
                    alt={"input"}
                    className="w-full h-full object-cover object-center"
                  />
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="w-5/12">
          <form
            className="flex flex-col mt-10"
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              type="text"
              placeholder="Title"
              className="w-full h-10 mb-10 outline-none bg-white border-2 border-base p-2 rounded-md"
              name="title"
              // style={}
              onChange={(e) => handleChange(e)}
              value={localState.form.title}
            />
            <CKEditor
              // className="h-screen mt-20"
              editor={ClassicEditor}
              data={localState.form.description}
              onChange={CKhandler}
            />
            {/* <textarea
              className="w-full h-32 bg-red-200 border-2 outline-none bg-white border-base p-2 rounded-md mt-6"
              name="description"
              onChange={(e) => handleChange(e)}
              value={localState.form.description}
            ></textarea> */}
            <div className="w-full flex justify-center items-center">
              <button
                className="w-20 h-8 bg-white border-2 border-base mt-6 mr-4 rounded-md self-center"
                onClick={() => history.push("/")}
              >
                Cancel
              </button>
              <button
                className="w-20 h-8 bg-base text-white mt-6 rounded-md self-center"
                type="submit"
              >
                Add Post
              </button>
            </div>{" "}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPostpage;
