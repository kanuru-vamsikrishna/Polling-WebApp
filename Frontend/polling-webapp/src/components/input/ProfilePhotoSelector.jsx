import React, { useRef, useState } from 'react'

const ProfilePhotoSelector = ({ image, setImage }) => {

  const inputRef = useRef()
  const [previewUrl, setPreviewUrl] = useState("");

  const handleImageChange = () => {

  }

  const handleRemoveImage = () => {

  }

  const onChooseFile = () => {

  }

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        // className="hidden"
      />
      <div className="w-20 h-20 flex items-center justify-center bg-sky-100 rounded-full relative">
      <i className="bi bi-person text-4xl text-blue-400"></i>
      <button type="button" className="w-8 h-8 items-center justify-center bg-blue-600 text-white rounded-full absolute -bottom-1 -right-1" onClick={onChooseFile}>
      <i className="bi bi-upload"></i>
      </button>
      </div>
    </div>
  )
}

export default ProfilePhotoSelector