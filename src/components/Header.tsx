import useStore, { store } from "./store"
import {ChangeEvent,useContext} from 'react'
import {css} from '@emotion/react'
import { SerializedStyles } from "@emotion/react/macro"
import { head } from "./style"
import { Theme, context } from "../App"
export default function Header():JSX.Element{
const items:string[]=['serif','Roman','system','monospace']
const {theme,setFont}:store=useStore()
const {move}:context=useContext(Theme)
const change=(e:ChangeEvent<HTMLSelectElement>):void=>{
    setFont(e.target.value)
}
const Toogle:SerializedStyles=css({
position:'relative',
width:60,
height:30,
borderRadius:20,
backgroundColor:`${theme=='black'?'blueviolet':'grey'}`,
})
const But:SerializedStyles=css({
 position:'absolute',
 backgroundColor:'white',
 borderRadius:'50%',
 marginTop:2,
 width:25,
 height:25,
 marginLeft:`${theme=='black'?32:3}px`
 })
 const Select:SerializedStyles=css({
 backgroundColor:theme,
 color:`${theme=='black'?'white':'black'}`,
 border:'none',
 textAlign:'center',
 fontSize:15
 })
 const block:SerializedStyles=css({
 width:110,
 marginRight:10,
 borderRight:`2px solid ${theme=='black'?'white':'black'}`
 })
    return (
        <div css={head}>
          <div css={css`width:190px;height:100%;display:flex`}>
            <div css={block}>
              <select onChange={change} css={Select}>
                {items.map((item:string):JSX.Element=>(
                 <option key={item} value={item}>
                    {item}
                 </option>
                ))}
              </select>
            </div>
            <div css={Toogle} onClick={move}>
               <div css={But} />
            </div>
          </div>
        </div>
    )
}