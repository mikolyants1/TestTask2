import { css } from "@emotion/react";
import { SerializedStyles } from "@emotion/react/macro"
import styled from '@emotion/styled'
interface props{
    theme:string,
    font?:string
}
export const head:SerializedStyles=css({
 width:'100%',
 height:30,
 display:'flex',
 justifyContent:'end',
 alignItems:'center'
})
export const title:SerializedStyles=css({
 width:'98%',
 display:'flex',
 justifyContent:'space-between',
 margin:'20px auto',
 alignItems:'center'
})
export const audio:SerializedStyles=css({
  width:50,
  height:50,
  borderRadius:'50%',
  overflow:'hidden'
})
export const img:SerializedStyles=css({
    width:'100%',
    height:'100%'
})
export const synonym:SerializedStyles=css({
    width:'100%',
    display:'grid',
    gridTemplateColumns:'repeat(auto-fill,minmax(80px,1fr))'
})
export const Wrapper=styled.div<props>`
    width:60%;
    margin:20px auto;
    border-radius:20px;
    padding:5px;
    background-color:${({theme}:props)=>theme};
    color:${({theme}:props)=>theme=='black'
    ?'white':'black'};
    font-family:${({font}:props)=>font};
    box-shadow:0 2px 2px 0 black;
    min-width:300px;
     @media(max-width:700px){
        width:90%
     }
  `
  export const load:SerializedStyles=css({
    width:'100%',
    textAlign:'center'
  })
export const Search=styled.div<props>`
    width:98%;
    margin:20px auto;
    border-radius:10px;
    background-color:${({theme}:props)=>theme=='black'
     ? 'rgb(60,60,60)' : 'rgb(240,240,240)'};
     overflow:hidden;
     display:flex;
     & input{
        color:${({theme}:props)=>theme=='black'?'white':'black'};
        background-color:${({theme}:props)=>theme=='black'?
       'rgb(60,60,60)':'rgb(240,240,240)'};
       width:91%;
       height:30px;
       border:none;
       font-size:18px;
       padding:5px;
       };
     & button{
       color:${({theme}:props)=>theme=='black'?'white':'black'};
       background-color:transparent;
       border:none;
       font-size:18px;
        width:100px
       }
    `