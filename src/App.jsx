import React, { useContext, useState } from 'react'
import Login from './components/Auth/Login.jsx'
import AdminDashboard from './components/Dashboard/AdminDashboard.jsx'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard.jsx'
import { AuthContext } from './context/AuthProvider.jsx'

const App = () => {
  const [userData] = useContext(AuthContext)
  const [user, setUser] = useState(null)
  const [loggedInUserData, setLoggedInUserData] = useState(null)

  const handleLogin = (email, password) => {
    if (email === 'admin@me.com' && password === '123') {
      setUser('admin')
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }))
      return
    }

    if (userData && userData.length > 0) {
      const employee = userData.find(
        (e) => e.email === email && e.password === password
      )

      if (employee) {
        setUser('employee')
        setLoggedInUserData(employee)
        localStorage.setItem(
          'loggedInUser',
          JSON.stringify({ role: 'employee', data: employee })
        )
        return
      }
    }

    alert('Invalid Credentials')
  }

  if (user === 'admin') return <AdminDashboard />
  if (user === 'employee') return <EmployeeDashboard data={loggedInUserData} />

  return <Login handleLogin={handleLogin} />
}

export default App
