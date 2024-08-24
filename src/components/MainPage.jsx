import React, { useState } from "react"; //importing the tools required to manage file requests


const MainPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [classificationResult, setClassificationResult] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setClassificationResult(""); // Clear the classification result
    // Clear the file input field
    document.querySelector('input[type="file"]').value = '';
  };

  //0-9 corresponding the the respective classes in CIFAR-10
  const classNames = [
    "Airplane", "Automobile", "Bird", "Cat", "Deer", 
    "Dog", "Frog", "Horse", "Ship", "Truck"
  ];
  


  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Please select an image to classify!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      console.log("Sending request to API...");
      const response = await fetch("https://imageaibysaamer.com/classify-image", { //API URL
        method: "POST",
        body: formData,
      });
      console.log("Response received:", response);

      if (response.ok) {
        const data = await response.json(); // parses the JSON response to get the result
        const className = classNames[data.class]; // map number to class name
        setClassificationResult(`Classified as: ${className}`);
      } else {
        setClassificationResult("Error in classification.");
      }

    } catch (error) {
      setClassificationResult("Error in classification.");
    } 
    
  };



  //Styling part
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">

      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        Image Classifying Application
        <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
          {" "}
          by Saamer Masood
        </span>
      </h1>
      <p className="mt-10 mb-10 text-lg text-center text-neutral-500 max-w-4xl">
        This program is an image classifying neural network that uses transfer learning. The training model is based on ResNet18 and the datasets and classes
        are generated from CIFAR-10 within the PyTorch library. 
        <br />
        You can email me at masoodofficial27@gmail or connect with me in LinkedIn regarding any feedback or extra information you would like to know about the program.
      </p>
     
      {/* Image Classification Part */}
        <div className="flex flex-col items-center mt-10">
          <div className="bg-neutral-800 p-6 rounded-lg shadow-lg">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-400
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-lg file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100
                        mb-4"
            />
            {selectedFile && (
              <button
                onClick={handleRemoveFile}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg mb-4"
              >
                Remove Image
              </button>
            )}
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Classify this image
            </button>
          </div>
        </div>

        {/* Display the classification result */}
        {classificationResult && (
          <div className="mt-6 text-center text-white">
            <p>{classificationResult}</p>
          </div>
        )}

      
    
      {/* Footer */}
      <footer className="w-full  text-white mt-10 border-t py-10 border-neutral-700">
        <div className="max-w-7xl mx-auto px-4">
            <div>
                <h3 className="text-md font-semibold mb-4 ">
                    Resources
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a href="https://www.linkedin.com/in/saamer-masood-022333175/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/MasoodSaamer" target="_blank" rel="noopener noreferrer" className="hover:underline">
                      GitHub
                    </a>
                  </li>
                </ul>
            </div>
        </div>
      </footer>

    </div>
  );
};

export default MainPage;
