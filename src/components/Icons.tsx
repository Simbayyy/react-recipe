import React from "react";

export const Loading: React.FunctionComponent<{
  className?: string;
}> = ({ className }): React.ReactElement => {
  return (
    <svg
      width="15mm"
      height="15mm"
      className={`svg ${className || ""}`}
      version="1.1"
      viewBox="0 0 15 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        transform="matrix(1.9109 0 0 1.9109 -6.8317 -5.4994)"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="bevel"
        strokeWidth=".26458"
      >
        <path
          d="m7.4848 3.6695a3.1331 3.1331 0 0 0-3.1171 3.0903 3.1331 3.1331 0 0 0 3.0313 3.1745 3.1331 3.1331 0 0 0 3.2303-2.9719l0.0031-0.23358a3.1331 3.1331 0 0 0-3.1476-3.0592zm0.00362 0.75293a2.3804 2.3804 0 0 1 2.3916 2.3239l-0.00258 0.17777a2.3804 2.3804 0 0 1-2.4541 2.2577 2.3804 2.3804 0 0 1-2.3032-2.4117 2.3804 2.3804 0 0 1 2.3683-2.3477z"
          fill="#666"
          stopColor="#000000"
        />
        <path
          d="m9.8774 6.9241a2.3804 2.3804 0 0 1-0.60823 1.4697l0.56069 0.50436a3.1331 3.1331 0 0 0 0.79943-1.9358z"
          fill="#e6e6e6"
          stopColor="#000000"
        />
      </g>
    </svg>
  );
};

export const Arrow: React.FunctionComponent<{
  className?: string;
}> = ({ className }): React.ReactElement => {
  return (
    <svg
      width="210mm"
      height="297mm"
      version="1.1"
      className={`svg ${className || ""}`}
      viewBox="0 0 210 297"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m51.233 30.123c-2.7944 0-5.5886 1.0705-7.7298 3.2117-4.2824 4.2824-4.2824 11.178 1e-6 15.46l99.706 99.706-99.706 99.705c-4.2824 4.2824-4.2824 11.178 0 15.46 4.2824 4.2824 11.178 4.2824 15.46 0l106.19-106.19c0.47196-0.34093 0.92429-0.72223 1.3498-1.1477 2.167-2.1671 3.2353-5.003 3.2091-7.831 0.026-2.8278-1.0422-5.6636-3.2091-7.8305-0.4255-0.4255-0.87783-0.80679-1.3498-1.1477l-106.19-106.19c-2.1412-2.1412-4.9359-3.2117-7.7303-3.2117z"
        fill="#666"
        fillRule="evenodd"
        stopColor="#000000"
        strokeLinecap="round"
        strokeLinejoin="bevel"
        strokeWidth=".30491"
      />
    </svg>
  );
};

