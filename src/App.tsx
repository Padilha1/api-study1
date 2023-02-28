import axios from "axios";
import { useEffect, useState } from "react";
import "./styles/global.css";

type photoProp = {
	id: number;
	title: string;
	thumbnailUrl: string;
};

function App() {
	const [photos, setPhotos] = useState([]);
	const api = "https://jsonplaceholder.typicode.com/photos";

	useEffect(() => {
		const getPhotos = async () => {
			const { data: res } = await axios.get(api);
			setPhotos(res);
		};

		getPhotos();
	}, []);

	const addPhoto = async () => {
		const photo = {
			title: "new post",
			thumbnailUrl: "https://via.placeholder.com/150/771796",
		};
		await axios.post(api, photo);
		setPhotos([photo, ...photos]);
	};
	const handleUpdate = async (photo:photoProp) => {
		photo.title = "Updated Title";
		await axios.put(api + "/" + photo.id);
		const photoClone = [...photos];
		const index = photoClone.indexOf(photo);
		photoClone[index] = { ...photo };
		setPhotos(photoClone);
	};

	const handleDelete = async (photo:photoProp) => {
		await axios.delete(api + "/" + photo.id + photo);
		setPhotos(photos.filter((p) => p.id !== photo.id));
	};

	return (
		<div className="flex flex-col justify-center items-center">
			<h1 className="text-3xl mt-5">Api test</h1>
			<h2 className="text-3xl pt-2 pb-5">
				There are {photos.length} photos in database
			</h2>

			<button
				onClick={addPhoto}
				className=" bg-gray-900 rounded-lg p-5 hover:bg-gray-600"
			>
				Add Photo
			</button>

			<table>
				<thead>
					<tr className="">
						<th>Title</th>
						<th className="pr-5">Photo</th>
						<th className="pr-5 ">Update</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{photos.map((photo: photoProp) => (
						<tr key={photo.id}>
							<td> {photo.title} </td>
							<img src={photo.thumbnailUrl} className="mr-5" />
							<td>
								<button
									onClick={() => handleUpdate(photo)}
									className="border border-green-500 bg-green-900 rounded-lg p-5 mr-5 hover:bg-green-600"
								>
									Update
								</button>
							</td>
							<td>
								<button
									onClick={() => handleDelete(photo)}
									className="border border-red-400 bg-red-500 rounded-lg p-5 hover:bg-red-900"
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default App;
