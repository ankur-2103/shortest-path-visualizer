import React, {Component} from "react";
import '../Css/Node.css';

export default class Node extends Component{

    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        const {row, col, isStart, isFinish, isWall, isVisited, onMouseDown,
            onMouseEnter,
            onMouseUp} = this.props;
        return (<div id={`node-${row}-${col}`} className={isStart ? 'node-start' : isFinish ? 'node-finish' : isWall ? 'node-wall' : isVisited ? 'node-visited' : 'node'} onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()} 
         ></div>);
    }

};