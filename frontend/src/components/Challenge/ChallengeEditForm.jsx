import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateChallenge } from "../../features/challenges/challengeSlice";
import { Form, InputGroup, Button, Row, Col } from "react-bootstrap";

function ChallengeEditForm({ challenge, onCancel }) {
  const [name, setName] = useState(challenge.name);
  const [total_pages, setTotalPages] = useState(challenge.total_pages);
  const [completed_pages, setCompletedPages] = useState(
    challenge.completed_pages
  );
  const [start_date, setStartDate] = useState(challenge.start_date);
  const [end_date, setEndDate] = useState(challenge.end_date);

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    const challengeFormData = {
      id: challenge.id,
      name,
      total_pages,
      completed_pages,
      start_date,
      end_date,
    };
    dispatch(updateChallenge({ challenge: challengeFormData }));
    clearForm();
  };

  const clearForm = () => {
    setName("");
    setTotalPages("");
    setCompletedPages("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <section className="form">
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter challenge name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="total_pages">
          <Form.Label>Total pages</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter total pages"
            value={total_pages}
            onChange={(e) => setTotalPages(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="completed_pages">
          <Form.Label>Completed pages</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter completed pages"
            value={completed_pages}
            onChange={(e) => setCompletedPages(e.target.value)}
            required
          />
        </Form.Group>
        <Row>
          <Col sm={6}>
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          </Col>
          <Col sm={6}>
            <Button variant="success" type="submit">
              Update
            </Button>
          </Col>
        </Row>
      </Form>
    </section>
  );
}

export default ChallengeEditForm;
