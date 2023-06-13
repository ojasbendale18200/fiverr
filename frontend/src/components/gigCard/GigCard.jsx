import React from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

import axios from "axios";

const GigCard = ({ item }) => {
  const { isLoading, error, data } = useQuery(`${item.userId}`, async () => {
    try {
      const response = await axios.get(
        `https://fair-blue-cod-cape.cyclic.app/api/users/${item.userId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  });

  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
        <img src={item?.cover} alt="" />
        <div className="info">
          {isLoading ? (
            "loading"
          ) : error ? (
            "Something went wrong!"
          ) : (
            <div className="user">
              <img src={data?.img || "/img/noavatar.jpg"} alt="" />
              <span>{data?.username}</span>
            </div>
          )}
          <h3>{item.title}</h3>
          <p>{item?.desc}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>{item?.totalStars}</span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src="./img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>$ {item?.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
