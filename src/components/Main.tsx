import {useQuery,QueryFunction,QueryKey} from '@tanstack/react-query'
import axios,{AxiosResponse} from 'axios'
import {useState,ChangeEvent,useRef} from 'react'
import  useStore, { func1, store }  from './store'
import { css } from "@emotion/react";
import Header from './Header';
import img1 from '../assets/play1.png'
import {title,audio,synonym,Wrapper,Search,load} from './style';
interface phone{
 text:string,
 audio:string
}
interface def{
 definition:string
}
interface data{
 partOfSpeech:string,
 definitions:def[],
 synonyms:string[]
}
interface date{
 word:string,
 phonetic:string,
 phonetics:phone[],
 meanings:data[],
 sourceUrls:string[]
}
interface datas{
 data:any,
 isError:boolean,
 isLoading:boolean,
 error:any,
}
interface query{
 queryFn:QueryFunction,
 keepPreviousData:boolean,
 refetchOnWindowFocus:boolean,
 staleTime:number
}
async function Find(name:string):Promise<date[]> {
 return await axios
 .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${name}`)
 .then(({data}:AxiosResponse<date[]>):date[]=>data)
}
export default function Main():JSX.Element{
const {name,font,theme}:store=useStore()
const [newName,setNewName]=useState<string>('')
const ref=useRef<HTMLAudioElement>(null!)
const setData:func1=useStore((store:store)=>store.setData)
const {data,isError,isLoading,error}:datas=useQuery<QueryKey,query>({queryKey:['Diction',name],
queryFn:()=>Find(name),keepPreviousData:true,refetchOnWindowFocus:false,staleTime:3*1000})
const change=(e:ChangeEvent<HTMLInputElement>):void=>{
 setNewName(e.target.value)
}
const addWord=():void=>{
  setData(newName)
}
const play=():void=>{
 ref.current.play()
}
if (isLoading) return <div css={load}>....</div>
if (isError) return <div css={load}>{error.message}</div>
const sound:phone|undefined=data[0].phonetics
 .find(({audio}:phone)=>audio)
    return (
        <Wrapper theme={theme} font={font}>
          <Header />
          <Search theme={theme}>
            <input placeholder={name}
             type="text" onChange={change}
              />
            <button onClick={addWord}>
               Find
            </button>
          </Search>
           <div css={title}>
             <div>
               <div css={css`font-size:38px`}>
                  {data[0].word}
               </div>
               <div css={css`color:blueviolet;font-size:18px`}>
                 {data[0].phonetic}
               </div>
             </div>
             <div css={audio} onClick={play}>
               <img css={css`width:100%;height:100%`}
                 src={img1}  alt="" />
               <audio src={typeof sound=='undefined'
                ? '' : sound.audio} ref={ref} />
             </div>
           </div>
           <div css={css`width:98%;margin:auto`}>
            {data[0].meanings.map((item:data,i:number):JSX.Element=>(
               <Mean key={i} data={item} />
            ))}
           </div>
           <div css={css`width:98%;margin:20px auto;color:grey`}>
              source {" "}
             <span css={css`color:blueviolet`}>
                {data[0].sourceUrls[0]}
             </span>
           </div>
        </Wrapper>
    )
}

interface props{
 key:number,
 data:data
}

function Mean({data}:props):JSX.Element{
  const {partOfSpeech,definitions,synonyms}:data=data
    return (
        <div css={css`width:98%;margin:20px auto`}>
           <div css={css`font-size:20px`}>
              {partOfSpeech}
           </div>
           <div css={css`color:grey`}>
            meaning
          </div>
          <div>
            <ul>
              {definitions.map(({definition}:def):JSX.Element=>(
                <li key={definition}>
                 {definition}
                </li>
              ))}
            </ul>
          </div>
          <div css={css`color:grey`}>
            synonyms {"  "}
          </div>
          <div css={synonym}>
           {synonyms.map((item:string):JSX.Element=>(
               <span key={item} css={css`color:blueviolet`}>
                {item}
               </span>
             ))}
          </div>
        </div>
    )
}
