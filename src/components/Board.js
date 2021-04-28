import { Square } from "./Square";

export const Board = ({squares, onClick}) => {
    const renderSquere = i => <Square value={squares[i]} onClick={() => onClick(i)}/>
    return (
        <>
        <div className="board-row">
            {renderSquere(0)}
            {renderSquere(1)}
            {renderSquere(2)}
        </div>
        <div className="board-row">
            {renderSquere(3)}
            {renderSquere(4)}
            {renderSquere(5)}
        </div>
        <div className="board-row">
            {renderSquere(6)}
            {renderSquere(7)}
            {renderSquere(8)}
        </div>
        </>
    )
}