import React, { useRef, useState, useMemo } from 'react';
import JoditEditor from 'jodit-react';

import { uploadPostAssets } from '../API/Post';
import toast from 'react-hot-toast';
import setLoader from '../helpers/setLoader';



const Editor = ({ handleEditor, defaultVal }) => {
	const editor = useRef(null);
	const [content, setContent] = useState(defaultVal);
	const config = {
		readonly: false,
		uploader: {
			url: 'https://xdsoft.net/jodit/connector/index.php?action=fileUpload',
			queryBuild: function (data) {
				return JSON.stringify(data);
			},
			contentType: function () {
				return 'application/json';
			},
			buildData: function (data) {
				return { hello: 'Hello world' }
			}
		},
		extraButtons: [
			{
				iconURL: 'https://www.svgrepo.com/show/358478/circle-layer.svg',
				name: 'insertDate',
				tooltip: 'Upload&Insert Image',
				exec: (editor) => {
					// create upload 
					const input = document.createElement('input');
					input.setAttribute('type', 'file');
					input.setAttribute('accept', 'image/*');
					input.click();
					// listener
					input.onchange = async function () {
						const imageFile = input.files[0];
						if (!imageFile) {
							toast.error("File upload failed")
							throw new Error("Upload a file")
						}

						if (!imageFile.name.match(/\.(jpg|jpeg|png|svg)$/)) {
							toast.error("Upload FAILED!! file Not an image")
							// throw new Error("Upload FAILED!! file Not an image")
							input.remove()
							return
						}
						try {
							const url = await uploadPostAssets(imageFile, imageFile.name, imageFile.name)
							const image = editor.selection.j.createInside.element('img');
							image.setAttribute('src', url);
							editor.selection.insertNode(image);
							setLoader(false)
							toast.success("File added successfully")
						} catch (error) {
							console.log(error)
							setLoader(false)
							toast.error("Upload failed")
						}

					}

				}
			}
		]


	};

	return useMemo(
		() => (
			<div className='upload-modal'>
				<JoditEditor
					ref={editor}
					value={content}
					config={config}
					onChange={(content) => {
						setContent(content);
						handleEditor(content);
					}}
				/>
			</div>
		),
		[]
	);
};

export default Editor;

