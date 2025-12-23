import React from "react";


export default function Meme()
{
    
    const [meme, setMeme] = React.useState({
        topText : "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/30b1gx.jpg"
    })
    
    const [allMemes, setAllMemes] = React.useState([])

    React.useEffect(() => {

        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))

    }, [])

    function getMemeImage ()
    {
        //const memesArrays = allMemes.data.memes
        const randomNumber = Math.floor(Math.random() * allMemes.length) + 1
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...meme,
            randomImage: url
        }))
    }


    function handleChange (event)
    {
        const {name, value} = event.target
        setMeme (prevMeme => 
            ({
                ...meme,
                [name] : value
            }))
    }


    return(

        <main>
            <div className="form">
                <input 
                    type="text"
                    className="form--input"
                    placeholder="Top text"
                    name="topText"
                    value={meme.topText}
                    onChange = {handleChange}
                />
                <input 
                    type="text"
                    className="form--input"
                    placeholder="Bottom text"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange = {handleChange}
                />
                <button onClick={getMemeImage} className="form--button">Get a new meme image 🖼️</button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} alt="memePic" className="meme--image"/>
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>

    )
}