require("jest-dom/extend-expect");
require("@testing-library/react/cleanup-after-each");
const { configure } = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");

configure({ adapter: new Adapter() });
