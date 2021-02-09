import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { cardsMutation } from "../../graphql/mutations";

const UpdateCard = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  let history = useHistory();

  useEffect(() => {
    setTitle(history.location.state.title);
    setText(history.location.state.text);
  }, [history.location.state]);

  const [updateCard] = useMutation(cardsMutation.UPDATECARD, {
    variables: { _id: history.location.state.id, title, text },
  });

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await updateCard();
      toast.success("Card updated!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form className="post_form">
      <div>
        <label className="title_exit">
          <div>Title</div>
          <Link to="/">x</Link>
        </label>
        <input
          name="title"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          maxLength="53"
          placeholder="Max Length: 53 characters"
        />
        <label>Text</label>
        <textarea
          name="contentText"
          rows="10"
          cols="50"
          onChange={(e) => setText(e.target.value)}
          value={text}
          maxLength="173"
          placeholder="Max Length: 173 characters"
        ></textarea>
        <div>
          <button onClick={handleClick}>UPDATE</button>
        </div>
      </div>
    </form>
  );
};

export default UpdateCard;
