import { useCallback, useEffect, useState,useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numAllow,setNumAllow]=useState(false)
  const [charAllow,setCharAllow]=useState(false)
  const [Password,setPassword]=useState();
   
  const passwordref=useRef();

  const passwordgen= useCallback(()=>{
     let pass="";
     let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
     if (numAllow) str+="1234567890";
     if (charAllow) str+="!@#$%^&*()";

     for (let i = 1; i < length; i++) {
        let char=Math.floor(Math.random()*str.length +1);
        pass+=str.charAt(char);
      
      }
      setPassword(pass)
      

  },[length,numAllow,charAllow,setPassword]) 

  const copypasstoclip = useCallback(() => {
    passwordref.current?.select();
    passwordref.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(Password)
  }, [Password])

  useEffect(()=>{
    passwordgen();
  },[length,numAllow,charAllow,setPassword])

 
  return (
    <>
    {/* <div className='flex'> */}

    <div className='flex'>
        <img className='absolute bg-cover h-full w-full' src="../pass.png" alt="" />
     </div>
     <div className='flex w-full h-screen justify-center items-center'>
      <div className="relative w-full max-w-max mx-auto shadow-md rounded-3xl px-4 py-8 my-6 bg-black opacity-80 text-orange-700">
      <h1 className='text-white text-center my-5 text-5xl py-3'>Password Generator</h1>
     
    <div className="flex shadow rounded-lg overflow-hidden mb-4 flex-col">

      <input
      className='rounded-lg w-full my-3' 
      type="text" 
      placeholder='password'
      value={Password}
      readOnly
      ref={passwordref}
      />
      

      <button className='shadow-md my-6 rounded-lg px-4 ml-10 max-w-xs bg-pink-500 text-white' onClick={copypasstoclip}>copy</button>

    </div>

    <div className='flex flex-col gap-3 items-center'>
      <section className='flex flex-col gap-3 items-center'>
     <input 
     type="range" 
     onChange={(e)=>{ setLength(e.target.value)}}
     value={length}/>
     <label>Length : {length}</label></section>

     <section className='flex gap-3 items-center'><input type="checkbox" 
     defaultChecked={numAllow}
      onChange={()=>{
        setNumAllow((prev)=>!prev);
      }}/>Numbers</section>
     

     <section className='flex gap-3 items-center'><input type="checkbox"
     defaultChecked={charAllow}
     onChange={()=>{
      setCharAllow((prev)=>!prev);
      }}
     />Charactors</section>
</div>
    </div>
    </div>

    {/* </div> */}

    </>
  )
}

export default App
