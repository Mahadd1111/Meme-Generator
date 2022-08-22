function VariableState(){
    const [value,setValue]=React.useState(true);
    function flipState(){
        setValue((prev)=>!prev);
    }
    return(
        <div className="temp" onClick={flipState}>{value===true?"Yes":"No"}</div>
    );
}

function ArrayState(){
    const [things,setThings]=React.useState(["Thing 1 " ,"Thing 2 "]);
    console.log(things);
    function handleClick(){
        setThings((prev)=>[...prev,"Thing "+(prev.length+1)+" "]);;
        console.log(things);
    }
    const thingsElements=things.map(thing=><h1>{thing}</h1>);
    return(
        <div>
            <button onClick={handleClick}>Add Thing</button>
            {thingsElements};
        </div>
    );
}

function ObjectState(){
    let star="Nothing";
    const [contact,setContact]=React.useState({
        firstName:"Mahad",
        lastName:"Ahmed",
        phone:"0322 8001177",
        isFavourite:false
    });
    function toggleFavourite(){
        setContact(prev=>{
            return {...prev,isFavourite:!prev.isFavourite}
        });
        console.log(contact.isFavourite);
    }
    return(
        <div>
            <button onClick={toggleFavourite}>Click me</button>
            <h1>{contact.firstName}</h1>
            <h1>{contact.lastName}</h1>
            <h1>{contact.phone}</h1>
            <h1>{contact.isFavourite.toString()}</h1>
        </div>
    );
}

function Box(props){
    const styles={
        backgroundColor: props.on?"#222222":"#cccccc",
        color:props.on?"white":"#222222"
    }
    return(
        <div>
            <div style={styles} onClick={()=>props.toggler(props.id)} className="box">{props.id}</div>
        </div>
    );
}

function BoxesChallenge(props){
    function toggle(id){
        setBoxesArray((prevSquares)=>{
            return prevSquares.map((square)=>{
                return square.id===id?{...square,on:!square.on}:square;
            })
        })
    }
    const [boxesArray,setBoxesArray]=React.useState(boxesData);
    const boxElements=boxesArray.map((item)=>{
        return <Box on={item.on} key={item.id} id={item.id} toggler={toggle}/>
    })
    return(
        <div>
            {boxElements}
        </div>
    );
}

function Messages(){
    const [unreadMsgs,setUnreadMsgs]=React.useState([]);
    const [showMsg,setShowMsg]=React.useState(false);
    function toggle(e){setShowMsg((prev)=>!prev)}
    return(
        <div>
            {unreadMsgs.length==0 && showMsg && <h1>You're All Caught up!</h1>}
            {unreadMsgs.length>0 && showMsg && <h1>You have {unreadMsgs.length} unread Message{unreadMsgs.length==1?"":"s"}</h1>}
            <button onClick={toggle}>{showMsg?"Hide":"Show"} Message</button>
        </div>
    )
}

function Forms(){
    const [data,setData]=React.useState({firstName:"",lastName:"",email:"",comments:"",friendly:false,employmentStatus:"",favColour:""});
    function handleChange(e){
        const {name,value,type,checked}=e.target;
        setData((prevData)=>{
            return {
                ...prevData,
                [name]:type==="checkbox"?checked:value
            }
        });
    }
    function handleSubmit(e){
        e.preventDefault();
        console.log(data);
    }
    return(
        <form className="react-form">
            <input className="form-input" type="text" onChange={handleChange} name="firstName" placeholder='First Name' value={data.firstName}></input>
            <input className="form-input" type="text" onChange={handleChange} name="lastName" placeholder='Last Name' value={data.lastName}></input>
            <input className="form-input" type="text" onChange={handleChange} name="email" placeholder='Email' value={data.email}></input>
            <textarea className="form-input" onChange={handleChange} name="comments" value={data.comments} placeholder="Enter Comments" />
            <div className="friendly">
                <input type="checkbox" id="isFriendly" checked={data.friendly} onChange={handleChange} name="friendly"></input>
                <label htmlFor='isFriendly'>Are you Friendly?</label>
            </div>
            <div className="employment">
                <h1>Employment Status</h1>
                <div className="emp-option">
                    <input type="radio" id="op1" name="employmentStatus" value="Unemployed" onChange={handleChange} checked={data.employmentStatus==="Unemployed"}></input>
                    <label htmlFor='op1'>Unemployed</label>
                </div>
                <div className="emp-option">
                    <input type="radio" id="op2" name="employmentStatus" value="Part-time" onChange={handleChange} checked={data.employmentStatus==="Part-time"}></input>
                    <label htmlFor='op2'>Part-time</label>
                </div>
                <div className="emp-option">
                    <input type="radio" id="op3" name="employmentStatus" value="Full-time" onChange={handleChange} checked={data.employmentStatus==="Full-time"}></input>
                    <label htmlFor='op2'>Full-time</label>
                </div>
                <div className='colour'>
                    <label htmlFor='favColour'>What is your Favourite Colour?</label>
                    <select id="favColour" name="favColour" onChange={handleChange}>
                    <option value="">--Select--</option>
                        <option value="Red">Red</option>
                        <option value="Blue">Blue</option>
                        <option value="Green">Green</option>
                        <option value="Orange">Orange</option>
                    </select>
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </form>
    );
}


function SideEffects(props){
    const [starWarsData,setStarWarsData]=React.useState({});
    const [count,setCount]=React.useState(1);

    React.useEffect(function(){
        console.log("Effect Ran");
        fetch(("https://swapi.dev/api/people/"+count))
        .then(res => res.json())
        .then(data => setStarWarsData(data));
    },[count])
    return(
        <div>
            <h1>Count is {count}</h1>
            <button onClick={()=>setCount((prev)=>prev+1)}>Get Next Character</button>
            <pre>{JSON.stringify(starWarsData, null, 2)}</pre>
        </div>
    )

}