import Header from "../components/Header";
import profile from "../assets/image/profile.png";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { API, options } from "../utils/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import StackGrid from "react-stack-grid";
import UserIcon from "../assets/image/userIcon.png";

function Profilepage({ location }) {
  const { data, isError, error, isLoading, refetch } = useQuery(
    `${location.pathname === "/profile" ? "profile" : "user"}`,
    () => API.get(`/user/${location.state.id}`, options)
  );

  const [followed] = useMutation((form) =>
    API.post(`/followed`, { data: form }, options)
  );
  const [unfollowed] = useMutation((form) =>
    API.delete(`/unfollowed`, { data: form }, options)
  );

  const handleFollow = async () => {
    try {
      let form = { followerId: data.data.data.id };
      if (data.data.data.followed.length > 0) {
        await unfollowed(form, {
          onSuccess: (data) => {
            console.log(data);
          },
          onError: (error) => {
            console.log({ error: error });
          },
        });
      } else {
        await followed(form, {
          onSuccess: (data) => {
            console.log(data);
          },
          onError: (error) => {
            console.log({ error: error });
          },
        });
      }
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const history = useHistory();
  return (
    <div className="w-full h-screen relative">
      <Header />
      {isLoading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <FontAwesomeIcon icon={faSpinner} spin size="6x" />
        </div>
      ) : isError ? (
        <div>
          <h1>{error.response.data.message}</h1>
        </div>
      ) : (
        <>
          <div
            className="w-8/12 m-auto mt-10 flex justify-between"
            style={{
              height: "60vh",
            }}
          >
            <div
              className="w-32 h-48 bg-base absolute"
              style={{
                top: "100px",
                right: "100px",
              }}
            ></div>
            <div className="w-5/12 h-full">
              {data.data.data.avatar ? (
                <img
                  src={data.data.data.avatar}
                  alt={data.data.data.fullName}
                  className="w-32 h-32 rounded-full object-cover object-center"
                />
              ) : (
                <img
                  src={UserIcon}
                  alt={data.data.data.fullName}
                  className="w-32 h-32 rounded-full object-cover object-center border-8 border-base"
                />
              )}
              <h5 className="my-4 text-lg font-bold">
                {data.data.data.fullName}
              </h5>
              <h1 className="text-4xl font-bold mb-4">
                {data.data.data.greating
                  ? data.data.data.greating
                  : "Welcome to my Profile"}
              </h1>
              <div className="flex">
                {location.pathname === "/profile" ? (
                  <button
                    className="bg-base rounded-md w-32 h-8 text-white outline-none"
                    onClick={() => history.push("/edit-profile")}
                  >
                    Edit Profile
                  </button>
                ) : (
                  <>
                    {data.data.data.followed.length > 0 ? (
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
                          state: { orderTo: `${location.state.id}` },
                        });
                      }}
                    >
                      Hired
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="w-6/12 h-full relative">
              <div
                className=""
                style={{
                  width: "500px",
                  height: "300px",
                }}
              >
                {data.data.data.posts[0] ? (
                  <img
                    src={data.data.data.posts[0].photos[0].image}
                    alt={data.data.data.posts[0].title}
                    className="w-full h-full object-cover object-center"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      history.push({
                        pathname: `/detail/${data.data.data.posts[0].id}`,
                      });
                    }}
                  />
                ) : (
                  <div
                    className="w-full h-full bg-base flex justify-center items-center"
                    onClick={() => {
                      history.push({
                        pathname: "/add-post",
                      });
                    }}
                  >
                    <h1 className="text-lg font-bold text-white">
                      Ayok buat karyamu sekarang juga
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-8/12 m-auto my-4">
            <h3 className="font-bold text-xl">My Work</h3>
            <div className="h-full" style={{ width: "912px" }}>
              <StackGrid columnWidth={300}>
                {data.data.data.arts.map((art, index) => {
                  return (
                    <div key={index + 1} className="w-full flex justify-center">
                      <img
                        src={art.image}
                        alt="title"
                        className="object-cover object-center"
                      />
                    </div>
                  );
                })}
              </StackGrid>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Profilepage;
