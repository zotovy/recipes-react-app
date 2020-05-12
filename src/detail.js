import React from "react";
import Context from "./context";
import "font-awesome/css/font-awesome.min.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Typography, Button } from "@material-ui/core";
import nodata from "./nodata.png";

export default function Detail(props) {
  let { recepies } = useContext(Context);

  let id = props.match.params.id;

  return recepies[id] === undefined ? (
    <div className=''>
      <nav className='detail-nav'>
        <Link to='/'>
          {" "}
          <i className='fas fa-chevron-left'></i>
        </Link>
      </nav>
      <div className='no-data-contaier'>
        <img src={nodata} alt='' />
      </div>
    </div>
  ) : (
    <div className='detail-container'>
      <nav className='detail-nav'>
        <Link to='/'>
          {" "}
          <i className='fas fa-chevron-left'></i>
        </Link>
      </nav>

      <div className='info'>
        <img className='detail-img' src={recepies[id].image} alt='' />
        <div className='info-text'>
          <Typography variant='h3'>{recepies[id].label}</Typography>
          <div className='deit-label'>
            {recepies[id].dietLabels.map((elem, i) => (
              <div className='deit-label-container' key={i}>
                {elem}
              </div>
            ))}
          </div>
          <Button
            style={{ marginTop: "10px" }}
            fullWidth
            href={recepies[id].url}
            variant='contained'
            color='primary'
            size='large'>
            MORE
          </Button>
        </div>
      </div>

      <Typography variant='h6'>Ingredients</Typography>
      {recepies[id].ingredients.map((elem, i) => (
        <IngredientsTile
          what={elem.text}
          weight={Math.round(elem.weight)}
          key={i}
        />
      ))}
    </div>
  );
}

function CaloriesTile({ keyName, value }) {
  return (
    <div className='calories-tile'>
      <div className='key'>{keyName}</div>
      {value}
    </div>
  );
}

function IngredientsTile({ what, weight }) {
  return (
    <div className='recepi-tile'>
      <div className='key'>{what}</div>
      {weight}gr
    </div>
  );
}
