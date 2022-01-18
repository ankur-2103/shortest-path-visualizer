export function unWeightedGrap(grid, statrNode, finishNode, name){
    if(!statrNode || !finishNode || statrNode===finishNode)return null;
    let visitedNode = [];
    let structure = [statrNode];
    // let explordeNode = {start: true};
    while(structure.length){
        let currNode = name === 'bfs' ? structure.shift() : structure.pop();
        if(currNode.isWall)continue;
        visitedNode.push(currNode);
        currNode.isVisited = true;
        if(currNode === finishNode)return visitedNode;
        let currNeighbors = getNeighbors(currNode, grid, name);
        // console.log(currNeighbors);
        currNeighbors.forEach(neighbor => {
            if(!neighbor.isVisited){
                if(name==='bfs')neighbor.isVisited = true;
                neighbor.previousNode = currNode;
                structure.push(neighbor);
            }
        })
    }
    return visitedNode;
}

function getNeighbors(node, grid, name){
    const {row, col} = node;
    let neighbors = [];
    if(grid[row-1] && grid[row-1][col]){
        if(!node.isWall){
            if(name==='bfs'){
                neighbors.push(grid[row-1][col]);
            }else{
                neighbors.unshift(grid[row-1][col]);
            }
        }
    }
    if(grid[row+1] && grid[row+1][col]){
        if(!node.isWall){
            if(name==='bfs'){
                neighbors.push(grid[row+1][col]);
            }else{
                neighbors.unshift(grid[row+1][col]);
            }
        }
    }
    if(grid[row][col-1]){
        if(!node.isWall){
            if(name==='bfs'){
                neighbors.push(grid[row][col-1]);
            }else{
                neighbors.unshift(grid[row][col-1]);
            }
        }
    }
    if(grid[row][col+1]){
        if(!node.isWall){
            if(name==='bfs'){
                neighbors.push(grid[row][col+1]);
            }else{
                neighbors.unshift(grid[row][col+1]);
            }
        }
    }
    return neighbors;
}

export function getNodesInShortestPath(finishNode){
    const path = [];
    let currNode = finishNode;
    while(currNode !== null){
        path.unshift(currNode);
        // console.log(currNode);
        currNode = currNode.previousNode;
    }
    return path;
}