export const PrepTime: React.FunctionComponent<{
  className?: string;
  text: string;
}> = ({ className, text }): React.ReactElement => {
  return (
    <svg
      width="15mm"
      height="15mm"
      className={className}
      version="1.1"
      viewBox="0 0 15 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{`Temps de préparation ${text}`}</title>
      <path
        d="m7.4998 0.6413a5.5792 5.5993 0 0 0-0.41341 0.015503c-0.0017114 1.2494e-4 -0.0034568-1.2647e-4 -0.0051677 0a5.5792 5.5993 0 0 0-5.1604 5.5836 5.5792 5.5993 0 0 0 5.579 5.5997 5.5792 5.5993 0 0 0 5.5795-5.5997 5.5792 5.5993 0 0 0-5.1485-5.5826c-0.047737-0.0036305-0.095597-0.0068758-0.14366-0.0093018a5.5792 5.5993 0 0 0-0.14263-0.0051676c-3.429e-4 -8.68e-6 -6.905e-4 8.62e-6 -0.0010335 0a5.5792 5.5993 0 0 0-0.14366-0.0020671z"
        fill="#d45500"
        fillRule="evenodd"
        stopColor="#000000"
        strokeLinecap="round"
        strokeLinejoin="bevel"
        strokeWidth=".38719"
      />
      <path
        d="m7.4998 1.7265a4.5142 4.5142 0 0 0-4.5139 4.5139 4.5142 4.5142 0 0 0 4.5139 4.5143 4.5142 4.5142 0 0 0 4.5143-4.5143 4.5142 4.5142 0 0 0-4.5143-4.5139zm0 0.77191a3.7423 3.7423 0 0 1 3.7424 3.742 3.7423 3.7423 0 0 1-3.7424 3.7424 3.7423 3.7423 0 0 1-3.742-3.7424 3.7423 3.7423 0 0 1 3.742-3.742z"
        fill="#e6e6e6"
        fillRule="evenodd"
        stopColor="#000000"
        strokeLinecap="round"
        strokeLinejoin="bevel"
        strokeWidth=".31214"
      />
      <text x="7.5048504" y="14.635936" fill="#d45500" xmlSpace="preserve">
        <tspan
          x="7.5048504"
          y="14.635936"
          fill="#d45500"
          className="preptime__icon__text"
        >
          {text}
        </tspan>
      </text>
      <rect
        transform="matrix(-.99998 .0056807 -.0025889 -1 0 0)"
        x="-10.21"
        y="-6.6049"
        width="1.9424"
        height=".40826"
        ry=".20413"
        fill="#e6e6e6"
        fillRule="evenodd"
        stopColor="#000000"
        strokeLinecap="round"
        strokeLinejoin="bevel"
        strokeWidth=".125"
      />
      <g className="preptime__icon__spinny_knife">
        <rect
          transform="matrix(.0048158 .99999 -1 .0030539 0 0)"
          x="3.2613"
          y="-7.7096"
          width="3.0296"
          height=".53982"
          ry=".26991"
          fill="#e6e6e6"
          fillRule="evenodd"
          stopColor="#000000"
          strokeLinecap="round"
          strokeLinejoin="bevel"
          strokeWidth=".17951"
        />
        <path
          d="m6.1516 6.0942 1.5804 2.64e-5 -2.2e-6 3.5796c-0.3609-0.079169-1.5804-0.67293-1.5804-2.0091-2e-7 -0.036736-1.05e-5 -1.5706-1.05e-5 -1.5706z"
          fill="#b3b3b3"
        />
      </g>
      <path
        d="m7.4998 1.7265a4.5142 4.5142 0 0 0-4.5139 4.5139 4.5142 4.5142 0 0 0 4.5139 4.5143 4.5142 4.5142 0 0 0 4.5143-4.5143 4.5142 4.5142 0 0 0-4.5143-4.5139zm0 0.77191a3.7423 3.7423 0 0 1 3.7424 3.742 3.7423 3.7423 0 0 1-3.7424 3.7424 3.7423 3.7423 0 0 1-3.742-3.7424 3.7423 3.7423 0 0 1 3.742-3.742z"
        fill="#e6e6e6"
        fillRule="evenodd"
        stopColor="#000000"
        strokeLinecap="round"
        strokeLinejoin="bevel"
        strokeWidth=".31214"
      />
    </svg>
  );
};

