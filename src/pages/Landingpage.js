import { useContext } from "react";
import { Redirect } from "react-router-dom";
import hero from "../assets/image/g10.png";
import { AppContext } from "../context/AppContext";
import ataskiri from "../assets/image/ataskiri.png";
import bawahkiri from "../assets/image/bawahkiri.png";
import bawahkanan from "../assets/image/bawahkanan.png";
import card from "../assets/image/card.png";

function Landingpage({ showModalLogin, showModalRegister }) {
  const [state] = useContext(AppContext);
  return (
    <>
      {state.isLogin && <Redirect to="/home" />}
      <div className="w-full h-screen relative flex p-24">
        <img
          src={ataskiri}
          alt="bg"
          className="w-64 absolute"
          style={{ top: 0, left: 0 }}
        />
        <img
          src={bawahkiri}
          alt="bg"
          className="w-64 absolute"
          style={{ bottom: 0, left: 0 }}
        />
        <img
          src={bawahkanan}
          alt="bg"
          className="w-64 absolute"
          style={{ bottom: 0, right: 0 }}
        />
        <div className="w-6/12 h-full relative">
          <div className="w-full h-2/4 my-10">
            <h1 className="text-6xl font-bold fontFamily-rockwell">Ways</h1>
            <h1 className="text-6xl font-bold fontFamily-rockwell">Gallery</h1>
            <img
              src={card}
              alt="card"
              className="absolute"
              style={{ top: 0, left: "125px" }}
            />
          </div>
          <h3 className="text-xl font-bold">
            show your work to inspire everyone
          </h3>
          <h4>
            Ways Exhibition is a website design creators gather to share their
            work with other creators
          </h4>
          <div className="mt-10">
            <button
              className="w-24 h-10 bg-base text-white rounded-md"
              onClick={() => {
                showModalRegister();
              }}
            >
              Join Now
            </button>
            <button
              className="w-24 h-10 border-2 border-base ml-6 rounded-md"
              onClick={() => {
                showModalLogin();
              }}
            >
              Login
            </button>
          </div>
        </div>
        <div className="w-6/12 h-full">
          <img src={hero} alt="waysgallery" />
        </div>
      </div>
    </>
  );
}

export default Landingpage;
