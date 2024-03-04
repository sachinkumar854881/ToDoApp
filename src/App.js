import React from 'react'
import {useState, useRef} from 'react'

function App() {

  const data = localStorage.getItem('lists') ? JSON.parse(localStorage.getItem('lists')) : [];

  const [list, setList] = useState(data);// yaha array mein  hum by default value bhi de sakte hai 
  const newtask= useRef("")
  const [search,setSearch] = useState('');
  console.log("re-render")

  function submitData()
  {
    localStorage.setItem('lists',JSON.stringify([...list, newtask.current.value]))
    setList([...list, newtask.current.value])
    newtask.current.value=""

  }
  // how update a add task in a list
  function updateTask(e,i)
  {
    const uptask = [...list]
    uptask.splice(i, 1, e.target.value)
    setList(uptask)
    localStorage.setItem('lists',JSON.stringify(uptask))
  }
  // how delete a task in list
  function deleteTask(i)
  {
    const deltask = [...list]
    deltask.splice(i, 1)
    setList(deltask)
    localStorage.setItem('lists',JSON.stringify(deltask))
  }
  

  return(
    <div className='app'>
      
      <div className="search">
        <input type="text" placeholder="Search task🔎" onChange={(e)=>{setSearch(e.target.value)}}/>
      </div>

      <h1 className='heading'>TO-DO App ⚡</h1>
      
      <div className='inputs'>
        <input type="text" ref={newtask} />
        <button className='btn' onClick={submitData}>Add Task✔</button>  
      </div>
   
      <div className="container"> 
        {

          list.map((val,i) => {
            if(val.toLowerCase().includes(search.toLowerCase())){
              return(
                <div className="list">
                  <input type="text" value={val} onChange={updateTask}/>
                  <span className="icon" onClick={deleteTask}>❌</span>
                </div>
              )
            }
          })
          
        }
      </div>
    </div>
  );
}

export default App;
