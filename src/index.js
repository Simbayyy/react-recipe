"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = __importDefault(require("react-dom/client"));
require("./static/index.css");
const App_1 = __importDefault(require("./components/App"));
const reportWebVitals_1 = __importDefault(require("./reportWebVitals"));
const react_router_dom_1 = require("react-router-dom");
const router = (0, react_router_dom_1.createBrowserRouter)([
    {
        path: "/",
        element: ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(App_1.default, {}), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "about", children: "About Us" })] })),
    },
    {
        path: "about",
        element: (0, jsx_runtime_1.jsx)("div", { children: "About" }),
    },
]);
const root = client_1.default.createRoot(document.getElementById("root"));
root.render((0, jsx_runtime_1.jsx)(react_router_dom_1.RouterProvider, { router: router }));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
(0, reportWebVitals_1.default)(console.log);
