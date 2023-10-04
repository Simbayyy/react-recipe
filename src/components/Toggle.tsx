import React from "react";

export const Toggle: React.FunctionComponent<{
    className?: string;
    toggled: boolean;
    setToggled: React.Dispatch<React.SetStateAction<boolean>>;
    text: string;
}> = ({ className, toggled, setToggled, text }): React.ReactElement => {
  return (
    <button
    onClick={() => setToggled(!toggled)}
    className={`${className} toggle__button`}
    >
        <svg
        width="18mm"
        height="10mm"
        version="1.1"
        viewBox="0 0 18 10"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className}__switch`}
        >
        <g
            fill-rule="evenodd"
            stroke="#000"
            stroke-linecap="round"
            stroke-linejoin="bevel"
        >
            <rect
            x="2.0056"
            y="1.1277"
            width="13.989"
            height="7.7447"
            ry="40%"
            fill={toggled ? "#d45500" : "#e6e6e6"}
            stop-color="#000000"
            stroke-width=".2"
            className={`toggle__rectangle`}
            />
            <circle
            cx="5.9001"
            cy="5"
            r="2.8119"
            fill="#fff"
            stop-color="#000000"
            stroke-width=".16401"
            style={{transform:`translateX(${toggled ? "34%" : 0})`,transition:" transform .25s ease-in-out"}}
            className={`toggle__circle ${toggled ? "toggle__circle__toggled":""}`}
            />
        </g>
        </svg>
        <div
        className={`${className}__text`}
        >
            {text}
        </div>
    </button>
);
};
