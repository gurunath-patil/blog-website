import { Box } from '@mui/material'
import React, { useState } from 'react'
import Editor from './Editor'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { baseUrl } from '../URL'

const CreateBlogs = () => {
	const navigate = useNavigate()
	const id = localStorage.getItem('userId')
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [file, setFiles] = useState('')

	const data = new FormData()

	async function handleSubmit(e) {
		e.preventDefault()
		data.set('user', id)
		data.set('title', title)
		data.set('description', description)
		data.append('blogImage', file)

		const response = await fetch(`${baseUrl}/api/v1/blogs/create-blog`, {
			method: 'POST',
			body: data,
		})
		if (response.status === 200) {
			toast.success('Blog Created')
			navigate('/my-blogs')
			// window.location.reload();
			console.log(await response.json())
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div
					className='create-box'
					style={{
						width: '80%',
						height: 'auto',
						border: 3,
						borderRadius: 10,
						padding: '2rem',
						margin: 'auto',
						boxShadow: '10px 10px 20px #ccc',
						display: 'flex',
						gap: '10px',
						flexDirection: 'column',
						marginTop: '30px',
					}}>
					<h1 className='text-xl text-slate-700 font-bold font-mono'>Create A New Post</h1>

					<input
						type='title'
						name='title'
						placeholder={'Title'}
						value={title}
						onChange={(ev) => setTitle(ev.target.value)}
						required
					/>

					<input
						type='file'
						name='blogImage'
						onChange={(ev) => setFiles(ev.target.files[0])}
						required
					/>
					<Editor value={description} onChange={setDescription} />
					<div className='flex justify-center'>
						<button type='submit' className='bg-black text-base w-3/12 rounded-md hover:bg-lime-700'>
							Create post
						</button>
					</div>
				</div>
			</form>
		</>
	)
}

export default CreateBlogs
