import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import './Capture.css';

const Capture = () => {
  const webcamRef = useRef(null);
  const [serverOutput, setServerOutput] = useState('');
  const [error, setError] = useState(''); 
  const [submitted, setSubmitted] = useState(false); 

  const captureAndSendImage = async () => {
    const imageSrc = webcamRef.current.getScreenshot();

   
    const base64Image = imageSrc.split(',')[1];
    const blob = await fetch(`data:image/jpeg;base64,${base64Image}`).then(res => res.blob());

    

   
    const formData = new FormData();
    formData.append('image', blob);

    console.log("Sending img:", blob);

    try {
      const response = await axios.post('http://127.0.0.1:5050/upload', formData, {
        
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setServerOutput(response.data.prediction);
      setError('');
      setSubmitted(true); 
    } catch (error) {
      setError(error.message); // Update state with error message
      setServerOutput('');
    }
  };

  const resetState = () => {
    setServerOutput('');
    setError('');
    setSubmitted(false); // Reset submitted state
  };

  return (
    <section className='photo-section'>
      <div className="photo-container">
      
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="webcam"
        />

        <p>Hello ! Kindly take picture with clear face and wait for the prediction. </p> 

        {!submitted && <button className='photo-submit' onClick={captureAndSendImage}>Capture and Submit</button>}
        {serverOutput === '1' && <div className='photo-output'>Prediction: Yes</div>}
        {serverOutput === '0' && <div className='photo-output'>Prediction: No</div>}
        {error && <div className="error-message">Error: {error}</div>}
        {(serverOutput || error) && <button className="photo-reset" onClick={resetState}>Reset</button>}
      </div>
    </section>
  );
};

export default Capture;


