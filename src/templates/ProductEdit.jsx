import React, {useEffect, useState, useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {PrimaryButton, TextInput} from '../components/UIkit'
import { SelectBox } from '../components/UIkit';
import { saveProduct } from '../reducks/products/operations';
import ImageArea from '../components/Products/ImageArea';
import { db } from '../firebase';

const ProductEdit = () => {
    const dispatch = useDispatch();
    const uid = useSelector(state => state.users.uid)
    let id = window.location.pathname.split('/product/edit')[1];
    if (id) {
        id = id.split('/')[1]
    }
    console.log(id)

    const categories = [
        {id: "tops", name: "トップス"},
        {id: "shirts", name: "シャツ"},
        {id: "pants", name: "パンツ"}
    ]

    const genders = [
        {id: "all", name: "すべて"},
        {id: "male", name: "メンズ"},
        {id: "female", name: "レディース"}
    ];

    const sizes = [
        {id: "FLEE", name: "フリーサイズ"},
        {id: "S", name: "S"},
        {id: "M", name: "M"},
        {id: "L", name: "L"},
        {id: "XL", name: "XL"}
    ];

    const [name, setName] = useState(""),
          [description, setDescription] = useState(""),
          [images, setImages] = useState([]),
          [category, setCategory] = useState(""),
          [gender, setGender] = useState(""),
          [price, setPrice] = useState(""),
          [size, setSize] = useState([]);

    const inputName = useCallback((event) => {
        setName(event.target.value)
    }, [setName])

    const inputDescription = useCallback((event) => {
        setDescription(event.target.value)
    }, [setDescription])

    const inputPrice = useCallback((event) => {
        setPrice(event.target.value)
    }, [setPrice])

    useEffect(() => {
        if (id) {
            db.collection('users').doc(uid).collection('userProducts').doc(id).get().then(snapshot => {
                const product = snapshot.data()
                setName(product.name)
                setDescription(product.description)
                setImages(product.images)
                setCategory(product.category)
                setGender(product.gender)
                setSize(product.size)
                setPrice(product.price)
            })
        }
    },[id])

    return (
        <section>
            <h2 className="u-text__headline u-text-center">{id ? '商品の編集': '商品の登録'}</h2>
            <div className="c-section-container">
                <ImageArea images={images} setImages={setImages} />
                <TextInput
                    fullWidth={true} label={"商品名"} multiline={false} required={true}
                    onChange={inputName} rows={1} value={name} type={"text"} name='name'
                />
                <TextInput
                    fullWidth={true} label={"商品説明"} multiline={true} required={true}
                    onChange={inputDescription} rows={5} value={description} type={"text"} name='description'
                />
                <SelectBox
                    label={"カテゴリー"} options={categories} required={true} select={setCategory} value={category}
                    name='category'
                />
                <SelectBox
                    label={"性別"} options={genders} required={true} select={setGender} value={gender}
                    name='gender'
                />
                <SelectBox
                    label={"サイズ"} options={sizes} required={true} select={setSize} value={size}
                    name='size'
                />
                <TextInput
                    fullWidth={true} label={"価格"} multiline={false} required={true}
                    onChange={inputPrice} rows={1} value={price} type={"number"} name='price'
                />
                <div className="module-spacer--small" />
                <div className="center">
                    <PrimaryButton
                        label={"商品情報を保存"}
                        onClick={() => dispatch(saveProduct(id, name, description, category, gender, size, price, images))}
                    />
                </div>
            </div>
        </section>
    );
};

export default ProductEdit;
