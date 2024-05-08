import { useState } from 'react';
import useNavigate from '@hooks/useNavigate'
import md5 from 'js-md5'

import Input from '@components/Input'
import Button from '@components/Button'

import './Login.css'

const Login = () => {
  const [user, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { navigate } = useNavigate()

  const [errorMessage, setErrorMessage] = useState('')

  const setValue = (name, value) => {
    switch(name) {
      case 'username':
        setUsername(value)
        break
      case 'password':
        setPassword(value)
        break
    }
  }

  const handleLogin = async () => {
    const hashedPassword = md5(password)
    try {
      const response = await fetch('http://ec2-34-226-197-0.compute-1.amazonaws.com:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: user, password: hashedPassword })
      });

      if (response.ok) {
        console.log('Success!');
        navigate('/admin');
      } else {
        console.error('Login failed:', response.status, response.statusText);
        setErrorMessage('Incorrect user or password');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to connect to the server');
    }
  }
  
  return (
    <aside className="login">
      <h1 className="title">Welcome!</h1>
      {
        errorMessage !== '' && (
          <div className='error-message' onClick={() => setErrorMessage('')}>
            {errorMessage}
          </div>
        )
      }
      <Input label="Username" type="text" value={user} onChange={(value) => setValue('username', value)} />
      <Input label="Password" type="password" value={password} onChange={(value) => setValue('password', value)}/>
      <Button text="Login" onClick={handleLogin} />
    </aside>
  )
}

export default Login
