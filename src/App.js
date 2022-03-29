import logo from './logo.svg';
import './App.css';
import Map3D from "./Components/Map3D/Map3D";
import Russia3D from "./Components/Russia3D/Russia3D"
import {useState} from "react";

function App() {
    // const [subjList, setSubjList] = useState({})
    // fetch("/data.json").then(res => res.json()).then(json => {
    //     setSubjList(json)
    // })

    return (
        <div className={"App"} style={{display: "flex",  padding: "200px 0 200px 200px", justifyContent: "end"}}>
            <div style={{width: "40%", background: "#ff0000"}}></div>
            <Russia3D onChange = {(value)=>{
                console.log("value", value)
            }}/>
        </div>
    )

  // return (
  //   <div className="App">
  //     <Map3D/>
  //   </div>
  // );
}

export default App;
