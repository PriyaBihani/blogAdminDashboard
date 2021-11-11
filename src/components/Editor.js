import React, { useRef, useState, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import { Jodit } from 'jodit';

import { uploadPostAssets } from '../API/Post';
import toast from 'react-hot-toast';
import setLoader from '../helpers/setLoader';
import hljs from 'highlight.js';
import Prism from 'prismjs';




const Editor = ({ handleEditor, defaultVal, setUploads }) => {
	const editor = useRef(null);
	const [content, setContent] = useState(defaultVal);
	const config = {
		readonly: false,
		useSplitMode: true,
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
		cleanWhitespace: false,
		editorCssClass: "temp",

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

						if (!imageFile.name.match(/\.(jpg|jpeg|png|PNG|svg)$/)) {
							toast.error("Upload FAILED!! file Not an image")
							// throw new Error("Upload FAILED!! file Not an image")
							input.remove()
							return
						}
						try {
							const { url, path } = await uploadPostAssets(imageFile, imageFile.name, imageFile.name)
							const image = editor.selection.j.createInside.element('img');
							image.setAttribute('src', url);
							editor.selection.insertNode(image);
							setLoader(false)
							toast.success("File added successfully")
							setUploads((current) => [...current, path])
						} catch (error) {
							console.log(error)
							setLoader(false)
							toast.error("Upload failed")
						}

					}

				}
			},
			{
				iconURL: 'https://www.svgrepo.com/show/361440/container.svg',
				name: 'insertQuote',
				tooltip: 'Upload&Insert Image',
				exec: (editor) => {
					editor.selection.insertHTML(`<div id='custom-blockquote' ></div>`)
				}
			},
			// {
			// 	iconURL: 'https://www.svgrepo.com/show/174811/left-quotes.svg',
			// 	name: 'insertQuote',
			// 	tooltip: 'Upload&Insert Image',
			// 	exec: (editor) => {
			// 		editor.selection.applyStyle(null, { className: "blockquote" })
			// 		editor.selection.cursorOnTheRight('div')
			// 	}
			// }
			{
				iconURL: 'https://www.svgrepo.com/show/105965/marker.svg',
				name: 'insertQuote',
				tooltip: 'Upload&Insert Image',
				exec: (editor) => {
					editor.selection.applyStyle(null, { className: "highlight" })
				}
			},
			{
				iconURL: 'https://www.svgrepo.com/show/7026/calendar.svg',
				name: 'InsertDate',
				tooltip: 'Insert date header',
				exec: (editor) => {
					const date = new Date().toDateString().split(' ')
					const html = `<p><span class="category-eyebrow__date" style="display: block; line-height: 1.28577; font-weight: 600; letter-spacing: -0.016em; font-family: &quot;SF Pro Text&quot;, &quot;SF Pro Icons&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; color: rgb(67, 67, 67); margin-top: 4px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px;  text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: 14px;">${date[1]} ${date[2]}, ${date[3]}</span></p>`
					editor.selection.insertHTML(html)
				}
			},
			{
				icon: 'https://www.svgrepo.com/show/245847/code.svg',
				name: 'code',
				exec: function (editor) {
					var dialog = new Jodit.modules.Dialog();

					const handler = (e) => {
						e.preventDefault()
						const code = e.target[0].value
						const html = Prism.highlight(code, Prism.languages.javascript, 'javascript').trim();
						editor.selection.insertHTML(
							`<pre> 
					<code className='language-javascript'>
					${html}
					</code>
					</pre>`
						)
						dialog.close()
					}

					// // dialog.open();
					var dialog = new Jodit.modules.Dialog();
					var $form = dialog.create.fromHTML('<form><textarea rows="12" style="width:100%;height:100%" ></textarea><button type="submit" >Add</button> </form>');
					$form.addEventListener('submit', handler)

					dialog.setContent($form);
					dialog.open();
					dialog.setSize(600, 400);

				}
			},

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

