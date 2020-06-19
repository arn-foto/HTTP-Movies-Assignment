import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// initial state of form will be empty
const initialData = {
  title: "",
  director: "",
  metascore: null,
  stars: [],
};

const UpdateMovie = (props) => {
  const [movie, setMovie] = useState(initialData);
  const [starToAdd, setStarToAdd] = useState("");
  const { id } = useParams();
  // useParams is being used here and called below in the axios get request to match the id at the end of the URL being used

  //this handleChange will take an event and take the current state of movie and input a new value
  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const starFilterHandle = (itemName) => {
    setMovie({
      ...movie,
      stars: movie.stars.filter((item) => item !== itemName),
    });
  };
  // this will allow you to add a star to the current list
  const starAddHandle = (e) => {
    e.preventDefault();
    setMovie({
      ...movie,
      stars: [...movie.stars, starToAdd],
    });
  };

  const starToAddHandle = (e) => {
    setStarToAdd(e.target.value);
  };
  // grabbing api data by unique ID
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  }, []);

  //the PUT method to change a resource’s information.
  //  PUT takes in a body object like POST and identifies data that needs to be updated somewhere.
  const handlePut = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then((res) => {
        props.history.push(`/movies/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // basic form structure with the handleChange function
  return (
    <div className="update-form">
      <form onSubmit={handlePut}>
        <label htmlFor="title">Title:</label>
        <input
          onChange={handleChange}
          value={movie.title}
          name="title"
          type="text"
          placeholder="Title"
        />
        <label htmlFor="director">Director:</label>
        <input
          onChange={handleChange}
          value={movie.director}
          name="director"
          type="text"
          placeholder="Director"
        />
        <label htmlFor="metascore">Metascore:</label>
        <input
          onChange={handleChange}
          value={movie.metascore}
          name="metascore"
          type="text"
          placeholder="metascore"
        />
        {movie.stars.map((item) => (
          <button onClick={() => starFilterHandle(item)} key={item}>
            {item} x
          </button>
        ))}
        <input
          onChange={starToAddHandle}
          value={starToAdd}
          placeholder="add another star"
        />
        <button onClick={starAddHandle}>add</button>
        <br />
        <br />
        <button>Submit Edit</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
