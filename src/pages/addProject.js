import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Header from "../components/Header";
import cloud from "../assets/image/cloud.png";
import { useMutation } from "react-query";

import { API, options } from "../utils/API";
import { useHistory } from "react-router-dom";

function AddProject({ location }) {
  console.log(location.state.id);
  const [transactionMutate] = useMutation(
    () => {
      return API.patch(
        `/transaction/${location.state.id}`,
        { status: "Waiting Approve Project" },
        options
      );
    },
    {
      onSuccess: () => {
        history.push("/transaction");
      },
    }
  );

  const [mutate] = useMutation((form) => {
    return API.post(`/project`, form, options);
  });

  const [localState, setLocalState] = useState({
    form: {
      description: "",
    },
    preview: [],
  });

  const [photo, setPhoto] = useState([]);

  const handleChange = (e) => {
    setLocalState({
      ...localState,
      form: { ...localState.form, [e.target.name]: e.target.value },
    });
  };

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(location.state.id);
    const form = new FormData();
    form.append("transactionId", location.state.id);
    form.append("description", localState.form.description);
    photo.map((photo) => form.append("photos", photo));

    await mutate(form, {
      onSuccess: async (data) => {
        await transactionMutate();
      },
    });
  };

  const { getInputProps, getRootProps } = useDropzone({ onDrop });

  return (
    <div className="w-full h-screen relative">
      <Header />
      <div className="w-8/12 flex justify-between m-auto mt-10">
        <div className="w-7/12">
          <div
            className="w-full flex flex-col items-center justify-center h-64 border-base border-2"
            {...getRootProps()}
            style={{
              height: "300px",
            }}
          >
            <img
              src={cloud}
              alt="upload"
              className="w-64 object-cover object-center"
            />
            <label className="font-bold -mt-6">
              <span className="text-base">Browse</span> to choose a file
            </label>
            <input type="file" {...getInputProps()} />
          </div>
          <div className="w-full h-32 flex mt-4">
            <div className="w-1/4 h-24 border-base border-2">
              {photo[0] && (
                <img
                  src={localState.preview[0]}
                  alt="project"
                  className="w-full h-full object-center object-cover"
                />
              )}
            </div>
            <div className="w-1/4 h-24 mx-2 border-base border-2">
              {photo[1] && (
                <img
                  src={localState.preview[1]}
                  alt="project"
                  className="w-full h-full object-center object-cover"
                />
              )}
            </div>
            <div className="w-1/4 h-24  border-base mr-2 border-2">
              {photo[2] && (
                <img
                  src={localState.preview[2]}
                  alt="project"
                  className="w-full h-full object-center object-cover"
                />
              )}
            </div>
            <div className="w-1/4 h-24  border-base border-2">
              {photo[3] && (
                <img
                  src={localState.preview[3]}
                  alt="project"
                  className="w-full h-full object-center object-cover"
                />
              )}
            </div>
          </div>
        </div>
        <div className="w-4/12">
          <textarea
            className="w-full h-64 border-2 rounded-md border-base p-4"
            placeholder="Description"
            value={localState.form.description}
            onChange={(e) => handleChange(e)}
            name="description"
          ></textarea>
          <button
            className="w-full h-10 bg-base rounded-md text-white mt-10"
            onClick={(e) => handleSubmit(e)}
          >
            Send Project
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProject;
