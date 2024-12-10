import React, { useState } from 'react';
import Navbar from './components/navbar';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // 新增圖片預覽 URL
  const [fileInputKey, setFileInputKey] = useState<number>(0); // 用於重置檔案輸入

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setFileUrl(""); // 清空網址

      // 如果檔案是圖片類型，設定預覽 URL
      if (file.type.startsWith("image/")) {
        const imagePreviewUrl = URL.createObjectURL(file);
        setPreviewUrl(imagePreviewUrl);
      } else {
        setPreviewUrl(null); // 如果不是圖片類型，清除預覽
      }
    }
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileUrl(event.target.value);
    setSelectedFile(null); // 清空檔案
    setPreviewUrl(null); // 清除圖片預覽
  };

  const handleUpload = async () => {
    const formData = new FormData();

    if (selectedFile) {
      formData.append("file", selectedFile);
      setSelectedFile(null);
      setPreviewUrl(null); // 清空圖片預覽
    } else if (fileUrl) {
      formData.append("url", fileUrl);
      setFileUrl("");
    } else {
      alert("上傳前請選擇檔案或輸入 URL。");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setResponseMessage(`上傳成功: ${result.message}`);
        setFileInputKey((prevKey) => prevKey + 1);
        setFileUrl("");
        setSelectedFile(null);
      } else {
        setResponseMessage(`上傳失敗: ${result.message}`);
      }
    } catch (error) {
      setResponseMessage("上傳時發生錯誤。");
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setFileUrl("");
    setPreviewUrl(null); // 清空圖片預覽
    setResponseMessage(null);

    setFileInputKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10 p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">檔案與網址上傳</h1>
        <div className="flex flex-col items-center gap-4">
          <input
            key={fileInputKey}
            type="file"
            onChange={handleFileChange}
            className="block w-full max-w-xs p-2 border rounded-md shadow-sm"
          />
          <input
            type="text"
            value={fileUrl}
            onChange={handleUrlChange}
            placeholder="請輸入檔案網址"
            className="block w-full max-w-xs p-2 border rounded-md shadow-sm"
          />
          <div className="flex gap-4">
            <button
              onClick={handleUpload}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              上傳
            </button>
            <button
              onClick={handleClear}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
            >
              清除
            </button>
          </div>
          {selectedFile && previewUrl && (
            <div className="flex flex-col items-center">
              <p className="text-gray-600">選定的文件:</p>
              <img
                src={previewUrl}
                alt="Preview"
                className="w-auto h-48 object-cover border rounded-md mt-2"
              />
            </div>
          )}
          {fileUrl && <p className="text-gray-600">輸入的網址: {fileUrl}</p>}
          {responseMessage && <p className="text-center text-gray-700 mt-4">{responseMessage}</p>}
        </div>
      </div>
    </>
  );
};

export default App;
