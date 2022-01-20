import React, {Component} from "react";
import '../Css/Board.css';
import Node from "./Node";
import { dijkstra, getNodesInShortestPath } from "../Algo/Dijkstra";

const start_row = 10
const start_col = 5
const end_row = 10
const end_col = 55

const getNewGrid = () => {
    const grid = [];
    for(let row=0; row<20; row++){
        const currRow = [];
        for(let col=0; col<60; col++){
            currRow.push(createNode(row, col))
        }
        grid.push(currRow);
    }
    return grid;
}

const createNode = (row, col) => {
    return {
        row, 
        col,
        isStart: row===start_row && col===start_col,
        isFinish: row===end_row && col===end_col,
        isWall: false,
        distance: Infinity,
        isVisited: false,
        previousNode: null
    }
}

const getWallToggledGrid = (grid, row, col) => {
    const newgrid = grid.slice();
    const node = newgrid[row][col];
    if(node.isStart || node.isFinish)return newgrid;
    const newNode = {
        ...node,
        isWall: !node.isWall
    };
    newgrid[row][col] = newNode;
    return newgrid;
};

export default class Board extends Component{
    constructor(){
        super();
        this.state = {
            grid: [],
            mousePressed: false
        };
    }

    componentDidMount(){
        const grid = getNewGrid();
        this.setState({grid});
    }

    handleMouseDown(row, col){
        const newgrid = getWallToggledGrid(this.state.grid, row, col);
        this.setState({grid: newgrid, mousePressed: true});
    }

    handleMouseEnter(row, col){
        if(!this.state.mousePressed)return;
        const newgrid = getWallToggledGrid(this.state.grid, row, col);
        this.setState({grid:newgrid});
    }

    handleMouseUp(){
        this.setState({mousePressed: false});
    }

    findpath(){
        const {grid} = this.state;
        const startNode = grid[start_row][start_col];
        const finishNode = grid[end_row][end_col];
        const visitedNodes = dijkstra(grid, startNode, finishNode, 'bfs');
        const shortestPath = getNodesInShortestPath(finishNode);
        this.animateVisitedNode(visitedNodes, shortestPath);
    }

    animateVisitedNode(visitedNodes, shortestpath){
        for(let i=0; i<=visitedNodes.length; i++){
            if(i === visitedNodes.length){
                setTimeout(() => {
                    this.setAnimatedShortestPath(shortestpath);
                }, 10.5*i);
            }else{
                setTimeout(() => {
                    const node = visitedNodes[i];
                    if(!node.isStart && !node.isFinish ){
                        document.getElementById(`node-${node.row}-${node.col}`).className = 'node-visited';
                    }
                }, 10*i)
            }
        }
    }

    setAnimatedShortestPath(shortestPath){
        for(let i=0; i<shortestPath.length; i++){
            setTimeout(() => {
                const node = shortestPath[i];
                if(!node.isStart && !node.isFinish ){
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'node-shortest-path';
                }
            }, 50*i)
        }
    }

    render(){
        const {grid, mousePressed} = this.state;
        return (
            <>
                <button onClick={() => this.findpath()}>
                    Find path
                </button>                   
                <div className="grid">
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const {row, col, isStart, isFinish, isWall, isVisited} = node;
                                    return (                                        
                                        <Node
                                        key={nodeIdx}
                                        row={row}
                                        col={col}
                                        isStart={isStart}
                                        isFinish={isFinish}
                                        isWall={isWall}
                                        isVisited={isVisited}
                                        mousePressed={mousePressed}
                                        onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                        onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                                        onMouseUp={()=> this.handleMouseUp()}
                                        ></Node>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </>
        )
    }
};

