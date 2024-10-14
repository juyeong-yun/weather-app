import React, {useEffect, useState} from 'react';

import '../css/main.css';
import '../reset.css';

const Main = () => {
    
    return (
    <div className="container">
        <form onSubmit>
            <div className="searchRegion">
                <h3>원하는 지역을 검색해 주세요 : </h3>
                <input type="text"/>
                <button type="submit">검색</button>
            </div>
        </form>

    </div>
    
    )
}

export default Main;