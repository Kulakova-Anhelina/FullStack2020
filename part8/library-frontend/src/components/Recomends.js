

import React from 'react'



const Recommendations = ({ recomBooks, show, setPage }) => {

  if (!show) {
    return null
  }
  console.log(recomBooks, "recoms");
  return (
    <div>
      <h2> Recommendations
      </h2>
      <table>
        <tbody>
          <tr>
            <th>
              title
            </th>
            <th>
              published
            </th>
            <th>
              author
            </th>
          </tr>
          {recomBooks.data?.findRecoms.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.published}</td>
              <td>{a.author.name}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
