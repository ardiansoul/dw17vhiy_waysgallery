import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import Header from "../components/Header";
import { API, options } from "../utils/API";
import avatar from "../assets/image/userIcon.png";
import parse from "html-react-parser";

function Detailpage() {
  const { id } = useParams();
  const { data, error, isError, isLoading, refetch } = useQuery("post", () =>
    API.get(`/post/${id}`, options)
  );

  const [followed] = useMutation((data) =>
    API.post(`/followed`, { data: data }, options)
  );
  const [unfollowed] = useMutation((data) =>
    API.delete(`/unfollowed`, { data: data }, options)
  );

  const handleFollow = async () => {
    try {
      let form = { followerId: data.data.data.post.createdBy?.id };
      if (data.data.data.post.createdBy?.followed.length > 0) {
        await unfollowed(form);
      } else {
        await followed(form);
      }
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const history = useHistory();
  const [image, setImage] = useState([]);
  const [imageId, setImageId] = useState(0);
  const handleImage = (id) => {
    setImageId(id);
  };
  useEffect(() => {
    setImage(data?.data.data.post.photos);
  }, [data]);

  return (
    <div className="w-full h-screen relative">
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
        <div className="w-8/12 h-auto m-auto mb-10">
          <div className="w-full h-20 flex justify-between items-center">
            <div className="flex items-center">
              {data.data.data.post.createdBy?.avatar ? (
                <img
                  src={data.data.data.post.createdBy.avatar}
                  className="w-10 h-10 rounded-full border-base border-2 m-4"
                  alt={data.data.data.post.createdBy?.fullName}
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    history.push({
                      pathname: `/user/${data.data.data.post.createdBy?.id}`,
                      state: { id: `${data.data.data.post.createdBy?.id}` },
                    });
                  }}
                />
              ) : (
                <img
                  src={avatar}
                  className="w-10 h-10 rounded-full border-base border-2 m-4"
                  alt={data.data.data.post.createdBy?.fullName}
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    history.push({
                      pathname: `/user/${data.data.data.post.createdBy?.id}`,
                      state: { id: `${data.data.data.post.createdBy?.id}` },
                    });
                  }}
                />
              )}

              <div className="flex flex-col justify-center">
                <h5 className="font-bold text-lg">
                  {data.data.data.post.title}
                </h5>
                <h5
                  className="text-md"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    history.push({
                      pathname: `/user/${data.data.data.post.createdBy?.id}`,
                      state: { id: `${data.data.data.post.createdBy?.id}` },
                    });
                  }}
                >
                  {data.data.data.post.createdBy?.fullName}
                </h5>
              </div>
            </div>
            <div>
              {data.data.data.post.createdBy?.followed.length > 0 ? (
                <button
                  className="w-20 h-8 mr-2 bg-base rounded-md text-white"
                  onClick={() => {
                    handleFollow();
                  }}
                >
                  Followed
                </button>
              ) : (
                <button
                  className="w-20 h-8 mr-2 border-2 border-base rounded-md"
                  onClick={() => {
                    handleFollow();
                  }}
                >
                  Follow
                </button>
              )}
              <button
                className="w-20 h-8 bg-base text-white rounded-md"
                onClick={() => {
                  history.push({
                    pathname: "/hire",
                    state: { orderTo: `${data.data.data.post.createdBy?.id}` },
                  });
                }}
              >
                Hired
              </button>
            </div>
          </div>
          {image && (
            <img
              src={image[imageId]?.image}
              // src={`${baseUrl}${data.data.data.post.photos[0]?.image}`}
              alt={data.data.data.post.title}
              className="w-full object-cover object-center rounded-md"
              // style={{
              //   height: "600px",
              // }}
            />
          )}
          <div className="flex justify-center mt-2">
            {data.data.data.post.photos.map((photo, index) => {
              return (
                <div
                  className="mx-2"
                  style={{
                    width: "200px",
                    height: "150px",
                  }}
                >
                  <img
                    src={photo.image}
                    alt={data.data.data.post.title}
                    className="w-full h-full object-cover object-center rounded-md"
                    onClick={() => handleImage(index)}
                  />
                </div>
              );
            })}
          </div>
          <div className="min-w-full mt-10 nonNormalize">
            {parse(data.data.data.post.description)}
          </div>
        </div>
      )}
    </div>
  );
}

export default Detailpage;
