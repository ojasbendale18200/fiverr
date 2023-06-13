import React, { useEffect, useState } from "react";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Reviews from "../../components/reviews/Reviews";

function Gig() {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery(`gig`, async () => {
    try {
      const response = await axios.get(
        `https://fair-blue-cod-cape.cyclic.app/api/gigs/single/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  });

  const {
    isLoading: isLoadingUser,
    error: isError,
    data: userData,
  } = useQuery(`user`, async () => {
    try {
      const response = await axios.get(
        `https://fair-blue-cod-cape.cyclic.app/api/users/${data.userId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  });

  return (
    <div className="gig">
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">
              Liverr {">"} Graphics & Design {">"}
            </span>
            <h1>{data?.title}</h1>
            {isLoadingUser ? (
              "loading"
            ) : isError ? (
              "Something went wrong!"
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={userData.img || "/img/noavatar.jpg"}
                  alt=""
                />
                <span>{userData?.username}</span>
                <div className="stars">
                  {Array(Math.round(data?.totalStars))
                    .fill()
                    .map((item, i) => (
                      <img src="/img/star.png" alt="" key={i} />
                    ))}
                  <span>{data?.totalStars}</span>
                </div>
              </div>
            )}
            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {data?.images?.map((img) => (
                <img key={img} src={img} alt="" />
              ))}
            </Slider>
            <h2>About This Gig</h2>
            <p>{data?.desc}</p>
            {isLoadingUser ? (
              "loading"
            ) : isError ? (
              "Something went wrong!"
            ) : (
              <div className="seller">
                <h2>About The Seller</h2>
                <div className="user">
                  <img src={userData.img || "/img/noavatar.jpg"} alt="" />
                  <div className="info">
                    <span>{userData?.username}</span>
                    <div className="stars">
                      {Array(Math.round(data?.totalStars))
                        .fill()
                        .map((item, i) => (
                          <img src="/img/star.png" alt="" key={i} />
                        ))}

                      <span>{data?.totalStars}</span>
                    </div>
                    <button>Contact Me</button>
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{userData?.country}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">Aug 2022</span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>{userData.desc}</p>
                </div>
              </div>
            )}
            <Reviews gigId={id} />
          </div>
          <div className="right">
            <div className="price">
              <h3>{data?.shortTitle}</h3>
              <h2>$ {data?.price}</h2>
            </div>
            <p>{data?.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>{data?.deliveryDate} Days Delivery</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>{data?.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {data?.features?.map((item) => (
                <div className="item" key={item}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <Link to={`/pay/${id}`}>
              <button>Continue</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;
