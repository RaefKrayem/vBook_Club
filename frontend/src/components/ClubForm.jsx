import { Widget } from "@uploadcare/react-widget";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createClub, reset } from "../features/clubs/clubSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ClubForm({ onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    profile: "",
  });

  const { name, description, profile } = formData;
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(reset());
  }, [isError, message, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const clubData = { name, description, profile };
    dispatch(createClub(clubData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <Card className="mb-3" id="challenge_form_card">
        <Card.Body>
          <section>
            <Form onSubmit={onSubmit}>
              <Form.Group controlId="name" id="challenge_form_group">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter club name"
                  value={name}
                  name="name"
                  onChange={onChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="description" id="challenge_form_group">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Description"
                  value={description}
                  name="description"
                  onChange={onChange}
                  required
                  min="1"
                />
              </Form.Group>

              <Form.Group controlId="end_date" id="challenge_form_group">
                <Form.Label
                  style={{
                    marginRight: "10px",
                  }}
                >
                  Club image:
                </Form.Label>
                <Widget
                  publicKey="5f30f5f7cb01c02529d1"
                  id="file"
                  onFileSelect={(file) => {
                    console.log("File changed: ", file);

                    if (file) {
                      file.progress((info) =>
                        console.log("File progress: ", info.progress)
                      );
                      file.done((info) => {
                        console.log("File uploaded: ", info);
                        setFormData((prevState) => ({
                          ...prevState,
                          profile: info.cdnUrl,
                        }));
                      });
                    }
                  }}
                  onChange={(info) => console.log("Upload completed:", info)}
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
                    onClick={onCancel}
                  >
                    Clear
                  </button>
                </Col>
              </Row>
            </Form>
          </section>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ClubForm;
