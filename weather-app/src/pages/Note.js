import React from 'react';
import '../css/note.css';
import '../css/main.css';
import '../reset.css';

const Note = () => {
    return(
        <div className='container'>
            <div className='note'>
                <div className='study'>
                    <h3>노트</h3>
                    <ul>
                        <li>const와 let의 차이
                            <ol>
                                <li>const는 값을 변경할 수 없는 상수를 선언하는 데 사용</li>
                                <li>let은 값을 재할당할 수 있는 변수를 선언할 때 사용</li>
                            </ol>
                        </li>
                        <li>useCallback
                            <ol>
                                <li>React의 Hook 중 하나</li>
                                <li>컴포넌트가 랜더링 될 때마다 새로운 함수를 생성하는 것을 방지하여, 자식 컴포넌트의 불필요한 랜더링을 줄인다.</li>
                            </ol>
                        </li>
                        <li>useEffect
                            <ol>
                                <li>React의 Hook 중 하나</li>
                                <li>컴포넌트 생명주기 동안 특정 작업을 수행하게 해준다. 컴포넌트가 렌더링될 때마다 실행된다.</li>
                                <li>함수 function: 컴포넌트가 렌더링될 때 실행된다.</li>
                                <li>의존성 dependency: 값이 변경될 때마다 useEffect의 함수가 실행되며, 비어 있으면 처음 렌더링될 때 한 번만 실행된다.</li>
                            </ol>
                        </li>
                        <li>useState
                            <ol>
                                <li>컴포넌트 내 상태를 관리하며 UI를 동적으로 업데이트 하는데 사용</li>
                            </ol> 
                        </li>
                        <li>await
                            <ol>
                                <li>비동기 작업을 동기적으로 처리할 수 있게 하는 자바스크립트 키워드</li>
                            </ol> 
                        </li>
                        <li>오늘 날짜 불러오기
                            <ol>
                                <li><code>new Date();</code></li>
                            </ol>
                        </li>
                        <li>encodeURIComponent() 
                            <ol>
                                <li>URL에서 안전하게 사용할 수 있도록 문자열을 인코딩</li>
                            </ol>
                        </li>
                    </ul>
                </div>
                <div className='forServer'>
                    <h3>서버 명령어</h3>
                    <ul>
                        <li>서버 폴더에도 .gitignore 필수</li>
                        <li> 깃허브 페이지 이용시 주의 사항
                            <ol> 
                                <li>배포 시 .env에 담긴 정보를 사용하려면 서버를 따로 배포해야 한다.</li>
                                <li>local 에서 proxy 설정을 통해 .env 파일 사용 가능</li>
                            </ol>
                        </li>
                        <li> 명령어
                            <ol>
                                <li>서버 중지: <code>ctrl(cmd) + c</code></li>
                                <li>서버 다시 시작: <code>node server.js</code></li>
                                <li>nodemon: <code>npm run dev</code></li>
                            </ol>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Note;