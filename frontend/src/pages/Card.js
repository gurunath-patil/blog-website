import React from "react"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import { Link, useNavigate } from "react-router-dom"
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded"
import toast from "react-hot-toast"
import { baseUrl } from "../URL"

const BlogCard = ({ title, username, image, time, id, userId }) => {
	const navigate = useNavigate()
	const handleEdit = () => {
		navigate(`/blog-details/${id}`)
	}

	const handleDelete = async () => {
		try {
			const userNameid = localStorage.getItem("userId")
			const response = await fetch(`${baseUrl}/api/v1/blogs/delete-blog/${id}/${userNameid}`, {
				method: "DELETE",
			})
			if (response.status === 200) {
				toast.success("Blog deleted")
				window.location.reload()
				navigate("/my-blogs")
			} else {
				console.log(response.statusText)
			}
		} catch (err) {
			console.log(err)
		}
	}
	return (
		<div className="entry container drop-shadow-2xl">
			<div className="post">
				<Link to={`/get-blog/${id}`}>
					<img src={image} alt="" className="rounded-lg"/>
				</Link>
			</div>
			<div className="text font-mono">
				<Link to={`/get-blog/${id}`}>
					<h2 style={{ color: "#000" }}> {title}</h2>
				</Link>
			</div>

			<div className="info">
				<h4 className="text-sm"> {username}</h4>
				<div className="time" style={{ position: "absolute", top: "15px" }}>
					<time>{time}</time>
				</div>
			</div>

			{/* <p dangerouslySetInnerHTML={{__html:description}}/> */}
			{userId && (
				<div className="box flex justify-between w-1/12">
					<EditNoteRoundedIcon onClick={handleEdit} />
					<DeleteOutlineIcon onClick={handleDelete} />
				</div>
			)}
		</div>
		// {/* </Link> */}
	)
}
export default BlogCard