export const CookTime: React.FunctionComponent<{
  className?: string;
  text: string;
}> = ({ className, text }): React.ReactElement => {
  return (
    <svg
      width="15mm"
      height="15mm"
      className={className}
      version="1.1"
      viewBox="0 0 15 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{`Temps de cuisson ${text}`}</title>
      <path
        d="m7.4998 0.6413a5.5792 5.5993 0 0 0-0.41341 0.015503c-0.0017114 1.2494e-4 -0.0034568-1.2647e-4 -0.0051677 0a5.5792 5.5993 0 0 0-5.1604 5.5836 5.5792 5.5993 0 0 0 5.579 5.5997 5.5792 5.5993 0 0 0 5.5795-5.5997 5.5792 5.5993 0 0 0-5.1485-5.5826c-0.047737-0.0036305-0.095597-0.0068758-0.14366-0.0093018a5.5792 5.5993 0 0 0-0.14263-0.0051676c-3.429e-4 -8.68e-6 -6.905e-4 8.62e-6 -0.0010335 0a5.5792 5.5993 0 0 0-0.14366-0.0020671z"
        fill="#d45500"
        fillRule="evenodd"
        stopColor="#000000"
        strokeLinecap="round"
        strokeLinejoin="bevel"
        strokeWidth=".38719"
      />
      <text x="7.5048504" y="14.635936" fill="#d45500" xmlSpace="preserve">
        <tspan
          x="7.5048504"
          y="14.635936"
          fill="#d45500"
          className="preptime__icon__text"
        >
          {text}
        </tspan>
      </text>
      <g
        transform="matrix(1.4857 0 0 1.4857 -1.7057 -1.094)"
        fill="#e6e6e6"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="bevel"
      >
        <rect
          transform="matrix(-.99998 .0056807 -.0025889 -1 0 0)"
          x="-8.1221"
          y="-5.201"
          width="1.3815"
          height=".29036"
          ry=".14518"
          stopColor="#000000"
          strokeWidth=".088899"
        />
        <rect
          transform="matrix(.0042864 .99999 -.99999 .0034311 0 0)"
          x="2.823"
          y="-6.2971"
          width="1.8063"
          height=".28647"
          ry=".14324"
          stopColor="#000000"
          strokeWidth=".10097"
        />
        <path
          d="m6.1962 1.7265a3.2105 3.2105 0 0 0-3.2103 3.2103 3.2105 3.2105 0 0 0 3.2103 3.2106 3.2105 3.2105 0 0 0 3.2106-3.2106 3.2105 3.2105 0 0 0-3.2106-3.2103zm0 0.54899a2.6616 2.6616 0 0 1 2.6616 2.6613 2.6616 2.6616 0 0 1-2.6616 2.6616 2.6616 2.6616 0 0 1-2.6613-2.6616 2.6616 2.6616 0 0 1 2.6613-2.6613z"
          stopColor="#000000"
          strokeWidth=".222"
        />
      </g>
      <g
        className="cooktime__icon__pan"
        transform="matrix(.82138 0 0 .82138 1.6787 1.7166)"
      >
        <rect
          transform="rotate(-15)"
          x="6.0603"
          y="10.902"
          width="4.6707"
          height=".50899"
          ry=".25335"
          fill="#333"
          fillRule="evenodd"
          stopColor="#000000"
          stroke="#333"
          strokeLinecap="round"
          strokeLinejoin="bevel"
          strokeWidth=".011"
        />
        <g transform="matrix(1.845 -.22741 .22741 1.845 -7.6716 -6.2752)">
          <ellipse
            cx="5.9575"
            cy="9.2307"
            rx="2.1468"
            ry=".48723"
            fill="#fff"
            fillRule="evenodd"
            stopColor="#000000"
          />
          <path
            d="m5.9552 9.2502c-0.89352 6.47e-5 -1.6742 0.14979-1.8996 0.36432 0.37754 0.15716 1.1066 0.25513 1.8996 0.25528 0.79323-1.1e-4 1.5225-0.098088 1.9001-0.25528-0.22546-0.21458-1.0064-0.36431-1.9001-0.36432zm-1.9637 0.48731c2.444e-4 0.023175 0.00715 0.046315 0.020671 0.069246-0.00778-0.022432-0.014901-0.045283-0.020671-0.069246z"
            fill="#d45500"
            fillRule="evenodd"
            stopColor="#000000"
          />
          <path
            d="m3.9863 9.4228c0.03733 0.6943 0.73531 0.85881 1.9864 0.84491 1.1028-0.01226 1.7763-0.12106 1.946-0.62119 0.022825-0.067257 0.03654-0.14159 0.040965-0.22372-0.34097 0.17903-1.1224 0.29507-1.987 0.29507-0.86436-4.48e-5 -1.6455-0.11608-1.9864-0.29507z"
            fill="#333"
            stroke="#333"
            strokeWidth=".26458px"
          />
        </g>
        <path
          d="m9.2576 10.064c0.38573-0.8025 1.8054-1.2151 1.8054-1.2151l-1.5926-0.048512-0.28376 0.24715z"
          fill="#333"
        />
      </g>
    </svg>
  );
};

