import logo from './logo.svg';
import './App.css';
import Map3D from "./Components/Map3D/Map3D";

function App() {
    fetch("/Code2Sub.json").then(res => res.json()).then(json => {
        for (const index in json) {
            if (subjList[index])
                subjList[index].name = json[index]
            else
                subjList[index] = {"name": json[index]}
        }
        // setSubjState(subjList)
    })

  return (
    <div className="App">
      <Map3D/>
    </div>
  );
}

export default App;
