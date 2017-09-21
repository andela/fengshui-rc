import React from "react";
import ReactStars from "react-stars";
import moment from "moment";
import { Meteor } from "meteor/meteor";

/**
 * @class Comment
 * @extends React.Component
 */
class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      review: "",
      rate: 0,
      error: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.ratingChanged = this.ratingChanged.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }
  /**
   * validates form inputs
   * @method validateInputs
   * @member Comment
   * @param {object} event
   * @returns {function} a function that handles change event on inputs
   */
  validateInputs() {
    containChr = true;
    if (this.state.rate === 0) {
      this.setState({
        error: "You have to rate a product before submitting"
      });
    } else if (this.state.review === "") {
      this.setState({
        error: "You did not entered any review!"
      });
    } else {
      this.state.review.split("").forEach((chr) => {
        if (chr !== " ") {
          containChr = false;
        }
      });
      if (containChr) {
        this.setState({
          error: "space not allowed!"
        });
      }
    }
  }

  /**
   * Get the current user
   * @method getCurrentUser
   * @member Comment
   * @param {object} userEmail
   * @returns {function} a function that returns the current user
   */
  getCurrentUser(userEmail) {
    let currentUser = "";
    let hasSeen = false;
    userEmail.split("").forEach((userChr) => {
      if (userChr === "@") {
        hasSeen = true;
      }
      if (!hasSeen) {
        currentUser += userChr;
      }
    });
    return currentUser;
  }
  /**
   * Handle onChange event
   * @method onChange
   * @member Comment
   * @param {object} event
   * @returns {function} a function that handles onchange event
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  /**
   * Handle rating Change event
   * @method ratingChanged
   * @member Comment
   * @param {object} newRating
   * @returns {function} a function that set the state of rating
   */
  ratingChanged = (newRating) => {
    this.setState({
      rate: newRating,
      error: ""
    });
  }
  /**
   * Handle onFocus event
   * @method onFocus
   * @member Comment
   * @returns {function} a function that handle onfocus event
   */
  onFocus() {
    if (this.state.error !== "") {
      this.setState({
        error: ""
      });
    }
  }
  /**
   * Handle onClick event
   * @method onClick
   * @member Comment
   * @returns {function} a function that handle On button click event
   */
  onClick() {
    this.validateInputs();
    setTimeout(() => {
      if (this.state.error === "") {
        Meteor.call("products/reviews", this.props.product._id,
        this.state.review,
        this.state.rate.toString(),
         moment().format("LLLL").toString(),
      this.getCurrentUser(Meteor.user().emails[0].address),
        (err) => {
          if (err) {
            throw err;
          } else {
            this.setState({
              review: "",
              rate: 0,
              error: ""
            });
          }
        });
      }
    }, 500);
  }
  /**
   * render component
   * @method render
   * @member Comment
   * @returns {object} component
   */
  render() {
    return (
    <div>
    <h2>Submit Review</h2>
    <span>Rating:</span><br/>
    <ReactStars
      name = "rate"
      count={5}
      value={this.state.rate}
      onChange={this.ratingChanged}
      size={20}
      color2={"#ffd700"}
    /><br/>
    <div className="form-group">
       {this.state.error && <div className="alert alert-danger">
          {this.state.error}
        </div>}
        <label htmlFor="exampleTextarea">Comment:</label><br/>
        <textarea
          onFocus ={this.onFocus}
          value={this.state.review}
          name="review"
          onChange={this.onChange}
          className="form-control"
          id="exampleTextarea"
          rows="3"
        />
    </div>
    <button
      onClick={this.onClick}
      type="button"
      className="btn btn-success">Submit Review</button>
     </div>
    );
  }
}

export default Comment;
