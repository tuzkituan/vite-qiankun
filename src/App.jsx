import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import React from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'

function App({ mainLocalStorage }) {
  const {isOpen, onOpen, onClose}
   = useDisclosure();
  const [count, setCount] = useState(0)

  const getMe = async ({ queryKey }) => {
    const [_, userId] = queryKey;

    if (mainLocalStorage) {
      const data = {
        tenantId: mainLocalStorage.tenant_id,
        company: mainLocalStorage.company_id,
      }
      const token = mainLocalStorage.token
      let res;
      try {
        res = await axios.post("https://stghrms.paxanimi.ai/api/usermap/get-current-user", {
          data: data,
        }, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${JSON.parse(token)}`
          }
        });
      } catch (e) {
        console.log("🚀  ~ sub app 1 - error:", e) 
      }
      return res?.data;
    }
    return null;
  }
  
  const { data, error, isError, isLoading } = useQuery(['user'], getMe)
  console.log("🚀  ~ sub app 1 - current user:", data)

  useEffect(() => {
    if (mainLocalStorage) {
      localStorage.setItem('token', mainLocalStorage.token)
    }
  }, [JSON.stringify(mainLocalStorage)])
  

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button colorScheme="cyan" onClick={onOpen}>
          Open Modal
        </Button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <h2>
        {isLoading ? "Loading current user..." : null}
        {isError ? `Have an errors: ${error.message}` : null}
        {data ? `Current user: ${data?.data?.email}` : null}
      </h2>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Test
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default App
