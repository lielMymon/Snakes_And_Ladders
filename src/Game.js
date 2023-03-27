
import { useEffect, useState } from 'react';
import './App.css';
import { useNavigate } from "react-router";

import Board from './Board';
import oneMove from "./Model";

function Game() {

  const nav = useNavigate();
  let tmp;

  let [arr, setArr] = useState([]);
  let [flag, setflag] = useState(false);

  const [data, setData] = useState({
    snake: "",
    ladder: ""
  })

  let movesArr = [];

  
  const Change = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  }




  const Func = () => {

    console.log("sttaaayyy");
    let goTo, num, move, i, gold,count1=0,count2=0;

    //שתי משבצות זהב
    for (i = 0; i < 2; i++) {
      gold = Math.floor(Math.random() * 100) + 1;
      //מוודא שהמשבצת לא תפוסה
      while (movesArr[101-gold] != null) {
        gold = Math.floor(Math.random() * 100) + 1;
      }
      movesArr[101-gold] = new oneMove(gold, 0, 0, 0, 1, 0, 0);
      console.log(movesArr[101-gold], "GOLD");

    }
    //סולמות
    for (i = 1; i <= data.ladder; i++) {
      num = Math.floor(Math.random() * 100) + 1;
      // בדיקה שהמקום לא תפוס והמקום לא גדול מתשעים(שאחרת לא הגיוני לעלות) 
      while (movesArr[101-num] != null || num > 90) {
        num = Math.floor(Math.random() * 100) + 1;
      }

      //מגריל לתוך גוטו מספר מהעשריות הבאות
      goTo = Math.floor(Math.random() * (100 - (((num / 10) + 1) * 10) + 1)) + (((num / 10) + 1) * 10);


      while (movesArr[101-goTo] != null) {
        goTo = Math.floor(Math.random() * (100 - (((num / 10) + 1) * 10) + 1)) + (((num / 10) + 1) * 10);
      }

      if (goTo > 100)
        goTo = 100;
        
      
        

      move = new oneMove(num, 1, goTo, 0, 0, 0,0);

      movesArr[101-num] = move;

      console.log(movesArr[101-num], "A LADDER");

      


    }

    //נחשים

    for (i = 0; i < data.snake; i++) {
      num = Math.floor(Math.random() * 100) + 1;
      // בדיקה שהמקום לא תפוס והמקום לא קטן מעשר(שאחרת לא הגיוני לרדת) 
      while (movesArr[101-num] != null || num < 10) {
        num = Math.floor(Math.random() * 100) + 1;
      }



      //מגריל לתוך גוטו מספר מהעשריות הקודמות 
      goTo = Math.floor(Math.random() * ((((num / 10) - 1) * 10)) + 1);
      if (goTo < 1)
        goTo = 1;

      while (movesArr[101-goTo] != null) {
        goTo = Math.floor(Math.random() * 100) + 1;
      }

      move = new oneMove(num, 0, goTo, 1, 0, 0,0);

      movesArr[101-num] = move;

      console.log(movesArr[101-num], "A SNAKE");

    }

    for (i = 1; i < 101; i++) {
      if (movesArr[i] == null){
        movesArr[i] = new oneMove(101-i, 0, 0, 0, 0, 0,0);
      }
        
        if(movesArr[i].ladder==1||movesArr[i].snake==1){

          if(movesArr[i].ladder==1){
            movesArr[i].count=count1;
            count1++;

          }

          if(movesArr[i].snake==1){
            movesArr[i].count=count2;
            count2++;

          }
          

          if(movesArr[i].num %10 === movesArr[i].goTo %10){
            movesArr[i].dir=1;
            continue;

          }
          
          if(movesArr[i].num %10 < movesArr[i].goTo %10 &&movesArr[i].goTo % 10!=0){
            movesArr[i].dir=3;
            continue;
          }

          movesArr[i].dir=2;
          
        }
        



    }
    
    console.log(movesArr[1], "xxxxxxxxxxxx");
    movesArr[0]=new oneMove(0,0,0,0,0,0,0);

    setflag(true);
    
    setArr(movesArr);
    
    
    // {flag &&<Board Marr={arr}  />}
    // {nav("/home/board")}
    document.getElementById("input").style.display="none";


  }
  // if (movesArr[100] == null){ setflag(true);
  //   alert(flag);
  // }
   



  return (
    <>

      <div className="GameDiv">
        <div id="input">
        
          <input type="text" placeholder='How many snakes?'  name="snake" value={data.snake} onChange={(e) => Change(e)} />
          <input type="text" placeholder='How many ladders?'  name="ladder" value={data.ladder} onChange={(e) => Change(e)} /><br />
          <input type="button" onClick={Func}   value='START' className='button-33'/></div>
        
        {flag == true ?<><Board Marr={arr} /> </>  : null}



        {/* {flag===true?(<><Board name="x" arr={arr}/></>):"xx"}
      {flag===true?nav("/board"):null} */}

        {/* {flag===true?(()=><><Board name="x" arr={arr}/></>,nav("/board")):null} */}

      </div>
    </>

  );
}


export default Game;
