import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, TextField, Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { authActions } from '../Store'
import toast from 'react-hot-toast'
import { baseUrl } from '../URL'
import logo from '../photos/logo.png'
import blogLogo from '../photos/blogging.png'

const Login = ({ isUserAuthenticated }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [inputs, setInputs] = useState({
		email: '',
		password: '',
	})

	function handleChange(e) {
		setInputs((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}

	async function handleSubmit(event) {
		event.preventDefault()
		const response = await fetch(`${baseUrl}/api/v1/user/login`, {
			method: 'POST',
			body: JSON.stringify({
				email: inputs.email,
				password: inputs.password,
			}),
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
		})
		if (response.status === 201) {
			const data = await response.json()
			localStorage.setItem('userId', data?.user._id)
			dispatch(authActions.login())
			toast.success('Login successful')
			isUserAuthenticated(true)
			navigate('/')
		} else {
			toast.success('Login failed')
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit} className='flex items-center justify-center h-screen'>
				<div className='flex flex-col items-center p-28 gap-3'>
					<Box
						maxWidth={450}
						display={'flex'}
						flexDirection={'column'}
						alignItems={'center'}
						justifyContent={'center'}
						margin={'auto'}
						marginTop={5}
						boxShadow={'10px 10px 20px #ccc'}
						padding={10}
						borderRadius={5}
						border={1}>
						<img className='w-full mb-8' src={blogLogo} />
						<div className='field-group'>
							<span className='icon'>
								<i className='uil uil-at'></i>
							</span>
							<input
								className='input-field'
								type='email'
								placeholder='Email'
								value={inputs.email}
								onChange={handleChange}
								name='email'
								required
								// style={{ margin: 'normal' }}
							/>
						</div>
						<div className='field-group'>
							<span className='icon'>
								<i className='uil uil-key-skeleton-alt'></i>
							</span>
							<input
								className='input-field'
								type='password'
								placeholder='Password'
								value={inputs.password}
								onChange={handleChange}
								name='password'
								required
								// style={{ margin: 'normal' }}
							/>
						</div>

						{/* <TextField placeholder='Email' value={inputs.email} onChange={handleChange} name='email' margin='normal' type='email' required /> */}
						{/* <TextField placeholder='Password' value={inputs.password} onChange={handleChange} name='password' margin='normal' type='password' required /> */}

						<Button
							type='submit'
							variant='contained'
							className='border border-red-700'
							style={{
								background: '#2C3E50',
								marginTop: '20px',
								width: '70%',
								borderRadius: '25px',
								padding: '3%',
								fontWeight: 'bold',
								letterSpacing: '1px',
								textTransform: 'capitalize',
							}}>
							Login
						</Button>
						<button
							onClick={() => navigate('/register')}
							style={{ background: 'none', color: '#000', marginTop: '10%' }}>
							Don't Have An Account?{' '}
							<span style={{ textDecoration: 'Underline', fontWeight: '700' }}> Create One</span>{' '}
						</button>
					</Box>
				</div>
			</form>
		</>
	)
}

export default Login
