//import React, {  } from "react"
import { useState,useCallback, useEffect, useRef } from "react"
//import './App.css'
function App() {
  const [length, setLength] = useState(10)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState(" ")

  //useref
  const passwordRef=useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_-+={}[]"
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, charAllowed, numberAllowed, setPassword])

  const copyPassword=useCallback(()=>{
    passwordRef.current?.select();
    //if(copyPassword!=false){
      
    //}
    passwordRef.current?.setSelectionRange(0,99 );
      window.navigator.clipboard.writeText(password)
  },[password]);
  // function copyPassword(){
  //   let copy= document.getElementById("cpy")
  //   copy.innerText="Copyed";
  // }

 

useEffect(()=>{
  passwordGenerator()
},[length, charAllowed, numberAllowed, setPassword,passwordGenerator])
 // passwordGenerator()
  return (
    <>
      <div className="w-full max-w-md px-5 mx-auto my-8 mt-64 text-2xl font-bold text-orange-500 bg-red-500 shadow-md rounded-xl">
        <h1 className="text-center text-black ">Password Generator</h1>
        <div className="flex max-w-md mb-4 overflow-hidden rounded-lg shadow ">
          <input type="text" name="" id="" value={password} className="w-full px-3 py-1 text-black outline-none" ref={passwordRef} placeholder="password" />
          <button onClick={copyPassword}  className="px-3 text-white bg-blue-500 outline-none disabled:selection: hover:bg-blue-900 py-05 shrink-0" id="cpy">Copy</button>
        </div>
        <div className="justify-center text-sm gap-x-2">
          <div className="flex justify-between w-full text-black gap-x-1">
            <input style={{ background: 'blue' }} type="range" min={6} max={100} value={length} className="text-red-400 border-black cursor-pointer boder-2" onChange={(e) => { setLength(e.target.value) }} />
           <label htmlFor="" className="">Length:{length}</label>
          </div>
          
          <div className="flex items-center justify-between text-2xl text-white gap-x-1">  
          <input type="checkbox" className="w-8 h-5" name="" defaultChecked={numberAllowed} id="numberInput" onClick={()=>{
            setNumberAllowed((prev)=>!prev)
          }} />
          <label htmlFor="numberInput " for="numberInput" className="text-xl " id="checkbox">Number</label>
          </div>
          <div className="flex items-center justify-between text-2xl text-white gap-x-1">  
          <input type="checkbox" className="w-8 h-5" name="" defaultChecked={charAllowed} id="characterInput" onClick={()=>{
            setCharAllowed((prev)=>!prev)
          }} />
          <label htmlFor="characterInput " for="characterInput"  className="text-xl " id=" ">Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
