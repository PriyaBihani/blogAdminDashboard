import React, { useRef, useState, useMemo } from 'react'
import JoditEditor from 'jodit-react'

const Editor = ({ handleEditor }) => {
    const editor = useRef(null)
    const [content, setContent] = useState('')
    const config = {}

    return useMemo(() => (
        <JoditEditor ref={editor} value={content} config={config} onChange={content => {
            setContent(content)
            handleEditor(content)
        }} />
    ), [])
}

export default Editor