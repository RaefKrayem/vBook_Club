import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateChallenge } from "../../features/challenges/challengeSlice";
import { format, set } from "date-fns";

function ChallengeEditForm({ challenge }) {
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
          <label htmlFor="completed_pages">Completed pages</label>
          <input
            type="number"
            placeholder="Enter total pages"
            name="completed_pages"
            id="completed_pages"
            value={completed_pages}
            onChange={(e) => setCompletedPages(e.target.value)}
            required
          />
        </div>

        {/* <div className="form-group">
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
        </div> */}
        <div className="form-group">
          <button className="btn btn-block">Update challenge</button>
        </div>
      </form>
    </section>
  );
}

export default ChallengeEditForm;
