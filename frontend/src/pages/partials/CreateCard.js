import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { cardsMutation } from "../../graphql/mutations";

const CreateCard = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const [createCard] = useMutation(cardsMutation.CREATECARD, {
    variables: { title, text },
  });

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await createCard();
      toast.success("Card created!");
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
          <button onClick={handleClick}>POST</button>
        </div>
      </div>
    </form>
  );
};

export default CreateCard;
