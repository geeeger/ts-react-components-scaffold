import React from "react";
import "./index.less";
export default class MyComponent extends React.Component {
    props: {
        text: any;
        handleClick?: any;
    };
    render() {
        return (
            <div className="test">
                <button
                    onClick={e => {
                        this.props.handleClick && this.props.handleClick(e);
                    }}
                >
                    {this.props.text}
                </button>
            </div>
        );
    }
}
