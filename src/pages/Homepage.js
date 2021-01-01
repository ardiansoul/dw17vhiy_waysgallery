import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../components/Header";
import StackGrid from "react-stack-grid";
import { useQuery } from "react-query";
import Axios from "axios";
import { baseUrl, options } from "../utils/API";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

function Homepage() {
  const { data, error, isError, isLoading, refetch } = useQuery("posts", () =>
    Axios.get(`${baseUrl}api/v1/posts`, { params: { query: query } }, options)
  );

  const [query, setQuery] = useState("");
  const [type, setType] = useState("");

  const history = useHistory();

  useEffect(() => {
    refetch();
  }, [type]);

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
          <div className="w-8/12 h-auto m-auto">
            <div className="w-full h-16 flex justify-between items-center">
              <select
                className="w-24 h-10 border-2 border-base rounded-md"
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                <option value="today">today</option>
                <option value="follow">follow</option>
              </select>
              <label className="h-10 w-64 flex justify-start items-center rounded-md border-2 border-base">
                <input
                  type="text"
                  placeholder="search"
                  name="search"
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                  value={query}
                  className="w-full h-full m-2 outline-none"
                />
                <button
                  onClick={() => {
                    refetch();
                  }}
                >
                  <FontAwesomeIcon icon={faSearch} className="mx-4" />
                </button>
              </label>
            </div>
          </div>
          <div className="m-auto" style={{ width: "912px" }}>
            <h3 className="text-2xl font-bold my-4 ml-4">today post</h3>

            <StackGrid columnWidth={300}>
              {data.data.data.posts
                ? data.data.data.posts.map((post, index) => {
                    return (
                      <div
                        key={index + 1}
                        className="w-full flex justify-center shadow-2xl"
                      >
                        <img
                          src={post.photos[0]?.image}
                          alt={post.title}
                          className="object-cover object-center"
                          onClick={() => {
                            history.push(`/detail/${post.id}`);
                          }}
                        />
                      </div>
                    );
                  })
                : ""}
            </StackGrid>
          </div>
        </>
      )}
    </div>
  );
}

export default Homepage;
