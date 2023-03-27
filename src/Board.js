
import { useEffect, useReducer, useState } from "react";
import { getArr } from "./Game";
import oneMove from "./Model";
import './Board.css';

export default function Board({ Marr }) {

    let [first1, setfirst1] = useState(true);
    let [first2, setfirst2] = useState(true);

    let [countLeft, setCountLeft] = useState(0);

    let [save1, setSave1] = useState();
    let [save2, setSave2] = useState();

    let [showplayer1, setshowplayer1] = useState(true);
    let [showplayer2, setshowplayer2] = useState(true);

    let [Player1Turn, setPlayer1Turn] = useState(true);
    let [Player2Turn, setPlayer2Turn] = useState(false);

    let [cubeNum, setCubeNum] = useState();
    let [win, setWin] = useState(false);

    

    const [arr2, setArr2] = useState([]);

    const Reload = () => {
        setWin(false);
        window.location.reload();
    }

    useEffect(() => {

        setArr2(Marr);
    }, [])


   



    const gameStarted = () => {


        let x = Math.floor(Math.random() * 6) + 1;
        let arr = arr2;


        let saver = null;
        let saver2 = null;

        setCubeNum(x);
        if (Player1Turn) {

            for (let i = 1; i < arr.length; i++) {

                if (arr[i].num == x) {
                    saver = arr[i];
                    // setPlayer1(arr[i]);

                }

            }

            if (first1 == true) {
                setshowplayer1(false);
                setfirst1(false);
            }


            else {
                arr[101 - save1.num].pic[0] = 0;
                if (save1.num + x >= 100) {
                    // arr[1].pic = "chess-pawn (3)";

                    setArr2(arr);
                    setWin(true);
                    return;
                }


                // arr[100 - save1.num].pic = 0;

                for (let i = 1; i < arr.length; i++) {
                    if (arr[i].num == save1.num + x) {
                        // setPlayer1(arr[i]);
                        saver = arr[i];
                    }
                }

                if (save2.num == saver.num) {
                    arr[101 - saver.num].pic[0]= "chess-pawn (3)";
                    arr[101 - saver.num].pic[1]= "chess-pawn (2)";
                    
                  
                }


            }


            if (saver.ladder == 1 || saver.snake == 1) {
                for (let i = 1; i < arr.length; i++) {
                    if (arr[i].num == saver.goTo) {

                        saver = arr[i];
                        console.log(saver, "climed or fell")

                    }

                }
            }

            if (saver.gold == 1 && save2 != null) {
                let hlp;
                alert("in");
                console.log(saver, saver2, "BEFORE");

                if (save2.num > saver.num) {
                    hlp = saver;
                    // setPlayer1(Player2);
                    // setPlayer2(Player1);
                    saver = save2;
                    hlp.pic[1] = "chess-pawn (2)";
                    hlp.pic[0] = 0;
                    saver.pic[0]="chess-pawn (3)";
                    saver.pic[1]=0;
                    setSave2(hlp);


                }

                console.log(saver, saver2, hlp, "AFTER");
            }

            setPlayer1Turn(false);
            setPlayer2Turn(true);


            arr[101 - saver.num].pic[0] = "chess-pawn (3)";
            setSave1(saver);




        }



        //  תור השחקן השני

        if (Player2Turn) {

            for (let i = 1; i < arr.length; i++) {

                if (arr[i].num == x) {
                    saver2 = arr[i];
                    // setPlayer2(arr[i]);
                    if (save1.num == saver2.num) {
                        arr[i].pic[0] = "chess-pawn (3)";
                        arr[i].pic[1] = "chess-pawn (2)";


                    }

                }

            }



            if (first2 == true) {
                setshowplayer2(false);
                setfirst2(false);
            }

            else {
                arr[101 - save2.num].pic[1] = 0;


                if (save2.num + x >= 100) {
                    arr[1] = save2;

                    setWin(true);
                    setArr2(arr);
                    return;
                }

                arr[100 - save2.num].pic[1] = 0;

                for (let i = 1; i < arr.length; i++) {
                    if (arr[i].num == save2.num + x) {
                        // setPlayer2(arr[i]);
                        saver2 = arr[i];
                        console.log(saver2, "moved!")

                    }

                }
            }


            if (saver2.ladder == 1 || saver2.snake == 1) {
                for (let i = 1; i < arr.length; i++) {
                    if (arr[i].num == saver2.goTo) {
                        // setPlayer2(arr[i]);
                        saver2 = arr[i];
                        console.log(saver2, "climed or fell")

                    }

                }
            }

            if (saver2.gold == 1) {
                let hlp;
                alert("in");
                console.log(save1, saver2, "BEFORE");
                if (save1.num > saver2.num) {
                    hlp = saver2;
                    // setPlayer1(Player2);
                    // setPlayer2(Player1);
                    saver2 = save1;
                    hlp.pic[0] = "chess-pawn (3)";
                    hlp.pic[1] = 0;

                    saver2.pic[1]="chess-pawn (2)";
                    saver2.pic[0]=0;
                    setSave1(hlp);

                }

                



                console.log(save1, saver2, hlp, "AFTER");
            }

            setPlayer1Turn(true);
            setPlayer2Turn(false);

            arr[101 - saver2.num].pic[1] = "chess-pawn (2)";
            setSave2(saver2);


        }

        setArr2(arr);

        // setPlayer1({ saver });
        // setPlayer2({ saver2 });

        // console.log(Player1, Player2, "xxxxxxxxxxxxxxxxxxx");




    }

    const Try = () => {
        setCountLeft(countLeft + 1);
        alert(countLeft);

    }



    // return <div>{props.arr[99].num}</div>
    // return props.arr[2]!=null?  props.arr.map(cart=><div>{cart.num}</div> ):"xxx"  }

    return (<>
        <div className="board">
            {Player1Turn ? <h1>PLAYER 1</h1> : <h1>PLAYER 2</h1>}
            {!win ? <><img src="Pic/casino.png" className="cube" alt="" id="startButton" onClick={() => gameStarted()}></img><br /><br />
                {cubeNum != 0 ? <text> You got: {cubeNum} </text> : null}

            </> :
                <><div className="winDiv">
                    <img src="Pic/trophy-153395_1280.png" className="WinCup" alt=""></img>
                    {Player1Turn ? <b>PLAYER 1 WON!</b> : <b>PLAYER 2 WON!</b>}
                    <img src="Pic/down-arrow.png" className="floating" alt=""></img>
                    <button className="button-33" onClick={() => Reload()}>PLAY AGAIN!</button>

                </div>


                    <br />
                </>}
            <div>
                {showplayer1 ? <img className="playerOne" src={`Pic/chess-pawn (3).png`} alt="" /> : null}
                {showplayer2 ? <img className="playerOne" src={`Pic/chess-pawn (2).png`} alt="" /> : null}
            </div>
            {arr2.map(move => move.num != 0 ? <>  <div className="oneMove" key={move.id} style={{backgroundColor:move.gold==1?"gold":null}} >   {move.num} {move.pic[0] != 0 ? <img className="playerOne" src={`Pic/${move.pic[0]}.png`} alt="" key={move.id} /> : null} {move.pic[1] != 0 ? <img className="playerOne" src={`Pic/${move.pic[1]}.png`} alt="" key={move.id} /> : null}</div>   {move.num % 10 == 1 ? <br /> : null}

            </> : null)
            }
            

            {arr2.map(move => move.ladder == 1 ? <><div className="ladder" id={move.num} key={move.num} >
                {/* <img src={move.dir == 1 ? "Pic/ladder1.png" : move.dir == 2 ? "Pic/ladder2.png":"Pic/ladder3.png"} alt="" style={{ top: `${-60 * ((move.goTo / 10)) - 160}px`, left: `${75 * (10 - move.num % 10) - 128 * countLeft}px`, height: `${92 * Math.abs(move.goTo / 10 - move.num / 10)}px`, width: `${112 * Math.abs(move.goTo % 10 - move.num % 10)}px` }}></img> */}
                {move.dir == 1 ? <img src="Pic/ladder1.png" alt="" style={{ top: `${-60 * ((move.goTo / 10)) - 160}px`, left: `${75 * (10 - move.num % 10) - 128 * (move.count)}px`, height: `${92 * Math.abs(move.goTo / 10 - move.num / 10)}px` }}  >

                </img> : move.dir == 2 ? <img src="Pic/ladder2.png" alt="" style={{ top: `${-60 * ((move.goTo / 10)) - 160}px`, left: `${75 * (10 - move.num % 10) - 128 * (move.count)}px`, height: `${92 * Math.abs(move.goTo / 10 - move.num / 10)}px`, width: `${112 * Math.abs(move.goTo % 10 - move.num % 10)}px` }} ></img>
                    : <img src="Pic/ladder3.png" alt="" style={{ top: `${-60 * ((move.goTo / 10)) - 150}px`, left: `${75 * (10 - move.num % 10) - 128 * countLeft - 500 + 128}px`, height: `${92 * Math.abs(move.goTo / 10 - move.num / 10)}px`, width: `${112 * Math.abs(move.goTo % 10 - move.num % 10)}px` }}></img>}


            </div>
            </> :null

                //    :move.snake==1?
                //     <><div className="ladder" >
                //         <img src={move.dir == 2 ? "Pic/snake2.png" : move.dir == 3 ? "Pic/snake3.png" : "Pic/snake1.png" } alt="" style={{ top: `${-60 * ((move.goTo / 10)) - 160}px`, left: `${75 * (10 - move.num % 10) - 128 * (move.count)}px`, height: `${92 * Math.abs(move.goTo / 10 - move.num / 10)}px`, width: `${112 * Math.abs(move.goTo % 10 - move.num % 10)}px` }} ></img>



                //     </div></>:null
            )}




        </div> </>)
}








