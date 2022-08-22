import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles.css"

/* Data Imports */
import memesData from './memesData.js';
import boxesData from './boxes';

/* Image Imports */
import trollFace from "./images/troll.png";

/* Page Display Functions **/

function Header(){
    return(
        <nav className="nav-bar">
            <div className="brand">
                <img src={trollFace} className="troll-pic"></img>
                <h3>Meme Generator</h3>
            </div>
            <p>React course - Project 3</p>
        </nav>
    );
}

function Meme(){
    const [meme,setMeme]=React.useState({
        topText:"",
        bottomText:"",
        imageSource:"https://i.imgflip.com/1bij.jpg"
    });
    const [allMemes,setAllMemes]=React.useState({});
    React.useEffect(function(){
        console.log('Effect Ran')
        fetch("https://api.imgflip.com/get_memes").then(res=>res.json()).then(data=>setAllMemes(data));
    },[])
    function getMeme(){
        let num=Math.floor(Math.random()*100);
        let link=allMemes.data.memes[num].url;
        setMeme((prev)=>{
            return {
                ...prev,
                imageSource:link
            }
        });
    }
    function handleChange(e){
        const {name,value}=e.target;
        setMeme((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        })
    }
    return(
        <main>
             <div className="meme-components">
                <div className="inputs">
                    <input type="text" className="text-box top" onChange={handleChange} name="topText" placeholder="Enter Top Text" value={meme.topText}></input>
                    <input type="text" className="text-box bottom" onChange={handleChange} name="bottomText" placeholder="Enter Bottom Text" value={meme.bottomText}></input>
                </div>
                <div className="generate-button">
                    <button className="btn btn-lg" onClick={getMeme}>Generate Meme<span><i className="fa-solid fa-image"></i></span></button>
                </div>
                <div className="display-meme">
                    <img src={meme.imageSource} className="meme-img"></img>
                    <h2 className='top-text'>{meme.topText}</h2>
                    <h2 className='bottom-text'>{meme.bottomText}</h2>
                </div>
            </div>
        </main>
    );
}

function App(){
    return(
        <div>
            <Header/>
            <Meme/>
        </div>
    );
}

//-----------------------------


const root=ReactDOM.createRoot(document.querySelector("#root"));
root.render(<App/>);