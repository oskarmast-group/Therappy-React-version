import Base from 'alert/dialog/components/Base';
import Button from 'components/Button';
import React, { useRef, useState } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight
        ),
        mediaWidth,
        mediaHeight
    );
}

function getNewImage(image, completedCrop) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const pixelRatio = window.devicePixelRatio;
    const ctx = canvas.getContext('2d');
    const crop = completedCrop;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY
    );
    return new Promise((resolve, reject) => {
        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    console.error('Canvas is empty');
                    return;
                }
                blob.name = 'newProfile.jpeg';
                const fileURL = window.URL.createObjectURL(blob);
                resolve(fileURL);
            },
            'image/jpeg',
            1
        );
    });
}

const ImageCropDialog = ({ open, onSubmit, onClose, src }) => {
    const [crop, setCrop] = useState();
    const [completedCrop, setCompletedCrop] = useState();
    const [loading, setLoading] = useState(false);
    const imgRef = useRef(null);

    const onCropChange = (_, percentCrop) => {
        setCrop(percentCrop);
    };

    function onImageLoad(e) {
        const { width, height } = e.currentTarget;
        setCrop(centerAspectCrop(width, height, 1));
    }

    const onComplete = (c) => {
        setCompletedCrop(c);
    };

    const confirmCrop = async () => {
        setLoading(true);
        const img = await getNewImage(imgRef.current, completedCrop);
        onSubmit(img);
    };

    return (
        <Base open={open} onClose={onClose} isResponsive={false}>
            <ReactCrop crop={crop} aspect={1} onComplete={onComplete} onChange={onCropChange}>
                <img ref={imgRef} alt="Crop me" src={src} onLoad={onImageLoad} />
            </ReactCrop>
            <Button type="button" disabled={loading} onClick={confirmCrop} style={{ marginTop: '20px' }}>
                Confirmar
            </Button>
        </Base>
    );
};

export default ImageCropDialog;
