import React from 'react';
import './ChessBoard.css';
import fun from './javascriptFiles/Slover'


let next_possible_loc = {}
let src_moved = false
let prevEle = []
let x, y, x1, y1;
let destination = []
let highlighted_loc = {}

function isValid(x, y) {

   if (x < 0 || y < 0 || x >= 8 || y >= 8) return false;

   return true;
}

function deletePrevEle() {

   let prevEleLocation = document.getElementById(prevEle[0][0])


   let k = prevEle[0][0].split(" ")

   let tempI = Number(k[0])
   let tempJ = Number(k[1][0])

   let idDiv = tempI.toString() + " " + tempJ.toString()

   let prevEleLocationDiv = document.getElementById(idDiv)


   if ((tempI + tempJ) % 2 === 0) {
      prevEleLocation.className = ""
      prevEleLocation.className = "tile tile-diable-img"

      prevEleLocationDiv.className = ""
      prevEleLocationDiv.className = "tile tile-black"

   } else {
      prevEleLocation.className = ""
      prevEleLocation.className = "tile tile-diable-img"

      prevEleLocationDiv.className = ""
      prevEleLocationDiv.className = "tile tile-white"

   }
}

function findNextSpot(i1, j1) {

   let possibleX = [2, 2, -2, -2, 1, 1, -1, -1];
   let possibleY = [-1, 1, 1, -1, 2, -2, 2, -2];


   let possiblePos = []

   for (let i = 0; i < 8; ++i) {

      let xX = i1 + possibleX[i]
      let yY = j1 + possibleY[i]

      if (xX == destination[0][0] && yY == destination[0][1]) {

         let key = destination[0][0] + " " + destination[0][1] + "img"
         let element = document.getElementById(key)

         element.className = ""
         element.className = "tile tile-helper"

         deletePrevEle()

      }

      if (isValid(xX) && isValid(yY)) {

         possiblePos.push([xX, yY])

      }
   }

   return possiblePos
}

function getHightlightSqures(e) {

   if (!src_moved) {
      src_moved = true;
   }
   let currentLocation = e.currentTarget.id;

   let temp = currentLocation.split(" ")

   let i = Number(temp[0])
   let j = Number(temp[1])

   let highlightSqures = findNextSpot(i, j)

   for (let i = 0; i < highlightSqures.length; ++i) {
      let eleId = highlightSqures[i][0].toString() + " " + highlightSqures[i][1]
      next_possible_loc[eleId] = true
      let ele = document.getElementById(eleId)
      ele.className = ""
      ele.className = "tile-highlight"
   }

}

function helper() {

   let temp = prevEle[0][0].split(" ")
   let tempI = Number(temp[0])
   let tempJ = Number(temp[1][0])
   let helperArray = fun(tempI, tempJ, destination[0][0], destination[0][1])

   for (let i = 1; i < 2; ++i) {

      let helperI = helperArray[i][0]
      let helperJ = helperArray[i][1]

      let index = helperI.toString() + " " + helperJ.toString()

      let helperEle = document.getElementById(index)

      highlighted_loc[index] = true

      helperEle.className = ""
      helperEle.className = "tile-helper"


   }
}

function finish() {
   let key = destination[0][0] + " " + destination[0][1]

   if (key in next_possible_loc) {
      let imgKey = key + "img"
      let ele = document.getElementById(imgKey)

      ele.src = "Chess-Knight.png"

      deletePrevEle()

      alert("You have reached to the final location")

   } else {
      alert("You are stil not done with the game!")
   }
}

