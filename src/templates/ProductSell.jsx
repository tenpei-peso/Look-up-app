import React from 'react'
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton, SelectBox, TextInput } from '../components/UIkit';
import { db } from '../firebase';
import { saveSell } from '../reducks/products/operations';

function ProductSell() {
    const dispatch = useDispatch();
    const uid = useSelector(state => state.users.uid)
    let id = window.location.pathname.split('/sell/')[1];
    let edit = window.location.pathname.split('edit/')[1];

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

    const ages = [
        {id: "10", name: "10代"},
        {id: "20", name: "20代"},
        {id: "30", name: "30代"},
        {id: "40", name: "40代"},
        {id: "50", name: "50代"},
        {id: "60", name: "60代以上"}
    ];

    const 
        [name, setName] = useState(""),
        [category, setCategory] = useState(""),
        [gender, setGender] = useState(""),
        [price, setPrice] = useState(""),
        [size, setSize] = useState([]),
        [age, setAge] = useState("");

    const inputName = useCallback((event) => {
        setName(event.target.value)
    }, [setName])

    const inputPrice = useCallback((event) => {
        setPrice(event.target.value)
    }, [setPrice])

    useEffect(() => {
        if (id) {
            db.collection('users').doc(uid).collection('userProducts').doc(id).get().then(snapshot => {
                const product = snapshot.data()
                setName(product.name)
                setCategory(product.category)
                setGender(product.gender)
                setSize(product.size)
                setPrice(product.price)
            })
        }
    },[id])

    return (
        <section>
            <h2 className="u-text__headline u-text-center">{id ? '売り上げ登録': '商品の登録'}</h2>
            <div className="c-section-container">
                <TextInput
                    fullWidth={true} label={"商品名"} multiline={false} required={true}
                    onChange={inputName} rows={1} value={name} type={"text"} name='name'
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
                <SelectBox
                    label={"年齢"} options={ages} required={true} select={setAge} value={age}
                    name='age'
                />
                <TextInput
                    fullWidth={true} label={"価格"} multiline={false} required={true}
                    onChange={inputPrice} rows={1} value={price} type={"number"} name='price'
                />
                <div className="module-spacer--small" />
                <div className="center">
                    <PrimaryButton
                        label={"商品情報を保存"}
                        onClick={() => dispatch(saveSell(id, edit, name, category, gender, size, age, price))}
                    />
                </div>
            </div>
        </section>
    );
}

export default ProductSell
