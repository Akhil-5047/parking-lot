import React, {useState, useEffect} from "react";

function App() {

  const [vehiclesList, setVehiclesList] = useState([]);
  const [checkInInputs, setCheckInInputs] = useState({});
  const [checkOutInputs, setCheckOutInputs] = useState({});
  const [first, setFirst] = useState(false);
  const [checkInError, setCheckInError] = useState("");
  const [checkOutError, setCheckOutError] = useState("");

  const findIndex = (number) => {
    let index = vehiclesList.length;
    for(let i=0;i<vehiclesList.length;i++)
    {
      let item = vehiclesList[i];
      if(item.vehicleNumber === number)
      {
        index = i;
        break;
      }
    }
    return index;
  }

  const chekcInHandleChange = (e) => {
    setCheckInError("");
    const name = e.target.name;
    const value = e.target.value;
    if(name === "vehicleNumber")
    {
      let index = findIndex(value);
      if(value === "") setCheckInError("Enter vehicle number");
      else if(value.length >= 10) setCheckInError("Invalid Vehicle Number");
      else if(index !== vehiclesList.length) setCheckInError("Vehicle Number already exists");
    }
    if(name === "name" && value === "") setCheckInError("Enter name");
    setCheckInInputs(values => ({...values, [name]: value}));
  }

  const chekcOutHandleChange = (e) => {
    setCheckInError("");
    const name = e.target.name;
    const value = e.target.value;
    if(name === "vehicleNumber")
    {
      let index = findIndex(value);
      if(value.length >= 10) setCheckOutError("Invalid Vehicle Number");
      else if(index === vehiclesList.length) setCheckOutError("Vehicle Number does not exists");
      else setCheckOutError("");
    }
    if(!value) setCheckOutError("Enter all fields");
    setCheckOutInputs(values => ({...values, [name]: value}));
  }

  const onCheckInVehicle = () => {
    if(JSON.stringify(checkInInputs) !== '{}' && checkInError === "") {
      const currentVehicles  = [...vehiclesList];
      currentVehicles.push(checkInInputs);
      setVehiclesList(currentVehicles);
      setCheckInInputs({});
    }
  }

  const onCheckOutVehicle = () => {
    if(JSON.stringify(checkOutInputs) !== '{}') {
      const currentVehicles  = [...vehiclesList];
      let index = findIndex(checkOutInputs.vehicleNumber);
      let checkInTime = new Date(currentVehicles[index].time.replace('T', ' ').replace(/-/g,'/'));
      let checkOutTime  = new Date(checkOutInputs.time.replace('T', ' ').replace(/-/g,'/'));
      if(checkInTime < checkOutTime)
      {
        currentVehicles.splice(index,1);
        setVehiclesList(currentVehicles);
        setCheckOutInputs({});
      }
      else {
        setCheckOutError("Invalid Check-Out Time");
      }
    }
  }

  useEffect(() => {
    if(first) localStorage.setItem("vehiclesData", JSON.stringify(vehiclesList));
    setFirst(true);
    const getVehiclesList = localStorage.getItem('vehiclesData');
    console.log(getVehiclesList)
    if (getVehiclesList !== '' && getVehiclesList !== null) {
      return setVehiclesList(JSON.parse(getVehiclesList));
    }
    return setVehiclesList([]);
  },[vehiclesList.length, first]);

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f9fbfe', height: '100vh'}}>
      <h1 style={{textAlign: 'center', color: 'blue', fontWeight: '650'}}> Parking Lot</h1>
      <h1 style={{fontWeight: '500'}}> Number of Vehicles in Parking Lot : {vehiclesList.length}</h1>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10%'}}>
            <h1 style={{fontWeight: '500'}}> Check In</h1>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <label style={{padding: '4%'}}> Enter Vehicle Number:
                <input type="text" name="vehicleNumber" onChange={chekcInHandleChange} value={checkInInputs.vehicleNumber || ""}/>
              </label>
              <label style={{padding: '4%'}}> Enter Name:
                <input type="text" name="name" onChange={chekcInHandleChange} value={checkInInputs.name || ""}/>
              </label>
              <label style={{padding: '4%'}}> Check-In Time:
                <input type="datetime-local" name="time" onChange={chekcInHandleChange} value={checkInInputs.time || ""}/>
              </label>
              <br />
              <button onClick={() => onCheckInVehicle()} style={{fontSize: '20px',width: '50%',padding: '2%', margin: '4%', color: 'white', backgroundColor: '#4c63b6', borderWidth: '0', borderRadius: '8%'}}> 
                submit 
              </button>
              <p style={{color: 'red', textAlign: 'center'}}> {checkInError}</p>
            </div>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10%'}}>
            <h1 style={{fontWeight: '500'}}> Check Out</h1>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <label style={{padding: '4%'}}> Enter Vehicle Number:
                <input type="text" name="vehicleNumber" onChange={chekcOutHandleChange} value={checkOutInputs.vehicleNumber || ""}/>
              </label>
              <label style={{padding: '4%'}}> Check-Out Time:
                <input type="datetime-local" name='time' onChange={chekcOutHandleChange} value={checkOutInputs.time || ""}/>
              </label>
              <br />
              <button onClick={() => onCheckInVehicle()} style={{fontSize: '20px',width: '50%',padding: '2%', margin: '4%', color: 'white', backgroundColor: '#4c63b6', borderWidth: '0', borderRadius: '8%'}}> 
                submit 
              </button>
              <p style={{color: 'red', textAlign: 'center'}}> {checkOutError}</p>
            </div>
          </div>
      </div>
    </div>
  );
}

export default App;
