import React, { useState } from 'react';
import ReviewForm from './ReviewForm';

function Review(props) {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
    review: '',
  });

  console.log(props.review);

  const submitUpdate = (value) => {
    props.editReviewItem(edit.id, value);
    setEdit({ id: null, value: '', review: '' });
  };

  if (edit.id) {
    return <ReviewForm edit={edit} onSubmit={submitUpdate} />;
  }

  return props.review.map((item, i) => (
    <div
      className={
        item.isComplete
          ? `review-row complete ${item.review}`
          : `review-row ${item.review}`
      }
      key={i}
    >
      <div key={item.id} >
        {item.text}
      </div>
      <div className="icons">
        {console.log(item)}
        <p onClick={() => setEdit({ id: item.id, value: item.text, review: item.review })}> ✏️</p>
        <p onClick={() => props.removeReviewItem(item.id)}> 🗑️</p>
      </div>
    </div>
  ));
}

export default Review;
