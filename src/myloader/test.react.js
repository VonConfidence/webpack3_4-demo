const React = require("react");
const ReactDOM = require("react-dom");
const $ = React.createElement;

ReactDOM.render(
  $("div", null, "Hello World"), // <div>Hello World</div>
  document.getElementById("root")
);