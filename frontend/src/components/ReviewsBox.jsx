import { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

const ReviewsBox = () => {
  const [reviews, setReviews] = useState([
    { id: 1, name: "Heer Sagar", rating: 5, comment: "Absolutely loved this product!" },
    { id: 2, name: "Viral Modi", rating: 3, comment: "Great quality, but took time to arrive." }
  ]);
  
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);

  const handleAddReview = () => {
    if (newComment.trim() === "") return;
    const newReview = { id: reviews.length + 1, name: "Anonymous", rating: newRating, comment: newComment };
    setReviews([...reviews, newReview]);
    setNewComment("");
    setNewRating(5);
  };

  return (
    <Card className="p-3 shadow-lg w-100" style={{ maxWidth: "800px", margin: "auto" }}>
      {/* <h3 className="text-center">Customer Reviews</h3> */}
      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.id} className="p-2 border-bottom p-1 mb-3">
            <h5>{review.name}</h5>
            <div className="d-flex flex-row">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} color={i < review.rating ? "gold" : "lightgray"} />
              ))}
            </div>
            <p className="my-1">{review.comment}</p>
          </div>
        ))}
      </div>
      
      {/* Add Review Form */}
      <Form className="mt-3">
        <Form.Group>
          <Form.Label >Rate the Product:</Form.Label>
          <div className="d-flex flex-row">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                color={i < newRating ? "gold" : "lightgray"}
                onClick={() => setNewRating(i + 1)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Add your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </Form.Group>
        <Button className="mt-2 w-100" variant="primary" onClick={handleAddReview}>
          Submit Review
        </Button>
      </Form>
    </Card>
  );
};

export default ReviewsBox;