function hightlightSqures(e) {

   let currentLocation = e.currentTarget.id;

   if (Object.keys(highlighted_loc).length > 0) {

      let greenDelete = Object.keys(highlighted_loc)

      for (let i = 0; i < greenDelete.length; ++i) {

         let ele = document.getElementById(greenDelete[i])

         ele.className = ""

         let k = greenDelete[i].split(" ")
         let tempI = Number(k[0])
         let tempJ = Number(k[1])

         if ((tempI + tempJ) % 2 == 0) {
            ele.className = ""
            ele.className = "tile tile-black"
         } else {
            ele.className = ""
            ele.className = "tile tile-white"
         }
      }

      highlighted_loc = {}
   }

   if (Object.keys(next_possible_loc).length === 0 && !src_moved) {
      alert("Please click on the Knight first then move to the highlighted squre!")
   }

   else if (Object.keys(next_possible_loc).length === 0 && src_moved) {
      getHightlightSqures(e)
   }

   else if (currentLocation in next_possible_loc) {

      // first make the next_possible_loc empty

      let keyOfObjectArray = Object.keys(next_possible_loc)

      for (let i = 0; i < keyOfObjectArray.length; ++i) {

         let divId = document.getElementById(keyOfObjectArray[i])

         let k = keyOfObjectArray[i].split(" ")

         let tempI = Number(k[0])
         let tempJ = Number(k[1])

         if ((tempI + tempJ) % 2 == 0) {
            divId.className = ""
            divId.className = "tile tile-black"
         } else {
            divId.className = ""
            divId.className = "tile tile-white"
         }
      }

      deletePrevEle()

      prevEle[0][0] = currentLocation + "img"
      next_possible_loc = {}

      let img_id = currentLocation + "img"
      let img_ele = document.getElementById(img_id)

      console.log(img_ele)
      img_ele.className = ""
      img_ele.className = "tile"

   } else {
      alert("You cannot move here, please move the highlighted squres")
   }
}


// function for getting the random palces

function getRandomSpot() {

   return [Math.floor(Math.random() * 7), Math.floor(Math.random() * 7), Math.floor(Math.random() * 7), Math.floor(Math.random() * 7)];
}


// function to make a div tag and place the Knight and Target image.

function insertDivElement(x, y, x1, y1, i, j) {


   if (x === i && y === j) {
      return <div className='tile' key={i + " " + j} id={i + " " + j} onClick={getHightlightSqures}><img src="Chess-Knight.png" className="tile" alt="src img" id={i + " " + j + "img"} /></div>
   }

   // here we place the destination image
   else if (x1 === i && y1 === j) {
      return <div className='tile' key={i + " " + j} id={i + " " + j} onClick={finish}><img src="destination.png" className="tile tile-destination" alt="destination img" id={i + " " + j + "img"} /></div>
   }

   else if ((i + j) % 2 === 0) {
      return <div className="tile tile-black" key={i + " " + j} id={i + " " + j} onClick={hightlightSqures}><img src="Chess-Knight.png" className="tile tile-diable-img" alt="src img" id={i + " " + j + "img"} /></div>

   } else {
      return <div className="tile tile-white" key={i + " " + j} id={i + " " + j} onClick={hightlightSqures}><img src="Chess-Knight.png" className="tile tile-diable-img" alt="src img" id={i + " " + j + "img"} /></div>
   }
}

function createChessBoard(x, y, x1, y1, board) {

   for (let i = 0; i < 8; ++i) {
      for (let j = 0; j < 8; ++j) {

         let temp = insertDivElement(x, y, x1, y1, i, j)
         board.push(temp)
      }
   }

}

// function to re-render the knight and destination place.

function randomBtnClcik() {
   window.location.reload()
}

class ChessBoard extends React.Component {

   render() {

      // getting the random spots for the knight and destination

      const spots = getRandomSpot()


      // board array for all the div tag which are making the 8*8 chessboard.

      let board = []

      // assigning each varible its value retrive from the spots.
      // x, y => Knight inital position, x1, y1 => destionation position.

      x = spots[0]
      y = spots[1]

      x1 = spots[2]
      y1 = spots[3]


      // pushing the elements into the array for further use.

      if (prevEle.length == 0) {
         prevEle.push([x + " " + y + "img"])
         destination.push([x1, y1])
      }

      // creating the chessboard
      createChessBoard(x, y, x1, y1, board)


      return (
         <div>
            <div id="board">{board}</div>
            <button className='btn' onClick={randomBtnClcik}>Get Random location</button>
            <button onClick={helper} className='btn'>Help</button>
         </div>
      )
   }

}

export default ChessBoard