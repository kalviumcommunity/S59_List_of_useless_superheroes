import React, { useEffect, useState } from "react";
import RenderList from "./../components/RenderList";

import Loader from "./../components/Loader";
import Header from "./../components/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";


function View({ stack }) {
  document.getElementById("root").style.background = "black";

  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshContent, setRefresh] = useState(false);
  const [creators, setCreators] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedCreator, setSelectedCreator] = useState("All");

  const refresh = () => {
    setRefresh(!refreshContent);
  };

  const handleCreatorChange = (event) => {
    setSelectedCreator(event.target.value);
  };

  // https://serverk.onrender.com/content
  // http://localhost:5000/content/
  useEffect(() => {
    fetch(`http://localhost:5000/content/${stack.code}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        setHeroes(data);
        const creatorNames = [...new Set(data.map((item) => item.created_by))];
        setCreators(creatorNames);
      })
      .catch((error) => console.error(error));
  }, [refreshContent]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const deleteCard = async (id, token) => {
    try {
      const response = await fetch(
        `http://localhost:5000/content/${stack.code}/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      // toast.success('Card deleted successfully');
    } catch (error) {
      // console.error(error);
      toast.error(error.message || "failed to delete card");
    } finally {
      refresh();
    }
  };

  useEffect(() => {
    if (selectedCreator === "ALL" || selectedCreator === "All") {
      setFiltered(heroes);
    } else {
      setFiltered(
        heroes.filter((hero) => {
          return hero.created_by === selectedCreator;
        })
      );
    }
  }, [selectedCreator, heroes]);

  return (
    <>
      {loading ? null : <Header />}
      {loading && <Loader />}
      <div className="mt-20">
        <br />
        {loading ? null : (
          <FormControl  sx={{
            width: "15rem",
            maxWidth: "100%",
            marginRight: "1em",
            "& .MuiSvgIcon-root": {
              fill: "white",
            },
          }}>
            <InputLabel sx={{color : 'white'}} id="user-select" >User</InputLabel>
            <Select
            variant="outlined"
              labelId="user-select-label"
              id="user-select"
              value={selectedCreator}
              label="User"
              onChange={handleCreatorChange}
              sx={{
                color: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "& .MuiOutlinedInput-notchedOutline:hover": { //not working
                  borderColor: "red",
                },
                "& .MuiOutlinedInput-notchedOutline:focus": { //not working
                  borderColor: "red",
                },
              }}
  
            >
              <MenuItem value="All">
                <em>All</em>
              </MenuItem>
              {creators.map((user, index) => (
                <MenuItem key={index} value={user}>
                  <em>{user}</em>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <br />
        {loading ? null : (
          <RenderList
            data={filtered}
            code={stack.code}
            refresh={refresh}
            deleteCard={deleteCard}
          />
        )}
      </div>
    </>
  );
}

export default View;
