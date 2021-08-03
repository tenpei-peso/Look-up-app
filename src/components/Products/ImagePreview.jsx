import React from 'react'

function ImagePreview({path, deleteImage, id}) {
    return (
        <div className="p-media__thumb" onClick={() => deleteImage(id)}>
            <img src={path} alt="プレビュー画像" />
        </div>
    )
}

export default ImagePreview
