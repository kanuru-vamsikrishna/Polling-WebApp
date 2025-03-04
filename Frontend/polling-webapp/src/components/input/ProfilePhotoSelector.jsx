import React, { useRef, useState } from 'react'

const ProfilePhotoSelector = ({ image, setImage }) => {

  const inputRef = useRef()
  const [previewUrl, setPreviewUrl] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Update the image state
      setImage(file)

      // Generate preview URL from the file
      const preview = URL.createObjectURL(file)
      setPreviewUrl(preview);
    }
  } 

  const handleRemoveImage = () => {
    setImage(null)
    setPreviewUrl(null);
  }

  const onChooseFile = () => {
    inputRef.current.click();
  }

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
      />
      {!image ? (
       <div className="w-20 h-20 flex items-center justify-center bg-sky-100 rounded-full relative">
       <i className="bi bi-person text-4xl text-blue-400"></i>
       <button type="button" className="w-8 h-8 items-center justify-center bg-blue-600 text-white rounded-full absolute -bottom-1 -right-1" onClick={onChooseFile}>
       <i className="bi bi-upload"></i>
         </button>
       </div>
      ): (
        <div className="relative">
        <img
          src={previewUrl}
          alt="Profile Photo"
          className="w-20 h-20 rounded-full object-cover"
        />
        <button type="button" className="w-8 h-8 items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1" onClick={handleRemoveImage}>
        <i className="bi bi-trash"></i>
        </button>
      </div>
      )}
    </div>
  )
}

export default ProfilePhotoSelector