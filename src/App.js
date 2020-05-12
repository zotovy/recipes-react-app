import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { Button, Typography } from "@material-ui/core";
import RecipeItem from "./item";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Context from "./context";
import Detail from "./detail";
import nodata from "./nodata.png";

function App() {
  const ID = "fa3fbc54";
  const KEY = "6dd270e8f3e96605172d4d26d4bd3db8";

  let [recepies, setRecepies] = useState([]);
  let [dish, setDish] = useState();

  const fetchRecepies = async () => {
    const raw = await fetch(
      `https://api.edamam.com/search?q=${dish}&app_id=${ID}&app_key=${KEY}&to=50`
    );
    const data = await raw.json();
    console.log(data);
    setRecepies(data.hits.map((elem) => elem.recipe));
  };

  return (
    <div className='App'>
      <Context.Provider value={{ recepies }}>
        <Router>
          <Switch>
            <Route path='/' exact>
              <div className='title'>
                <Typography variant='h5'>Find your recepies</Typography>
              </div>

              <div className=''>
                <form className='form'>
                  <div className='textfield-container'>
                    <TextField
                      type='text'
                      variant='outlined'
                      label='Enter your dish'
                      value={dish}
                      onChange={(e) => setDish(e.target.value)}
                      onSubmit={() => fetchRecepies()}
                      fullWidth
                    />
                  </div>
                  <div className='confirm-button'>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() => {
                        fetchRecepies();
                      }}>
                      Search
                    </Button>
                  </div>
                </form>
              </div>

              {recepies.length === 0 ? (
                <div className='no-data-contaier'>
                  <img src={nodata} alt='' />
                </div>
              ) : (
                <div className='grid-container'>
                  <div className='grid-recepies'>
                    {recepies.map((recepi, i) => (
                      <RecipeItem
                        imageUrl={recepi.image}
                        desc={recepi.ingredientLines.join(" ")}
                        title={recepi.label}
                        i={i}
                        key={i}
                      />
                    ))}
                  </div>
                </div>
              )}
            </Route>
            <Route path='/detail/:id' component={Detail} />
          </Switch>
        </Router>
      </Context.Provider>
    </div>
  );
}

export default App;
