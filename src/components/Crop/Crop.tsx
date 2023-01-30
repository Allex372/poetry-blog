// import { Cancel } from '@mui/icons-material';
// import CropIcon from '@mui/icons-material/Crop';
import { Box, Button, DialogActions, DialogContent, Slider, Typography } from '@mui/material';
import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
// import { useAuth } from '../../context/AuthContext';
import getCroppedImg from './utils/cropImage';

export interface PixelCropInterface {
  x: number;
  y: number;
  width: number;
  height: number;
}
// eslint-disable-next-line
export const CropEasy = ({ photoURL, setOpenCrop, setPhotoURL, setFile }: any) => {
  //   const { setAlert, setLoading } = useAuth();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<PixelCropInterface>();

  const cropComplete = (croppedAreaPixels: PixelCropInterface) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async () => {
    // setLoading(true);
    try {
      if (croppedAreaPixels) {
        // eslint-disable-next-line
        const { file, url }: any = await getCroppedImg(photoURL, croppedAreaPixels, rotation);
        setPhotoURL(url);
        setFile(file);
        setOpenCrop(false);
      }
    } catch (error) {
      //   setAlert({
      //     isAlert: true,
      //     severity: 'error',
      //     message: error.message,
      //     timeout: 5000,
      //     location: 'modal',
      //   });
      // eslint-disable-next-line
      console.log(error);
    }

    // setLoading(false);
  };
  return (
    <>
      <DialogContent
        dividers
        sx={{
          background: '#333',
          position: 'relative',
          height: 400,
          width: 'auto',
          minWidth: { sm: 500 },
        }}
      >
        <Cropper
          image={photoURL}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={1}
          cropShape="round"
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropChange={setCrop}
          onCropComplete={cropComplete}
        />
      </DialogContent>
      <DialogActions sx={{ flexDirection: 'column', mx: 3, my: 2 }}>
        <Box sx={{ width: '100%', mb: 1 }}>
          <Box>
            <Typography>Zoom: {zoomPercent(zoom)}</Typography>
            <Slider
              valueLabelDisplay="auto"
              valueLabelFormat={zoomPercent}
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e, zoom) => setZoom(zoom as number)}
            />
          </Box>
          <Box>
            <Typography>Rotation: {rotation + '°'}</Typography>
            <Slider
              valueLabelDisplay="auto"
              min={0}
              max={360}
              value={rotation}
              onChange={(e, rotation) => setRotation(rotation as number)}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Button variant="outlined" onClick={() => setOpenCrop(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={cropImage}>
            Crop
          </Button>
        </Box>
      </DialogActions>
    </>
  );
};

// export default CropEasy;

const zoomPercent = (value: number) => {
  return `${Math.round(value * 100)}%`;
};
