import React from "react";

import { storiesOf, addDecorator } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import MyComponent from "../index";
addDecorator(withA11y);
storiesOf("MyComponent", module)
    .add("to Storybook", () => <MyComponent />)
    .add("Inaccessible", () => (
        <button style={{ backgroundColor: "black", color: "black" }}>
            Inaccessible button
        </button>
    ));
