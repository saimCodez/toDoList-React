import { useEffect, useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("")

  useEffect(()=>{
    document.title=`Count: ${count}`
  },[name])

  const addCount = () => {
    setCount((c) => c + 1);
  };
  return (
    <div className="block items-center text-center justify-center">
      <p className="text-7xl mb-5">count {count}</p>
      <button onClick={()=> setName("Saim")} className="bg-black text-white py-2 px-8">Change Name</button>
      <button onClick={addCount} className="text-white mb-10 bg-blue-700 px-12 py-4 rounded-lg cursor-pointer">Add</button>
    </div>
  );
};
