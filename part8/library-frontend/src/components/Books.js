import React, { useEffect } from 'react'

const Books = ({
  show, books, setPage
}) => {
  const [filteredData, setFilteredData] = React.useState(null)
  const [data, setData] = React.useState([])
  const [open, setOpen] = React.useState(false)







  
  useEffect(() => {
    if (books?.data?.allBooksview) {
      setFilteredData(books?.data?.allBooksview.map(element => element.genres.map(b => {
        if (!data.includes(b)) {
          setData(data.concat(b))
        }
        return b
      }
      )
      ))

    }
  }, [books, data])

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      {
        !open && (
          books?.data?.allBooksview.map(book => {
            return (
              <Book
                title={book.title}
                published={book.published}
                author={book.author.name}
              />
            )
          }
          )
        )
      }

      {data.map(e => {

        return (
          <>
            <button onClick={() => setOpen(!open)} >{e}</button>
            {
              open && (
                books?.data?.allBooksview.map(b => b.genres.includes(e) ?
                  <>
                    <Book
                      title={b.title}
                      published={b.published}
                      author={b.author.name}
                    />
                  </>
                  : <div></div>)
              )
            }

          </>
        )

      })}
    </div>
  )
}

export default Books



const Book = ({ title, name, published, author }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>
          </th>
          <th>
          </th>
          <th>
          </th>
        </tr>
        <td>{title}</td>
        <td>{name}</td>
        <td>{published}</td>
        <td>{author}</td>

      </tbody>
    </table>
  )
}