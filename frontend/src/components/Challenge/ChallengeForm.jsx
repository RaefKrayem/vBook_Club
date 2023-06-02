import { useState } from "react";
import { useDispatch } from "react-redux";
import { createChallenge } from "../../features/challenges/challengeSlice";
import { Form, Row, Col } from "react-bootstrap";
import { format } from "date-fns";
import Card from "react-bootstrap/Card";
import "../../styles/ChallengeForm.css";

function ChallengeForm() {
  const [name, setName] = useState("");
  const [total_pages, setTotalPages] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createChallenge({ name, total_pages, start_date, end_date }));
    clearForm();
  };

  const clearForm = () => {
    setName("");
    setTotalPages("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <Card className="mb-3" id="challenge_form_card">
      <Card.Body>
        <section>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="name" id="challenge_form_group">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter challenge name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="total_pages" id="challenge_form_group">
              <Form.Label>Total pages</Form.Label>
              {/* do not allow negative numbers or 0 or strings */}
              <Form.Control
                type="number"
                placeholder="Enter total pages"
                value={total_pages}
                onChange={(e) => setTotalPages(e.target.value)}
                required
                min="1"
              />
            </Form.Group>
            <Form.Group controlId="start_date" id="challenge_form_group">
              <Form.Label>Start date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter start date"
                value={start_date}
                onChange={(e) => setStartDate(e.target.value)}
                required
                min={new Date().toISOString().split("T")[0]}
                onBlur={(e) => {
                  const formattedDate = format(
                    new Date(e.target.value),
                    "yyyy-MM-dd"
                  );
                  setStartDate(formattedDate);
                }}
              />
            </Form.Group>
            <Form.Group controlId="end_date" id="challenge_form_group">
              <Form.Label>End date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter end date"
                value={end_date}
                onChange={(e) => setEndDate(e.target.value)}
                min={start_date}
                required
                onBlur={(e) => {
                  const formattedDate = format(
                    new Date(e.target.value),
                    "yyyy-MM-dd"
                  );
                  setEndDate(formattedDate);
                }}
              />
            </Form.Group>
            <Row>
              <Col sm={6}>
                <button className="friend_request" type="submit">
                  Add
                </button>
              </Col>
              <Col sm={6}>
                <button
                  className="friend_request"
                  id="challenge_clear"
                  onClick={clearForm}
                >
                  Clear
                </button>
              </Col>
            </Row>
          </Form>
        </section>
      </Card.Body>
    </Card>
  );
}

export default ChallengeForm;
