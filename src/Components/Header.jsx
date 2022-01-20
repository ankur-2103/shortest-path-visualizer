import React from "react";
import '../Css/Header.css';
import Node from "./Node";

export default function Header() {
    return (
    <>
        <div className="header">
            <div className="title">
                Shortest Pathfinding Visualizer
            </div>
            <div className="info">
                
                <div className="start-node"><Node isStart={true}></Node> Start Node</div>
                <div className="target-node"><Node isFinish={true}></Node> Target Node</div>
                <div className="Wall-node"><Node isWall={true}></Node> Wall Node</div>
                <div className="visited-node"><div className="v1"></div> Visited Node</div>
                <div className="shortest-path"><div className="sp"></div> Shortest-path Node</div>
            </div>
        </div>
        <div className="cb">Reload for clearing the board&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Click and drag on board to create walls</div>
    </>
    );
}