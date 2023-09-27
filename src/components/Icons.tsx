import React from 'react'

export const Loading: React.FunctionComponent<{
    className?:string
  }> = ({
    className,
  }): React.ReactElement => {

    return <svg width="15mm" height="15mm" className={`svg ${className || ""}`} version="1.1" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
    <g transform="matrix(1.9109 0 0 1.9109 -6.8317 -5.4994)" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="bevel" stroke-width=".26458">
     <path d="m7.4848 3.6695a3.1331 3.1331 0 0 0-3.1171 3.0903 3.1331 3.1331 0 0 0 3.0313 3.1745 3.1331 3.1331 0 0 0 3.2303-2.9719l0.0031-0.23358a3.1331 3.1331 0 0 0-3.1476-3.0592zm0.00362 0.75293a2.3804 2.3804 0 0 1 2.3916 2.3239l-0.00258 0.17777a2.3804 2.3804 0 0 1-2.4541 2.2577 2.3804 2.3804 0 0 1-2.3032-2.4117 2.3804 2.3804 0 0 1 2.3683-2.3477z" fill="#666" stop-color="#000000"/>
     <path d="m9.8774 6.9241a2.3804 2.3804 0 0 1-0.60823 1.4697l0.56069 0.50436a3.1331 3.1331 0 0 0 0.79943-1.9358z" fill="#e6e6e6" stop-color="#000000"/>
    </g>
   </svg>
}

export const Arrow: React.FunctionComponent<{
    className?:string
  }> = ({
    className,
  }): React.ReactElement => {

    return <svg width="210mm" height="297mm" version="1.1" className={`svg ${className || ""}`}  viewBox="0 0 210 297" xmlns="http://www.w3.org/2000/svg">
    <path d="m51.233 30.123c-2.7944 0-5.5886 1.0705-7.7298 3.2117-4.2824 4.2824-4.2824 11.178 1e-6 15.46l99.706 99.706-99.706 99.705c-4.2824 4.2824-4.2824 11.178 0 15.46 4.2824 4.2824 11.178 4.2824 15.46 0l106.19-106.19c0.47196-0.34093 0.92429-0.72223 1.3498-1.1477 2.167-2.1671 3.2353-5.003 3.2091-7.831 0.026-2.8278-1.0422-5.6636-3.2091-7.8305-0.4255-0.4255-0.87783-0.80679-1.3498-1.1477l-106.19-106.19c-2.1412-2.1412-4.9359-3.2117-7.7303-3.2117z" fill="#666" fill-rule="evenodd" stop-color="#000000" stroke-linecap="round" stroke-linejoin="bevel" stroke-width=".30491"/>
   </svg>
   
}

