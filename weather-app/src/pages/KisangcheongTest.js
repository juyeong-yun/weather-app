import React, { useEffect, useState } from 'react';

const KisangcheongTest = () => {

    const [inputValue, setInputValue] = useState('');
    const [Error, setError] = useState(null);

    const apiKey = process.env.REACT_APP_API_Kisangcheong;

    const url = `https://apihub.kma.go.kr/api/typ01/url/kma_sfctm2?&authKey={}`;

    const handleSubmit = (value) => {
        
    };

    return (
        <div className="container">
            <div className='title'>
                <h3>kisangcheong test page </h3>
            </div>
            
            <form onSubmit={handleSubmit}>
                <div className="searchRegion">
                    <div className='search'>
                        <h3>원하는 지역을 검색해 주세요 : </h3>
                        <input type="text" value={inputValue}
                        onChange={(value) => setInputValue(value.target.value)}  />
                        <button type="submit">검색</button>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default KisangcheongTest;