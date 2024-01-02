const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;
const fs = require('fs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.set('view engine', 'pug');

//------------main page---------
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
const url = "http://localhost:3000"
var appData = {
    'js': appJs,
    'css': appCss,
    'app': `Open "${url}" to view the app`
}
app.get('/', (req, res) => {
  res.render('index', {title:'React Compiler', appData});
});


// ------------appJs-------------
app.post('/writeJs',(req,res)=>{
    fs.writeFile('./src/App.js',req.body.val,function(err) {
        if (err) {
          console.log(err);
          res.status('fail').send(err);
          return;
        } else {
            res.send('sucess');
        }
    });
});

// ------------appCss-------------

app.post('/writeCss',(req,res)=>{
    fs.writeFile('./src/App.css',req.body.val,function(err) {
        if (err) {
            console.log(err);
            res.status('fail').send(err)
            return;
        } else {
            res.send('sucess');
            return;
        }
    })
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
