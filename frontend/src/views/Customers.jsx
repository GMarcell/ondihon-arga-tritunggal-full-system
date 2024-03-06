import React from 'react'
import LangController from '../LangController'
import CustomersComponent from '../components/CustomersComponent'

function Customers() {
  return (
    <>
      <LangController>
        <CustomersComponent/>
      </LangController>
    </>
  )
}

export default Customers