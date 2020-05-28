import { createGlobalStyle } from 'styled-components';

const globalStyles = createGlobalStyle`

a{
    text-decoration:none;
    color:black;
    text-align:center;
    align-items:center;
    justify-content:center;

    
}
*{
    box-sizing:border-box;
    font-family: 'Jua', sans-serif;
    
input{
    align-items:center;
    justify-content:center;
    margin:auto;
}  

form{
    align-items:center;
    justify-content:center;
    margin:auto;
}   
    
}
button{
    border-radius: 8px;
    align-items:center;
    justify-content:center;
}

body{
    overflow:hidden;
    padding-top:70px;
    /* font-family: 'Jua', sans-serif; */
    /* background-color:rgba(20,20,20,1); */
    background-color:rgb(211, 211, 211);
    height:100vh;

}
.on{
    display: inline-flex;
  width: 22%;
  font-size: 13px;
  color: #000;
  height: 55px;
  border: solid 1px black;
  line-height: 19px;
  /* border-right: 1px solid black; */
  /* border-bottom: 1px solid black; */
  text-align: center;
  /* background: #fff; */
  align-items: center;
  margin: auto;
  margin-right: 1px;
  font-size: 20px;
  margin-bottom: 1px;
  cursor: pointer;
  background-color:rgb(8, 119, 204);
}

.off{
    display: inline-flex;
  width: 22%;
  font-size: 13px;
  color: #000;
  height: 55px;
  border: solid 1px black;
  line-height: 19px;
  /* border-right: 1px solid black; */
  /* border-bottom: 1px solid black; */
  text-align: center;
  /* background: #fff; */
  align-items: center;
  margin: auto;
  margin-right: 1px;
  font-size: 20px;
  margin-bottom: 1px;
  cursor: pointer;
  background-color:white;
}

`;

export default globalStyles;
