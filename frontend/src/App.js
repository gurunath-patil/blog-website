import './App.css'
import Header from './components/Header'
import { Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom'
import Blogs from '../src/pages/Blogs'
import Login from './pages/Login'
import Register from './pages/Register'
import UserBlogs from './pages/userBlogs'
import CreateBlogs from './pages/CreateBlogs'
import BlogDetails from './pages/BlogDetails'
import Single_Post from './pages/Single_Post'
import { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from './Store'
import { baseUrl } from './URL'
import { CircularProgress } from '@mui/material'

const PrivateRoute = ({ authActions }) => {
	return authActions ? (
		<>
			<Header />
			<Outlet />
		</>
	) : (
		<Navigate replace to='/login' />
	)
}

function App() {
	const dispatch = useDispatch()
	const cookies = document.cookie
	useEffect(() => {
		if (cookies != '') {
			fetch(`${baseUrl}/api/v1/user/varifytoken`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${cookies}`,
				},
			}).then((res) => {
				if (res.status == 200) {
					dispatch(authActions.login())
					setIsAuth(true)
				}
			})
		}
	}, [])

	let isLogin = useSelector((state) => state.isLogin)
	const [isAuth, setIsAuth] = useState(isLogin)

	if (isAuth) {
		return <HandleRouting isAuth={isAuth} setIsAuth={setIsAuth} />
	} else if (!cookies) {
		return <HandleRouting isAuth={isAuth} setIsAuth={setIsAuth} />
	} else {
		return (
			<div className='w-screen h-screen flex justify-center items-center'>
				<CircularProgress />
			</div>
		)
	}
}

function HandleRouting({ isAuth, setIsAuth }) {
	return (
		<div className='main h-screen'>
			<Toaster />
			<Routes>
				<Route path='/login' element={<Login isUserAuthenticated={setIsAuth} />} />
				<Route path='/register' element={<Register />} />

				<Route path='/' element={<PrivateRoute authActions={isAuth} />}>
					<Route path='/' element={<Blogs />} />
				</Route>

				<Route path='/blogs' element={<PrivateRoute authActions={isAuth} />}>
					<Route path='/blogs' element={<Blogs />} />
				</Route>
				<Route path='/my-blogs' element={<PrivateRoute authActions={isAuth} />}>
					<Route path='/my-blogs' element={<UserBlogs />} />
				</Route>

				<Route path='/get-blog/:id' element={<PrivateRoute authActions={isAuth} />}>
					<Route path='/get-blog/:id' element={<Single_Post />} />
				</Route>

				<Route path='/blog-details/:id' element={<PrivateRoute authActions={isAuth} />}>
					<Route path='/blog-details/:id' element={<BlogDetails />} />
				</Route>

				<Route path='/create-blogs' element={<PrivateRoute authActions={isAuth} />}>
					<Route path='/create-blogs' element={<CreateBlogs />} />
				</Route>
			</Routes>
		</div>
	)
}
export default App
