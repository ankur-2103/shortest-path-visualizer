export function dijkstra(grid, startNode, finishNode){
    const visitedNodes = [];
    startNode.distance = 0;
    const unvisitedNodess = getAllNodes(grid);
    while(!!unvisitedNodess.length){
        sortByDistance(unvisitedNodess);
        const closestNode = unvisitedNodess.shift();
        if(closestNode.isWall)continue;
        if(closestNode.distance===Infinity)return visitedNodes;
        closestNode.isVisited = true;
        visitedNodes.push(closestNode);
        if(closestNode === finishNode)return visitedNodes;
        updateNeighbors(closestNode, grid);
    }
}

function updateNeighbors(node, grid){
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for(let neighbor of unvisitedNeighbors){
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}

function getUnvisitedNeighbors(node, grid){
    const neighbors = [];
    const {row, col} = node;
    if(row > 0)neighbors.push(grid[row-1][col]);
    if(row < grid.length - 1)neighbors.push(grid[row+1][col]);
    if(col > 0)neighbors.push(grid[row][col-1]);
    if(col < grid[0].length-1)neighbors.push(grid[row][col+1]);
    return neighbors.filter((neighbor) => !neighbor.isVisited);
}

function sortByDistance(unvisiTedNodess){
    unvisiTedNodess.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function getAllNodes(grid){
    const newGrid = [];
    for(let row of grid){
        for(let node of row){
            newGrid.push(node);
        }
    }
    return newGrid;
}

export function getNodesInShortestPath(finishNode){
    const path = [];
    let currNode = finishNode;
    console.log(finishNode);
    while(currNode !== null){
        path.unshift(currNode);
        // console.log(currNode);
        currNode = currNode.previousNode;
    }
    return path;
}