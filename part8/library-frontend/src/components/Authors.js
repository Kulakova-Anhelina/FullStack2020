
import React from 'react'
import EditForm from "./EditForm"


const Authors = ({ authors, show }) => {

  if (!show) {
    return null
  }
  console.log(authors, "authors");
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data?.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      < EditForm authors={authors} />
    </div>
  )
}

export default Authors
