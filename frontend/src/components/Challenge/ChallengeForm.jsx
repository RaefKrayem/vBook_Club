import { useState } from "react";
import { useDispatch } from "react-redux";
import { createChallenge } from "../../features/challenges/challengeSlice";
import { format } from "date-fns";

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
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="name"
            placeholder="Enter challenge name"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="total_pages">Total pages</label>
          <input
            type="number"
            placeholder="Enter total pages"
            name="total_pages"
            id="total_pages"
            value={total_pages}
            onChange={(e) => setTotalPages(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="start_date">Start date</label>
          <input
            type="date"
            placeholder="Enter start date"
            name="start_date"
            id="start_date"
            value={start_date}
            onChange={(e) => setStartDate(e.target.value)}
            required
            onBlur={(e) => {
              const formattedDate = format(
                new Date(e.target.value),
                "yyyy-MM-dd"
              );
              setStartDate(formattedDate);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="end_date">End date</label>
          <input
            type="date"
            placeholder="Enter end date"
            name="end_date"
            id="end_date"
            value={end_date}
            onChange={(e) => setEndDate(e.target.value)}
            required
            onBlur={(e) => {
              const formattedDate = format(
                new Date(e.target.value),
                "yyyy-MM-dd"
              );
              setEndDate(formattedDate);
            }}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block">Add challenge</button>
        </div>
      </form>
    </section>
  );
}

export default ChallengeForm;
