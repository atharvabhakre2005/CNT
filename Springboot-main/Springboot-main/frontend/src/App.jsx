import React, { useState } from 'react'
import Certificate from './components/Certificate.jsx'

const initial = {
  studentName: '',
  rollNo: '',
  mse1: 0, mse2: 0, mse3: 0, mse4: 0,
  ese1: 0, ese2: 0, ese3: 0, ese4: 0
}

export default function App() {
  const [data, setData] = useState(initial)
  const [saved, setSaved] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: isNaN(value) ? value : Number(value) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('http://localhost:8080/api/results/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    const json = await res.json()
    setSaved(json)
  }

  return (
    <div className="container py-4">
      <h2 className="mb-3">VIT Semester Result — Entry</h2>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">Student Name</label>
          <input className="form-control" name="studentName" value={data.studentName} onChange={handleChange} required/>
        </div>
        <div className="col-md-6">
          <label className="form-label">Roll No</label>
          <input className="form-control" name="rollNo" value={data.rollNo} onChange={handleChange} required/>
        </div>

        {[1,2,3,4].map(i => (
          <div key={i} className="col-md-6">
            <label className="form-label">Subject {i} — MSE (0–30)</label>
            <input type="number" min="0" max="30" className="form-control" name={`mse${i}`} value={data[`mse${i}`]} onChange={handleChange}/>
          </div>
        ))}
        {[1,2,3,4].map(i => (
          <div key={'e'+i} className="col-md-6">
            <label className="form-label">Subject {i} — ESE (0–70)</label>
            <input type="number" min="0" max="70" className="form-control" name={`ese${i}`} value={data[`ese${i}`]} onChange={handleChange}/>
          </div>
        ))}

        <div className="col-12">
          <button className="btn btn-primary">Save & Generate</button>
        </div>
      </form>

      {saved && (
        <div className="mt-4">
          <Certificate data={saved} />
        </div>
      )}
    </div>
  )
}
