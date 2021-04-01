import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/usersReduser'
import { Link } from "react-router-dom"

const Users = ({ users }) => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  console.log(users);

  return (
    <>
      <ul>
        {
          users.map((user) =>
            <li key={user.id}>
              <Link to={`/users/${user.id}`}>{user.name}, Number of blogs created:  {user.blogs.length}</Link>
            </li>
          )
        }
      </ul>
    </>
  )
}

export default Users