import { Icon } from 'antd';
import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

const getBase64 = (image, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(image);
};

function MyDropzone(props) {
  const [img, setImg] = useState(0);
  const [loading, setLoading] = useState(0);
  const {
    avatarUrl, t, onChange, rectangle, style,
  } = props;

  const uploadButton = (
    <div style={{
      borderStyle: 'solid',
      borderWidth: 1,
      width: 100,
      height: 100,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      borderRadius: rectangle ? 0 : 50,
      ...style,
    }}
    >
      <Icon type={loading ? 'loading' : 'plus'} />
      <div style={{ fontSize: 10 }} className="ant-upload-text">{t('upload')}</div>
    </div>
  );

  useEffect(() => {
    setImg(avatarUrl);
  }, [avatarUrl]);

  const types = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/bmp',
  ];

  const beforeUpload = (file) => {
    const isLt5M = file && file.size / 1000000 >= 5;
    if (!types.includes(file.type) || isLt5M) {
      toast.error(t('Image must be in jpg or png format and less than 5mb'), {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return false;
    }
    return true;
  };

  const onDrop = useCallback((acceptedFiles) => {
    setLoading(false);
    const file = acceptedFiles && acceptedFiles[0];
    if (beforeUpload(file)) {
      onChange(file);
      setImg(getBase64(file, e => setImg(e)));
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const image = img || avatarUrl;
  return (
    <div
      style={{
        cursor: 'pointer',
        width: 100,
        height: 100,
        ...style,
      }}
      {...getRootProps()}
    >
      <input
        {...getInputProps()}
        multiple={false}
      />
      {image ? (
        <img
          style={{
            borderRadius: rectangle ? 0 : 50,
            objectFit: 'cover',
            border: '1px solid black',
            borderColor: 'black',
            ...style,
          }}
          src={image}
          alt="avatar"
        />
      ) : uploadButton}

    </div>
  );
}

export default MyDropzone;
