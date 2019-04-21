import React, {Component} from 'react'

class MemeCreator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            topText: "",
            bottomText: "",
            randomImg: "https://i.imgflip.com/1g8my4.jpg",
            allMemeImages: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                this.setState({
                    allMemeImages: memes
                })
            })
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        const randomData = this.state.allMemeImages[Math.floor(Math.random() * this.state.allMemeImages.length)]
        this.setState({
            randomImg: randomData.url
        })
    }

    render() {
        return (
            <div className="meme-box">
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        placeholder="Top text"
                        name="topText"
                        value={this.state.topText}
                        onChange={this.handleChange}
                    />
                    <input 
                        type="text"
                        placeholder="Bottom text"
                        name="bottomText"
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                    />
                    <button>Submit</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImg} alt="Potential meme image..or whatever"/>
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeCreator