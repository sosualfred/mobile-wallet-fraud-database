import React from 'react'
import TextInput from './TextInput'

const AdminRecoverPassword = () => {
  return (
    <div className="flex justify-center items-center h-screen ">
       <form>
        <p className="text-center text-2xl font-bold mb-8">
          <span className="text-blue-500 mr-2">
            {" "}
            Mobile Wallet Fraud Database
          </span>{" "}
          Admin
        </p>

        <div className="border-2">
          <div className="p-4 mx-4">
            <h1 className="my-2 font-bold">Recover Passsword</h1>
            <TextInput label="Email address" type="text" name="Email address" />

            <button
              variant="solid"
              type="submit"
              className="mt-1 py-2 px-8 w-96 bg-blue-600 text-white rounded-md "
            >
              Send recovery email
            </button>
            <p className='mt-2'>Back to <a href="#"className='text-blue-400'>login</a></p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AdminRecoverPassword