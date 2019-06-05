import React from "react";

import { storiesOf } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { action, configureActions } from "@storybook/addon-actions";
import { withKnobs, text } from "@storybook/addon-knobs";
import { linkTo } from "@storybook/addon-links";

import MyComponent from "../index";
import { withInfo } from "@storybook/addon-info";

configureActions({
    depth: 100,
    // Limit the number of items logged into the actions panel
    limit: 20
});

const props = {
    handleClick: action("handleClick"),
    // withKnobs just use on pure component
    text: text("text", "12453")
};

storiesOf("MyComponent", module)
    .addDecorator(withInfo)
    .addDecorator(withKnobs)
    .addDecorator(withA11y)
    .add("parent component", () => <MyComponent {...props} />, {
        info: "☹️ just a example",
        notes: {
            markdown: `
# test
whooo
                `
        }
    })
    .add("First", () => (
        <button onClick={linkTo("MyComponent", "Second")}>
            Go to "Second"
        </button>
    ))
    .add("Second", () => (
        <button onClick={linkTo("MyComponent", "First")}>Go to "First"</button>
    ));
