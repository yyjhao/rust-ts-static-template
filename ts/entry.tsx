import { h, render } from "preact";
import init, { test } from "../pkg/{{project-name}}";

let doubleTouchStartTimestamp = 0;
document.addEventListener("touchstart", function (event) {
  var now = Date.now();
  if (doubleTouchStartTimestamp + 500 > now) {
    event.preventDefault();
  }
  doubleTouchStartTimestamp = now;
});

init("/pkg/{{project-name}}_bg.wasm").then(function () {
  const container = document.querySelector("#container")!;
  container.innerHTML = "";
  render(<div>{test()}</div>, container);
});

if (!(window as any).PRODUCTION) {
  const script = document.createElement("script");
  const scriptSrc =
    window.location.protocol +
    "//" +
    window.location.hostname +
    ":35729/livereload.js?snipver=1";
  script.setAttribute("src", scriptSrc);
  document.head.appendChild(script);
}
