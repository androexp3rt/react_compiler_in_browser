import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

function Application() {
    const appJs = `import logo from './logo.svg';
import './App.css';

export default function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Edit <code>App.js</code> and click save button to reload.
                </p>
            </header>
        </div>
    );
}`
    const appCss = `.App {
    text-align: center;
}

.App-logo {
    height: 20vmin;
    pointer-events: none;
}
      
@media (prefers-reduced-motion: no-preference) {
    .App-logo {
        animation: App-logo-spin infinite 20s linear;
    }
}
      
.App-header {
    background-color: #282c34;
    min-height: calc(50vh - 5px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
}
      
.App-link {
    color: #61dafb;
}
      
@keyframes App-logo-spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}`;
    async function write(val,lang) {
        await axios.post(`http://localhost:8000/write${lang}`, {"val":val}).then((res) => {
        })
    }
    async function refresh() {
      await write(appCss,"Css")
      await write(appJs,"Js")
    } 
    window.onbeforeunload = async() => {
      await refresh()
    }
    return (
        <div id="Application">
            <div id="container">
                <div className='codeBox' id="javascript">
                    <div className='header' id="jsHeader">
                        <p className="heading">App.js</p>
                        <button onClick={(e) => write(e.target.parentNode.parentNode.children[1].value,"Js")}>Save</button>
                    </div>
                    <textarea className="code" id="jsCode" defaultValue={appJs}></textarea>
                </div>
                <div className='codeBox' id="css">
                    <div className='header' id="cssHeader">
                        <p className="heading">App.css</p>
                        <button onClick={(e) => write(e.target.parentNode.parentNode.children[1].value,"Css")}>Save</button>
                    </div>
                    <textarea className="code" id="cssCode" defaultValue={appCss}></textarea>
                </div>
            </div>
            <App />
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));  
root.render(
    <React.StrictMode>
        <Application />
    </React.StrictMode>
);
reportWebVitals();
