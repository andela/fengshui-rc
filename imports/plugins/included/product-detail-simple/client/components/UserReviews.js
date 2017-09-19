import React from "react";
import Review from "./Review";
import { Meteor } from "meteor/meteor";
import { Reviews } from "/lib/collections";

class UserReviews extends React.Component {
  constructor(props) {
    super(props);
    this.getReviews = this.getReviews.bind(this);
  }
  getReviews() {
    Meteor.subscribe("Reviews");
    const reviews = Reviews.find({
      productId: this.props.product._id
    }).fetch();
    return reviews.map((review) => {
      return (
        <Review
          key ={review._id}
          review={review.review}
          rate={review.rate}
          createdAt={review.createdAt}
          sender={review.sender}
        />
      );
    });
  }

  render() {
    const reviews = this.getReviews();
    return (
        <div>
        {reviews}
        </div>
    );
  }
}

export default UserReviews;
