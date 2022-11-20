import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
// import { FetchDataComponent } from './Components/FetchDataComponent';
import { TableComponent } from './Components/TableComponent';
import BuyInFilterComponent from './Components/BuyInFilterComponent';
import GameFilterComponent from './Components/GameFilterComponent';
import TableSizeFilterComponent from './Components/TableSizeFilterComponent';
import SpeedFilterComponent from './Components/SpeedFilterComponent';
import SliderComponent from './Components/SliderComponent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


function App() {
  const [getSpeedValue, setGetSpeedValue] = useState([false, false, false, false]);
  const [getGameValue, setGetGameValue] = useState([[false, false, false, false], 
                                                    [false, false, false, false, false, false, false],
                                                    [false, false],
                                                    [false, false, false, false],
                                                    [false, false, false]]);
  
  const [getBuyInValue, setGetBuyInValue] = useState([0, 100]);
  const [getTableSizeValue, setGetTableSizeValue] = useState([false, false, false]);
  
  console.log(getBuyInValue)
  console.log(getTableSizeValue)

  const gridStyles = {
    marginLeft: "auto",
    marginRight: "auto",
    paddingRight: 1,
    paddingBottom: 1
  };
  return (
    <div>
      <div>
        <Grid container justifyContent="center" alignItems="center" spacing={1}>
          <Grid item xs={1.5}>
            <BuyInFilterComponent onChangeBuyIn={setGetBuyInValue} />
          </Grid>
          <Grid item xs={1.5}>
            <GameFilterComponent  onChangeGame={setGetGameValue}/>
          </Grid>
          <Grid item xs={1.5}>
            <TableSizeFilterComponent onChangeTableSize={setGetTableSizeValue} />
          </Grid>
          <Grid item xs={1.5}>
            <SpeedFilterComponent onChangeSpeed={setGetSpeedValue}/>
          </Grid>
        </Grid>

      </div>
      
      
      
        <TableComponent SpeedValue={getSpeedValue} GameValue={getGameValue} BuyInValue={getBuyInValue} TableSizeValue={getTableSizeValue} />
    </div>      
  );
}

export default App;
