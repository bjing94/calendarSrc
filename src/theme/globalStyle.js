import { createGlobalStyle } from "styled-components";
export const MyGlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: sans-serif;

--primary-color:  red;
	--secondary-color:  #f6f6f6;
  --secondary-dark-color: #c0c0c0;
  --event-color: #ebecff;
    --event-selected-color:#a8adff;
  }
  * {
	box-sizing: border-box;
  
  }


`;
