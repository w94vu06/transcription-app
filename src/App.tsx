import React, { useState } from 'react';
import Navbar from './components/navbar'; // 確保正確導入 Navbar

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      console.log("Selected file:", event.target.files[0].name);
      setFileUrl(""); // 如果選擇了檔案，清空網址輸入框
    }
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileUrl(event.target.value);
    setSelectedFile(null); // 如果輸入了網址，清空檔案選擇
  };

  const handleUpload = () => {
    if (selectedFile) {
      // 處理檔案上傳邏輯
      console.log("Uploading file:", selectedFile.name);
      alert(`File "${selectedFile.name}" uploaded successfully!`);
    } else if (fileUrl) {
      // 處理網址上傳邏輯
      console.log("Uploading file from URL:", fileUrl);
      alert(`File from URL "${fileUrl}" uploaded successfully!`);
    } else {
      alert("Please select a file or enter a URL before uploading.");
    }
  };

  return (
    <>
      {/* 導航列 */}
      <Navbar />

      {/* 主內容區域 */}
      <div className="container mx-auto mt-10 p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">檔案與網址上傳</h1>

        {/* 檔案選擇和上傳功能 */}
        <div className="flex flex-col items-center gap-4">
          <input
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
          <button
            onClick={handleUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            上傳
          </button>
          {selectedFile && (
            <p className="text-gray-600">Selected File: {selectedFile.name}</p>
          )}
          {fileUrl && (
            <p className="text-gray-600">Entered URL: {fileUrl}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
