import React, { useState } from 'react'
import { Box, AppBar, Toolbar, Button, Tabs, Tab, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from '../Store'
import toast from 'react-hot-toast'
import photo from '../photos/companylogo.png'
import { baseUrl } from '../URL'

const Header = ({ username }) => {
	const navigate = useNavigate()

	let isLogin = useSelector((state) => state.isLogin)

	isLogin = isLogin || localStorage.getItem('userId')
	const dispatch = useDispatch()
	const [value, setValue] = useState()

	function logout() {
		dispatch(authActions.logout())
		document.cookie = `token=;expires=${new Date(0)}`
		toast.success("Logout Succefully!")
		navigate('/login')
	}

	return (
		<>
			<nav className='navbar mb-0' style={{ backgroundColor: '#3A6D8C' }}>
				<img className='logo-photo w-24 h-14' src={photo} alt='company logo' />
				<h3 className='blog-app-heading text-yellow-200 font-bold text-lg'> Blog Website</h3>
				{isLogin && (
					<div className='button-container'>
						<Tabs
							style={{ width: 'inherit' }}
							textColor='inherit'
							value={value}
							onChange={(e, val) => setValue(val)}>
							<Link
								to='/blogs'
								style={{ color: '#000', display: 'flex', justifyContent: 'around' }}>
								<button className='blog-buttons px-4 bg-cyan-900 hover:bg-black'>All Blogs</button>
							</Link>
							<Link
								to='/my-blogs'
								className='blog-buttons'
								style={{ color: '#000', display: 'flex', justifyContent: 'around' }}>
								<button className='blog-buttons px-4 bg-cyan-900 hover:bg-black'>My Blogs</button>
							</Link>
							<Link
								to='/create-blogs'
								style={{ color: '#000', display: 'flex', justifyContent: 'around' }}>
								<button className='blog-buttons px-4 bg-cyan-900 hover:bg-black'>
									Create Blogs
								</button>
							</Link>
						</Tabs>
					</div>
				)}

				<Box display={'flex'} marginLeft='auto'>
					{!isLogin && (
						<>
							<Link to='/login' style={{ margin: 1, color: '#000' }}>
								<button className='bg-black login-logout'>Login</button>
							</Link>
							<Link
								to='/register'
								style={{ marginLeft: '20px', marginRight: '10px', color: '#000' }}>
								<button className='bg-black login-logout'>Register</button>
							</Link>
						</>
					)}
					{isLogin && (
						<>
							<h2 style={{ color: '#000' }}>{username}</h2>
							<button
								className='bg-black hover:bg-red-700 login-logout fw-bold'
								onClick={logout}
								sx={{ color: 'black' }}>
								Logout
							</button>
						</>
					)}
				</Box>
			</nav>
		</>
	)
}

export default Header
