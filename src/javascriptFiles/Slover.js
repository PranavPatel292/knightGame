// use in order to print out the path of the knight




// function to check if the currentX and currentY are
// the valid place or not.

function isValid(x, y) {

    if (x < 0 || y < 0 || x >= 8 || y >= 8) return false;

    return true;
}

// function which will slove the chessboard problem by taking the src and des location as a param. It uses 
// the Queue and BFS in order to slove the problem while considering the all the postion, a knight can move on 
// the specefic locationv (by using the auxilary function isValid()) on chessboard. 

function helpSolveChessBoard(kX, kY, tX, tY, parent_hash_map) {

    

    // all 8 possbile moves for the knight
    let possibleX = [2, 2, -2, -2, 1, 1, -1, -1];
    let possibleY = [-1, 1, 1, -1, 2, -2, 2, -2];

    // we will solve this by using the BSF method
    // expend our serach area one by one and trying out all the possible 
    // moves for the night
    // so to do this we will need a queue and then we can explore one 
    // by one each move while poping up the current move

    let queue = []

    // making the visited array

    let visited = {}

    // we will insert our initial location (co-ordinates)

    queue.push([kX, kY])

    let key = kX.toString() + "#" + kY.toString()

    parent_hash_map[key] = "###"

    visited[key] = true

    // now continue the loop until the queue becomes empty or we have find the target location

    while (queue.length !== 0) {

        // to get first element of the array
        let temp = queue.shift()

        let newX = temp[0]
        let newY = temp[1]

        //check if the  the newX and newY is our target loction if yes return True

        if (newX === tX && newY === tY) {
            return true
        }

        for (let i = 0; i < 8; ++i) {

            let tempX = newX + possibleX[i]
            let tempY = newY + possibleY[i]

            key = tempX.toString() + "#" + tempY.toString()

            if (isValid(tempX, tempY) && !visited[key]) {
                visited[key] = true
                queue.push([tempX, tempY])
                parent_hash_map[key] = newX.toString() + "#" + newY.toString()

            }
        }
    }

    // if no path found and queue is also empty return false
    return false
}

// This function will iter. till the src not found. Since the src node
// has been asssign to the value "###", the loop will run till that value not found.
// Here, we have already checked the validatity of the path exist or not
// in our inital function helpSolveChessBoard(x, y, x1, y1), therefore we
// are asure that the functoion getOutputPath will always produce a valid answer.

function getOutputPath(tX, tY, parent_hash_map) {


    // array containing the final path, must be reversed in output

    let result = []

    // pushing the destination first

    result.push([tX, tY])

    // making a key to extract the information from the hash set 
    // of the parent information.

    let key = tX.toString() + "#" + tY.toString()

    let parentValue = parent_hash_map[key]


    // spliting the value via "#" sign, as vlaue left to
    // the "#" is x location and right to it is a y location.

    let temp = parentValue.split("#");

    result.push([Number(temp[0]), Number(temp[1])])

    // running the while loop till the src node not found.

    while (parent_hash_map[parentValue] !== "###") {
        temp = parent_hash_map[parentValue].split("#")

        let x = temp[0]
        let y = temp[1]


        // pushing back all the resulted in the final array

        result.push([Number(x), Number(y)])

        parentValue = parent_hash_map[parentValue]
    }

    return result
}


function doStuff(actalX, actalY, targetX, targetY){

    let parent_hash_map = {}

    console.log(actalX, actalY, targetX, targetY)

    if(helpSolveChessBoard(actalX, actalY, targetX, targetY, parent_hash_map)) {

        let outputPath = getOutputPath(targetX, targetY, parent_hash_map)
        let resultPath = []

        for (let i = outputPath.length - 1; i >= 0; --i) {
            resultPath.push(outputPath[i])
        }

        return resultPath
    }
    else {
        return []
    }
}

export default function(x, y, x1, y1){
    console.log(x, y, x1, y1)
    return doStuff(x, y, x1, y1)
}