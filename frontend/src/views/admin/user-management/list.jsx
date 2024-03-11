import React, { useEffect, useState } from 'react'
import axiosClient from '../../../axios-client'

function UserManagementList() {
  const [isLoading, setisLoading] = useState([])

  const getUsers = () => {
    setisLoading(true)
    axiosClient.get('/users').then(({data}) => {
      setisLoading(false)
      console.log(data)
    }).catch(() => {
      setisLoading(false)
    })
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div>UserManagementList</div>
  )
}

export default UserManagementList