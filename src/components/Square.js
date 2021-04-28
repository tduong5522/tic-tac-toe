export const Square = ({value, onClick}) => {
    return (
        <button className="square" onClick={() => onClick()}>
          {value}
        </button>
    );
}