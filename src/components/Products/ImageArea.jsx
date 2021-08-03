import { IconButton } from '@material-ui/core'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import React, {useCallback} from 'react';
import {storage} from "../../firebase/index"
import ImagePreview from './ImagePreview';


function ImageArea({images, setImages}) {

    const deleteImage = useCallback(async (id) => {
        const ret = window.confirm('この画像を削除しますか？')
        if (!ret) {
            return false
        } else {
            const newImages = images.filter(image => image.id !== id)
            setImages(newImages);
            return storage.ref('images').child(id).delete()
        }
    }, [images])

    const uploadImage = useCallback((event) => {
        const file = event.target.files;
        let blob = new Blob(file, { type: "image/jpeg" });

        // Generate random 16 digits strings
        const S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const N=16;
        const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n)=>S[n%S.length]).join('')

        const uploadRef = storage.ref('images').child(fileName);
        const uploadTask = uploadRef.put(blob);

        uploadTask.then(() => {
            // Handle successful uploads on complete
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                const newImage = {id: fileName, path: downloadURL};
                setImages((prevState => [...prevState, newImage]))
            });
        })
    }, [setImages])

    return (
        <div>
            <div className="p-grid__list-images">
                {images.length > 0 && (
                    images.map(image => <ImagePreview id={image.id} path={image.path} key={image.id} deleteImage={deleteImage}/>)
                )}
            </div>
            <div className="u-text-right">
                <span>商品画像を登録する</span>
                <IconButton>
                    <label>
                        <AddPhotoAlternateIcon />
                        <input className="u-display-none" type="file" id="image" onChange={e => uploadImage(e)}/>
                    </label>
                </IconButton>
            </div>
        </div>
    )
}

export default ImageArea
