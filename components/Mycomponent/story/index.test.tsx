import MyComponent from "..";
import { shallow } from "enzyme";
import React from "react";

describe("MyComponent", () => {
    it("should ", () => {
        const wrapper = shallow(<MyComponent text="helow" />);
        const welcome = <div />;
        expect(wrapper.contains(welcome)).toEqual(true);
    });
});
