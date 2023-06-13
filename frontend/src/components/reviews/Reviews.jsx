import React from "react";
import "./Reviews.scss";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import SingleReview from "../review/SingleReview";
import { useCookies } from "react-cookie";

function Reviews({ gigId }) {
  // const [cookies, setCookie] = useCookies(["accessToken"]);
  const accessToken = JSON.parse(localStorage.getItem("currentUser"));

  const { isLoading, error, data, refetch } = useQuery(`Reviews`, async () => {
    try {
      const response = await axios.get(
        `https://fair-blue-cod-cape.cyclic.app/api/reviews/${gigId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let obj = {
        desc: e.target[0].value,
        star: e.target[1].value,
        gigId,
      };
      let res = await axios.post(
        "https://fair-blue-cod-cape.cyclic.app/api/reviews",
        obj,
        {
          headers: {
            Authorization: `Bearer ${accessToken.token}`,
          },
        }
      );
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading
        ? "loading"
        : error
        ? "Something went wrong!"
        : data.map((review) => (
            <SingleReview key={review._id} review={review} />
          ))}
      <div className="add">
        <h3>Add a review</h3>
        <form action="" className="addForm" onSubmit={handleSubmit}>
          <input type="text" placeholder="write your opinion" />
          <select name="" id="">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
}

export default Reviews;
