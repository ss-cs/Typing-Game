import './Home.css';

const  Randomchar = (props)=>{
    return(
    <>
        <div className='card'>
            <div className='card__body' >
                <h2 className='card__title' >{props.value}</h2>
            </div>
        </div>
    </>
    )
}

export default Randomchar;