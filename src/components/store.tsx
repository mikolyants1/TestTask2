import { create } from "zustand";
import { devtools,persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
export type func1=(action:string)=>void
export type func2=(action:string)=>void
export interface store{
    name:string,
    font:string,
    theme:string,
    setData:func1,
    setTheme:func2,
    setFont:func2
}
interface action{
  [i:string]:string
}
const Font:action={
 serif:'Arial,sans-serif',
 Roman:'Times, Times New Roman',
 system:'system-ui',
 monospace : 'monospace'
}
const useStore=create<store>()(persist(devtools(immer((set)=>({
name:'keyboard',
font:'',
theme:'white',
setData:(action)=>set((state:store)=>{
 state.name=action
}),
setTheme:(action)=>set((state:store)=>{
  state.theme=action
}),
setFont:(action)=>set((state:store)=>{
 state.font=Font[action]
}),
}))),{version:1,name:'dictonary'}))
export default useStore