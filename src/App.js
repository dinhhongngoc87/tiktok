import {useState} from 'react'
const courses = [
  {
    id: 1,
    name : 'Javascript'
  },
  {
    id: 2,
    name : 'HTML,CSS'
  },
  {
    id: 3,
    name : 'React JS'
  }
]
function App(){
  const [checked,setChecked] = useState([])
  console.log(checked)
  const handleCheck= (id) => {
    setChecked(prev =>{
      const isChecked = checked.includes(id)
      if(isChecked){
        
      }else{
        return [...prev,id]
      }
    })
  }
  const handleSubmit = () =>{
  console.log({id: checked})

  }
  
  return (
    <div style={{padding: 32}}>
      {courses.map(course => (
        <div key= {course.id}>
          <input type="checkbox"
          checked = {checked.includes(course.id)}
          onChange={()=>handleCheck(course.id)}
          />
          {course.name}
        </div>
      ))}
      <button onClick={handleSubmit}>Register</button>
    </div>
  )
}

export default App;
