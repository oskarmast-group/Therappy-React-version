import React, { useEffect } from 'react';
import useUser from 'state/user';
import { GREEN, PRIMARY_GREEN } from 'resources/constants/colors';
import { IMAGES_URL } from 'resources/constants/urls';
import styled from 'styled-components';
import NoProfileSVG from 'resources/img/no-profile.svg';
import CameraIconSVG from 'resources/img/icons/camera-icon.svg';
import ImageUploading from 'react-images-uploading';
import { useState } from 'react';
import { useAlert } from 'alert';
import ALERT_TYPES from 'alert/types';
import ImageCropDialog from './ImageCropDialog';
import { Ring } from '@uiball/loaders';

const Container = styled.div`
    width: 130px;
    height: 130px;
    margin: 10px auto 0 auto;
    position: relative;
    .profile-container {
        width: 100%;
        height: 100%;
        border-radius: 65px;
        overflow: hidden;
        border: 2px solid ${GREEN};
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .upload {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
        background-color: ${PRIMARY_GREEN};
        position: absolute;
        padding: 0;
        margin: 0;
        right: 0%;
        bottom: 0;
        img {
            width: 22px;
            height: auto;
            cursor: pointer;
        }
        &:disabled,
        &[disabled] {
            background-color: #cccccc;
            color: #666666;
            pointer-events: none;
        }
    }
`;

const ProfileUpload = () => {
    const [user, userDispatcher] = useUser();
    const [loadedPicture, setLoadedPicture] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const alert = useAlert();

    const handleChange = (imageList) => {
        if (imageList.length > 0) {
            setLoadedPicture(imageList[0]);
        }
    };

    const onError = (errors) => {
        if (errors?.acceptType) {
            alert({
                type: ALERT_TYPES.INFO,
                config: {
                    title: 'Error al subir imagen',
                    body: 'Los únicos formatos soportados son png, jpg y jpeg.',
                    buttonText: 'OK',
                },
            })
                .then(() => {})
                .catch(() => {});
        }
    };

    useEffect(() => {
        if (!loadedPicture) return;

        alert({
            type: ALERT_TYPES.CUSTOM,
            config: {
                body: ImageCropDialog,
                props: {
                    src: loadedPicture.dataURL,
                },
            },
        })
            .then((croppedImage) => {
                console.log(typeof croppedImage);
                setCroppedImage(croppedImage);
                uploadImage(croppedImage);
            })
            .catch(() => {});
    }, [loadedPicture]);

    const uploadImage = async (url) => {
        let file = await fetch(url)
            .then((r) => r.blob())
            .then((blobFile) => new File([blobFile], 'newProfile.jpeg', { type: 'image/jpeg' }));
        userDispatcher.updateImageStart(file);
    };

    const loadingPicture = user.fetching.state && user.fetching.config.key === 'image';

    return (
        <Container>
            <ImageUploading onChange={handleChange} onError={onError} acceptType={['jpg', 'jpeg', 'png']}>
                {({ onImageUpload, errors }) => (
                    <>
                        <div className="profile-container">
                            <img
                                src={user?.user?.profileImg ? `${IMAGES_URL}${user.user.profileImg}` : NoProfileSVG}
                                alt={'Imagen de perfil'}
                            />
                        </div>
                        <button className="upload" type="button" onClick={onImageUpload} disabled={loadingPicture}>
                            {loadingPicture ? <Ring color="#ffffff" size={22} /> : <img src={CameraIconSVG} alt={'camara subir imagen'} />}
                        </button>
                    </>
                )}
            </ImageUploading>
        </Container>
    );
};

export default ProfileUpload;
