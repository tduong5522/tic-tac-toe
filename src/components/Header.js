import PropTypes from 'prop-types';
import {useState} from 'react';
const Header = (props) => {
    const [arr, setArr] = useState([1,2,3]);  
    return (
        <header>
            <h1>{props.title} {arr}</h1>
        </header>
    )
}

Header.defaultProps = {
    title: "Header"
}
Header.propTypes = {
    title: PropTypes.string.isRequired
}
export default Header
