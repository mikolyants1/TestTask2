import {createContext } from 'react'
import './App.css'
import useStore,{ func1, store} from './components/store'
import Main from './components/Main'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
export interface context{
  color:string,
  move:()=>void
}
export const Theme=createContext<context>({color:'',move:()=>{}})
const query:QueryClient=new QueryClient()
function App():JSX.Element {
const theme:string=useStore((state:store)=>state.theme)
const setTheme:func1=useStore(({setTheme}:store)=>setTheme)
const change=():void=>{
  setTheme(theme=='white'?'black':'white')
}
  return (
    <QueryClientProvider client={query}>
      <Theme.Provider value={{color:theme,move:change}}>
        <Main />
      </Theme.Provider>
    </QueryClientProvider>
  )
}

export default App
