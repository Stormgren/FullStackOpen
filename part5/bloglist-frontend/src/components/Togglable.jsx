import {useState} from "react";

const Togglable = (props) => {
    const [isVisible, setIsVisible] = useState(false);

    const hideWhenVisible = {display: isVisible ? 'none' : ''}
    const showWhenVisible = {display: isVisible ? '' : 'none'}

    const toggleVisibility = () => {
        setIsVisible(!isVisible)
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>Cancel</button>
            </div>
        </div>
    );
}

export default Togglable;