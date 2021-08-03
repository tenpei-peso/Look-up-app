import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { signOut } from '../reducks/users/operations';

function Home() {
    const dispatch = useDispatch();
    const selector = useSelector(state => state.users) /**storeのstateをとってきている */
    return (
        <>
            <h2>{selector.uid}</h2>
            <p>{selector.username}</p>
            <button onClick={() => dispatch(signOut())}>サインアウト</button>
        </>
    )
}

export default Home
