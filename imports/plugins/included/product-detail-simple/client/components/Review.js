import React from "react";
import ReactStars from "react-stars";

/**
 * @class Review
 * @extends React.Component
 */
class Review extends React.Component {
  render() {
    return (
        <div>
            <b>{this.props.sender}</b>
            <div>{this.props.createdAt}</div>
             <ReactStars
               name = "rate"
               count={5}
               edit={false}
               value={Number(this.props.rate)}
               size={20}
               color2={"#ffd700"}
             />
            <div>{this.props.review}</div>
            <br/>
        </div>
    );
  }
}

export default Review;
