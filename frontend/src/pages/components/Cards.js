import React from "react";
import { useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import Loading from "../partials/Loading";
import { toast } from "react-toastify";
import { cardsQuery } from "../../graphql/queries";
import { cardsMutation } from "../../graphql/mutations";

const Cards = () => {
  let history = useHistory();
  const { data, loading /*error*/ } = useQuery(cardsQuery.GET_CARDS_GRAPHQL);
  const [deleteCard] = useMutation(cardsMutation.DELETECARD);

  const grabIdCard = (id, title, text) => {
    history.push("/update/" + id, { id, title, text });
  };

  const handleDeleteCard = async (id) => {
    try {
      await deleteCard({
        variables: {
          _id: id,
        },
      });
      toast.warn(`Card ID ${id} was deleted!`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div>
        <h1>
          <Loading />
        </h1>
      </div>
    );
  }

  return (
    <div className="my-cards">
      {data.getPosts.length > 0 ? (
        data.getPosts.map((card, index) => {
          return (
            <div key={index} className="titleAndtext">
              <div className="items">
                <h4>{card.title}</h4>
                <p>{card.text}</p>
              </div>
              <div className="buttons">
                <button
                  onClick={() => grabIdCard(card._id, card.title, card.text)}
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteCard(card._id)}>
                  Delete
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-message">
          <h1>Você ainda não criou nenhum Card.</h1>
        </div>
      )}
    </div>
  );
};

export default Cards;
