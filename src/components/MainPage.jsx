//The main jsx file for the website
import React, { useState } from "react"; //importing the tools required to manage file requests

//defining file upload and file remove
const MainPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [classificationResult, setClassificationResult] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    //clear the output result for the previous image once a new image is uploaded
    setClassificationResult("");
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setClassificationResult(""); // Clear the classification result
    // Clear the file input field
    document.querySelector('input[type="file"]').value = '';
  };
  

  //incase a user tries to classify without uploading an image
  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Please select an image to classify!");
      return;
    }

    //api uses POST method for form-data key-value pair
    const formData = new FormData();
    formData.append("image", selectedFile);

    //Sending a request to the API and also handling any errors
    try {
      console.log("Sending request to API...");
      const response = await fetch("https://api.imageaibysaamer.com/classify-image", { //API URL with the endpoint
        method: "POST",
        body: formData,
      });
      console.log("Response received:", response);

      if (response.ok) {
        const data = await response.json(); // parses the JSON response to get the result
        setClassificationResult(`Classified as: ${data.class}`); //Display output for the result
      } 

    } catch (error) {
      setClassificationResult("Error in classification.");
    } 
      
  };



  //Styling part
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">

      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        Image Classifying AI Application
        <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
          {" "}
          by Saamer Masood
        </span>
      </h1>
      <p className="mt-10 mb-0 text-lg text-center text-neutral-500 max-w-10xl">
        This program is an image classifying neural network that uses TensorFlow and PyTorch. The training model is based on ResNet18 and the datasets and classes
        are generated from CIFAR-10 within the PyTorch library. The CIFAR-10 dataset consists of 60000 32x32 colour images in 10 classes, with 6000 images per class. 
        <strong> Classes include airplane, automobile, bird, cat, deer, dog, frog, horse, ship, and truck. </strong>
        <br />
        <br />
        <strong>Note:</strong> This is a relatively simple dataset and as such it would have a hard time classifying complex images 
        and would probably return the wrong class. I plan to implement CIFAR-100 which would offer 100 classes instead 
        of 10. In the meanwhile, you can email me at <span className="underline">masoodofficial27@gmail</span> or connect with me on 
        {" "}
        <a href="https://www.linkedin.com/in/saamer-masood-022333175/" target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-50">LinkedIn</a> 
        {" "}
        regarding any feedback or extra information you would like to know about the program. You can find the code repository on my&nbsp;
        <a href="https://github.com/MasoodSaamer" target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-50">GitHub</a>. API information is below.
      </p>
     
      {/* Image Classification button handle Part */}
        <div className="flex flex-col items-center mt-10">
          <div className="bg-neutral-800 p-6 rounded-lg shadow-lg">
            <p className="mb-5">Max image size is 10 MB. PNG and JPG recommended</p>
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

        {/* API Implementation part */}
      <div className="w-full bg-neutral-900 text-white mt-10 p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">API Implementation:</h2>
        <p>The following is a demonstration of how the API could be implemented in a web application</p>
        <br />
        <pre className="bg-black p-4 rounded-lg overflow-auto">
          <code>
          {`// Prepare form data for the API request, including the selected image file.
const formData = new FormData();
formData.append("image", selectedFile);

// Sending a request to the API and also handling any errors
try {
  console.log("Sending request to API...");
  const response = await fetch("https://api.imageaibysaamer.com/classify-image", { //API URL with the endpoint
    method: "POST", // The API expects a POST request with form-data key-value pairs.
    body: formData,
  });
  console.log("Response received:", response);

  if (response.ok) {
    const data = await response.json(); // parses the JSON response to get the result
    setClassificationResult(\`Classified as: \${data.class}\`); //Display output for the result
  } 

} catch (error) {
  setClassificationResult("Error in classification.");
}`}
          </code>
        </pre>
      </div>

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