export const TotalTime: React.FunctionComponent<{
  className?: string;
  text: string;
}> = ({ className, text }): React.ReactElement => {
  return (
    <svg
      width="15mm"
      height="15mm"
      className={className}
      version="1.1"
      viewBox="0 0 15 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{`Temps total ${text}`}</title>
      <path
        d="m7.4998 0.6413a5.5792 5.5993 0 0 0-0.41341 0.015503c-0.0017114 1.2494e-4 -0.0034568-1.2647e-4 -0.0051677 0a5.5792 5.5993 0 0 0-5.1604 5.5836 5.5792 5.5993 0 0 0 5.579 5.5997 5.5792 5.5993 0 0 0 5.5795-5.5997 5.5792 5.5993 0 0 0-5.1485-5.5826c-0.047737-0.0036305-0.095597-0.0068758-0.14366-0.0093018a5.5792 5.5993 0 0 0-0.14263-0.0051676c-3.429e-4 -8.68e-6 -6.905e-4 8.62e-6 -0.0010335 0a5.5792 5.5993 0 0 0-0.14366-0.0020671z"
        fill="#d45500"
        fillRule="evenodd"
        stopColor="#000000"
        strokeLinecap="round"
        strokeLinejoin="bevel"
        strokeWidth=".38719"
      />
      <text x="7.5048504" y="14.635936" fill="#d45500" xmlSpace="preserve">
        <tspan
          x="7.5048504"
          y="14.635936"
          fill="#d45500"
          className="preptime__icon__text"
        >
          {text}
        </tspan>
      </text>
      <g
        className="totaltime__icon__spinny_hourglass"
        transform="matrix(.89514 0 0 .89514 .78642 .65433)"
        fill="#ececec"
      >
        <path
          d="m6.9706 1.9001c-0.58289 0-1.1256 0.035181-1.5255 0.0863-0.19996 0.02556-0.36207 0.053661-0.49196 0.091467-0.064943 0.018903-0.11997 0.033223-0.19534 0.084233-0.037681 0.025505-0.089083 0.061019-0.12919 0.15245-0.024115 0.05497-0.0265 0.13164-0.013953 0.2005l0.043408 0.11782c-0.02039-0.029777-0.035087-0.07215-0.043408-0.11782l-0.00723-0.01912s0.11867 0.97805 0.51935 1.9689c0.20034 0.49541 0.4705 0.99926 0.85369 1.3963 0.2158 0.2236 0.71736 0.25011 0.71736 0.37956s-0.46007 0.17074-0.66465 0.38628c-0.37252 0.39246-0.64124 0.88906-0.84595 1.3772-0.2047 0.48811-0.34323 0.96944-0.43357 1.3338-0.045166 0.18216-0.078414 0.33555-0.10129 0.44338-0.011436 0.053916-0.019398 0.096085-0.025322 0.12299-0.00114 0.00517-0.00144 0.00697-0.00207 0.00982 7.987e-4 -0.00318 0.00157-0.00698 0.00362-0.011885 0.00409-0.00982 0.029766-0.053163 0.029456-0.05271-6.195e-4 9.047e-4 -0.050508 0.13184-0.050643 0.13281-1.353e-4 9.706e-4 0.011543 0.13953 0.011886 0.14056 3.427e-4 1e-3 0.030527 0.06844 0.046509 0.08992s0.031944 0.03737 0.044958 0.04909c0.052054 0.04689 0.080342 0.05415 0.10749 0.06615 0.05429 0.02398 0.10057 0.03726 0.1602 0.05271 0.11925 0.03091 0.27812 0.06279 0.47439 0.09198 0.39255 0.05837 0.92968 0.10749 1.5177 0.10749h1.0588c0.58806 0 1.1247-0.04913 1.5172-0.10749 0.19627-0.02918 0.35566-0.06107 0.47491-0.09198 0.05962-0.01545 0.1059-0.02873 0.1602-0.05271 0.02715-0.01199 0.05544-0.01926 0.10749-0.06615 0.01301-0.01172 0.02846-0.02761 0.04444-0.04909s0.04669-0.08889 0.04703-0.08992c3.43e-4 -1e-3 0.01201-0.13959 0.01188-0.14056-1.35e-4 -9.707e-4 -0.05002-0.1319-0.05064-0.13281-3.1e-4 -4.524e-4 0.02675 0.046176 0.03101 0.056844 0.0043 0.010668 0.0044 0.017017 0.0057 0.021187 0.0025 0.00834 0.0042 0.010288 0.0041 0.00982-2.22e-4 -9.486e-4 -0.0031-0.011869-0.0057-0.025321-0.0052-0.026902-0.0138-0.070678-0.02377-0.12506-0.019888-0.10877-0.049262-0.26166-0.089888-0.44545-0.081252-0.3676-0.20628-0.85381-0.40411-1.3457-0.19783-0.49184-0.46483-0.99154-0.84543-1.3844-0.21318-0.22005-0.79439-0.20143-0.79439-0.37078 0-0.16935 0.54329-0.17231 0.74736-0.38731 0.37252-0.39246 0.64279-0.887 0.84749-1.3751 0.2047-0.48811 0.34116-0.97151 0.4315-1.3358 0.04517-0.18216 0.07893-0.33348 0.1018-0.44132 0.01144-0.053916 0.02147-0.098152 0.02739-0.12506 2e-3 -0.00891 9.87e-4 -0.011154 0.0021-0.015503-0.0012 0.00378-0.0021 0.00775-0.0062 0.01757s-0.02925 0.05523-0.02894 0.054777c6.19e-4 -9.047e-4 0.05051-0.1339 0.05064-0.13488 1.35e-4 -9.706e-4 -0.01154-0.13953-0.01188-0.14056-3.42e-4 -0.00103-0.03105-0.068435-0.04703-0.089917s-0.03143-0.035304-0.04444-0.047026c-0.05206-0.046889-0.08034-0.056221-0.10749-0.068213-0.05429-0.023985-0.10057-0.037257-0.1602-0.05271-0.11928-0.030907-0.27867-0.060734-0.47494-0.089916-0.39255-0.058366-0.92916-0.10955-1.5172-0.10955zm0 0.61133h1.0588c0.55318 0 1.0652 0.04797 1.4273 0.1018 0.11991 0.017828 0.19056 0.035691 0.27182 0.05271-0.020658 0.095402-0.040968 0.19532-0.074414 0.33021-0.085532 0.34496-0.21712 0.80005-0.40411 1.2459-0.18699 0.44587-0.43179 0.88109-0.72657 1.1917-0.22713 0.23929-0.41942 0.34106-0.61234 0.42171-0.19292 0.080648-0.27927 0.24757-0.2796 0.36274 3.232e-4 0.13705-0.030058 0.28151 0.17983 0.3638 0.20989 0.082293 0.53969 0.22295 0.76274 0.4532 0.29748 0.30708 0.53726 0.74334 0.71675 1.1896 0.17949 0.44625 0.30058 0.90116 0.37724 1.248 0.030927 0.13992 0.04994 0.24608 0.068213 0.34365-0.082207 0.017391-0.15634 0.034387-0.27957 0.05271-0.36206 0.053832-0.87412 0.10129-1.4273 0.10129h-1.0588c-0.55318 0-1.0658-0.047453-1.4278-0.10129-0.11991-0.017828-0.19005-0.035691-0.2713-0.05271 0.020669-0.095463 0.040927-0.19722 0.074414-0.33228 0.085532-0.34496 0.21712-0.79798 0.40411-1.2439 0.18699-0.44587 0.43179-0.88264 0.72657-1.1932 0.20848-0.21964 0.49569-0.36189 0.69143-0.44855s0.2002-0.23485 0.2005-0.38034c-4.03e-5 -0.11059-0.056609-0.27257-0.26543-0.34857s-0.44248-0.18269-0.68335-0.43226c-0.30107-0.31195-0.54463-0.75104-0.72657-1.201-0.3208-0.79329-0.39589-1.4206-0.42168-1.5999 0.075922-0.015407 0.13522-0.030272 0.25011-0.044958 0.36459-0.046603 0.89066-0.080098 1.449-0.080098z"
          color="#000000"
          fillRule="evenodd"
          strokeLinecap="round"
          strokeLinejoin="bevel"
        />
        <path d="m5.8984 4.2282s0.31996 1.4487 1.588 1.449 1.5726-1.449 1.5726-1.449h-1.5729z" />
        <path d="m5.5242 9.6728c0.22021 0.087324 1.4405 0.18197 1.9616 0.16123 0.52088 0.020826 1.7419-0.073878 1.9622-0.16123 0 0-0.14516-1.6272-1.9617-1.6272s-1.962 1.6272-1.962 1.6272z" />
      </g>
    </svg>
  );
};
