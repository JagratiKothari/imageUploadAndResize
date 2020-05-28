import React from 'react';
import { useState } from 'react';

function ImageUploader() {
    let [error, setError] = useState(false);
    let [imgSrc, setImgSrc] = useState('');

    function onImageChange(e) {
        let img = new Image()
        img.src = window.URL.createObjectURL(e.target.files[0]);
        img.onload = () => {
            if(img.width !== 1024 && img.height !== 1024) {
                setError(true);
                setImgSrc('');
            } else {
                setError(false);
                setImgSrc(img.src);
                cropImages();
            }
        }
    }

    function cropImages(){
        // get source image
        var orgImg = document.getElementById('orgImg');

        // draw image to canvas and get image data
        var canvas = document.createElement("canvas");
        canvas.width = orgImg.width;
        canvas.height = orgImg.height;
        var resizeDimensions = [
            {
                width: 755,
                height: 450
            },
            {
                width: 365,
                height: 450
            },
            {
                width: 365,
                height: 212
            },
            {
                width: 380,
                height: 380
            }
        ];
        resizeDimensions.forEach((size) => {
            var ctx = canvas.getContext("2d");
            ctx.drawImage(orgImg, 0, 0);
            var imageData = ctx.getImageData(0, 0, size.width, size.height);

            // create destiantion canvas
            var canvas1 = document.createElement("canvas");
            canvas1.width = size.width;
            canvas1.height = size.height;
            var ctx1 = canvas1.getContext("2d");
            ctx1.rect(0, 0, size.width, size.height);
            ctx1.fillStyle = 'white';
            ctx1.fill();
            ctx1.putImageData(imageData, 0, 0);

            // put data to the img element
            var resizedImages = document.getElementById('resizedImages');
            var dstImg = document.createElement("img");
            dstImg.src = canvas1.toDataURL("image/png");
            dstImg.style = "display: flex; margin-top: 10px;"
            resizedImages.appendChild(dstImg);
        })
    }

    return (
        <div>
            <input type="file" accept="image/*" onChange={onImageChange}/>
            {error && <div>Please upload the file of correct size!!</div>}
            {imgSrc && <div><img src={imgSrc} id="orgImg" alt="uploaded pic"/></div> }
            <div className = "centerAlign" id="resizedImages"></div>
        </div>

    );
}

export default ImageUploader;
