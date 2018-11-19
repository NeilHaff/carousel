import React,  { Component } from 'react';
import './App.scss';
import Imagebox from './Imagebox';
import axios from 'axios';


// //I was going to make in a functional component using useState, as shown below.

// function App() {
//     const [order, setOrder] = useState(0);
//
//     return (
//         <div>
//             <p>{order} </p>
//             <button onClick={() => setOrder(prevCount => prevCount + 1)}>+</button>
//             <button onClick={() => setOrder(prevCount => prevCount - 1)}>-</button>
//         </div>
//     );
// }


class App extends Component {
    constructor(props){
        super(props);
            this.state = {
              order: 5,
              pictures: [],
              image: [],
              isLoading: true,

        };
        this.displayorder = this.displayorder.bind(this);
    }

    timer() {
        this.setState({
            order: this.state.order -1
        });
        if(this.state.order < -5) {
            clearInterval(this.intervalId);
        }
    }

    displayorder = () => {
        const picture = this.state.pictures.find(picture => this.state.order === picture.id);
        const rightpic = this.state.pictures.find(rightpic => (this.state.order+1) === rightpic.id);
        const leftpic = this.state.pictures.find(leftpic => (this.state.order-1) === leftpic.id);


        if(leftpic && rightpic ) {
            return (
                <div className='container' >
                    {picture &&<Imagebox id={leftpic.id} url={leftpic.url} tags={leftpic.tags} />}
                    {picture &&<Imagebox id={picture.id} url={picture.url} tags={picture.tags} />}
                    {picture &&<Imagebox id={rightpic.id } url={rightpic.url} tags={rightpic.tags} />}
                </div>
            )
        }
        return (null);           //===> so it won't return undefined when it reaches the ends.

    };


    componentDidMount() {
        this.intervalId = setInterval(this.timer.bind(this), 4000);


        axios.get('https://pixabay.com/api/?key=9656065-a4094594c34f9ac14c7fc4c39&q=sports&image_type=photo')
            .then(json => json.data.hits.map((image, i) => (
                {
                    tags: image.tags,
                    url: image.previewURL,
                    id: (1 + i),
                })))

            .then(pictures => {
                this.setState({
                    pictures,
                    isLoading: false
                } , () => console.log('this log-' , this.state));

            })
            .catch(error => {
                console.log('API REQUEST ERROR: ', error);
                this.setState({error, loading: false})
            })
    };


    componentWillUnmount(){
        clearInterval(this.intervalId);
        //===> maybe makes for a better user experience to change this on a button click.
    }


    render() {
        return(
            <div className="background">
                <h1>Carousel </h1>
                    <div className="buttons">
                        <button onClick={() => this.setState({  order: this.state.order - 1 })} >back</button>
                        <button className='button2' onClick={() => this.setState({  order: this.state.order + 1 })}>forward</button>
                    </div>
                    {this.displayorder()}
            </div>
        );
    }
}


export default App;
