import React from 'react'
import './certificate.css'

function total(mse, ese) {
  return (mse * 0.3) + (ese * 0.7)
}

export default function Certificate({ data }) {
  const handlePrint = () => window.print()
  const totals = [1,2,3,4].map(i => total(data[`mse${i}`], data[`ese${i}`]))
  const totalMarks = totals.reduce((a,b)=>a+b, 0)
  const cgpa = (totalMarks / 400) * 10

  return (
    <div className="certificate-container mt-4 p-4 shadow bg-white">
      <div className="certificate-border p-3">
        <h3 className="text-center text-primary">Vishwakarma Institute of Technology, Pune</h3>
        <h5 className="text-center">Semester Result Certificate</h5>
        <hr/>
        <p><strong>Student Name:</strong> {data.studentName}</p>
        <p><strong>Roll No:</strong> {data.rollNo}</p>
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Subject</th>
              <th>MSE (30%)</th>
              <th>ESE (70%)</th>
              <th>Total (100%)</th>
            </tr>
          </thead>
          <tbody>
            {[1,2,3,4].map(i => (
              <tr key={i}>
                <td>Subject {i}</td>
                <td>{data[`mse${i}`]}</td>
                <td>{data[`ese${i}`]}</td>
                <td>{totals[i-1].toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="d-flex justify-content-between">
          <div><strong>Total Marks:</strong> {totalMarks.toFixed(2)} / 400</div>
          <div><strong>CGPA:</strong> {cgpa.toFixed(2)} / 10</div>
        </div>

        <div className="text-end mt-3">
          <button className="btn btn-outline-primary" onClick={handlePrint}>Print</button>
        </div>
      </div>
    </div>
  )
}
