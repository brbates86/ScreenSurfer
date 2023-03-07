import React, { useState } from 'react';

function ReviewForm(props) {
  const [input, setInput] = useState('');
  let [review, setReview] = useState('');

  const reviewLevel = ['Good', 'Bad', 'Mid']

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!review) {
      review = 'Mid';
    }

    props.onSubmit({
      id: Math.random(Math.floor() * 1000),
      text: input,
      review: review,
    });

    setInput('');
    setReview('');
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };


  return !props.edit ? (
    <div>
      <form className="review-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add Movie! "
          value={input}
          name="text"
          className="review-input"
          onChange={handleChange}
        ></input>
        <div className="dropdown">
          <button className={`dropbtn ${review}`}>
            {review || 'Rate'}
          </button>
          <div className="dropdown-content">
            <p onClick={() => setReview(reviewLevel[0])}>The Good</p>
            <p onClick={() => setReview(reviewLevel[1])}>The Bad</p>
            <p onClick={() => setReview(reviewLevel[2])}>The Mid</p>
          </div>
        </div>
        <button className="review-button">Action! </button>
      </form>
    </div>
  ) : (
    <div>
      <h3>Update entry: {props.edit.value}</h3>
      <form className="review-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={props.edit.value}
          value={input}
          name="text"
          className="review-input"
          onChange={handleChange}
        ></input>
        <div className="dropdown">
          <button className={`dropbtn ${review}`}>
            {review || 'Rate'}
          </button>
          <div className="dropdown-content">
            <p onClick={() => setReview(reviewLevel[0])}>The Good</p>
            <p onClick={() => setReview(reviewLevel[1])}>The Bad</p>
            <p onClick={() => setReview(reviewLevel[2])}>The Mid</p>
          </div>
        </div>
        <button className="review-button">Update</button>
      </form>
    </div>
  );
}

export default ReviewForm;