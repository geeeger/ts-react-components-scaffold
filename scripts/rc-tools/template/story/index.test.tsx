import MyComponent from "..";
import { shallow } from "enzyme";
import React from "react";

describe("MyComponent", () => {
    it("should ", () => {
        const wrapper = shallow(<MyComponent />);
        const welcome = <div />;
        expect(wrapper.contains(welcome)).toEqual(true);
    });
});
