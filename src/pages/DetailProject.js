import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { API, options } from "../utils/API";

function DetailProject() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery("project", () =>
    API.get(`/project/${id}`, options)
  );

  const [image, setImage] = useState(data?.data.data.project.photos);
  const [imageId, setImageId] = useState(0);
  const [detail, setDetail] = useState(false);

  const handleThumb = (id) => {
    setImageId(id);
  };

  useEffect(() => {
    setImage(data?.data.data.project.photos);
  }, [data]);

  return (
    <div className="w-full mb-10 relative">
      <Header />
      {isLoading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <FontAwesomeIcon icon={faSpinner} spin size="6x" />
        </div>
      ) : isError ? (
        <div>{error.response.data.message}</div>
      ) : !data.data.data && !image ? (
        <div>data tidak ada</div>
      ) : (
        <>
          {detail && (
            <div
              className="w-8/12 absolute border-2 border-base rounded-md bg-white p-6 flex flex-col items-center"
              style={{
                top: "100px",
                left: "50%",
                transform: "translate(-50%, 0)",
              }}
            >
              <img
                src={image[imageId].image}
                alt={data.data.data.project.description}
                className="w-full h-full object-cover object-center rounded-md"
                onClick={() => {
                  setDetail(false);
                }}
              />
              <a
                href={image[imageId].image}
                className="w-24 h-8 bg-base rounded-md text-white flex mt-4 justify-center items-center"
              >
                Download
              </a>
            </div>
          )}

          <div className="w-8/12 flex justify-between m-auto">
            <div
              className="w-7/12 rounded-md h-full"
              style={{
                height: "400px",
              }}
            >
              {image && (
                <img
                  src={image[imageId].image}
                  alt={data.data.data.project.description}
                  className="w-full h-full object-cover object-center rounded-md"
                  onClick={() => {
                    setDetail(true);
                  }}
                />
              )}
              <div className="mt-4 flex justify-center">
                {data.data.data.project.photos.map((image, index) => (
                  <img
                    src={image.image}
                    alt="project"
                    className="w-32 h-32 object-center rounded-md mx-2 object-cover"
                    onClick={() => {
                      handleThumb(index);
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="w-4/12  p-2">
              {data.data.data.project.description}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DetailProject;
