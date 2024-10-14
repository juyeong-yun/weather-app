import React, {useEffect, useState} from 'react';

import '../css/main.css';
import '../reset.css';

const Main = () => {
    const apiKey = process.env.REACT_APP_API_KEY;
    // console.log("apiKey: ", apiKey);

    return (
    <div className="container">
        <form onSubmit>
                <div className="searchRegion">
                    <span>영어 작성 필수</span>
                    <div className='search'>
                        <h3>원하는 지역을 검색해 주세요 : </h3>
                        <input type="text"  />
                        <button type="submit">검색</button>
                    </div>
                </div>
            </form>

    </div>

    )
}

export default Main;