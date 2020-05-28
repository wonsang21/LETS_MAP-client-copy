import { createGlobalStyle } from 'styled-components';

const globalStyles = createGlobalStyle`

a{
    text-decoration:none;
    color:black;
}
*{
    box-sizing:border-box;
    font-family: 'Jua', sans-serif;
    
}
body{
    font-family: 'Jua', sans-serif;
    /* background-color:rgba(20,20,20,1); */
}
`;

export default globalStyles;
