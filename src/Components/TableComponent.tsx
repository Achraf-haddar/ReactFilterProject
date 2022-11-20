import React, { useState, useEffect, useRef } from 'react';
import { Typography, Button, Stack, Grid } from '@mui/material';
import MaterialTable from 'material-table'
import { ThemeProvider, createTheme } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

export type Item = {
    scheduledStartDate: string,
    lateRegEndDate: string,
    name: string,
    network: string,
    rake: number,
    stake: number,
    game: number,
    structure: number,
    playersPerTable: string,
    filterString: string,
    BuyIn: string,
    speed: string,
    type: string
  }

export const TableComponent: React.FunctionComponent<any> = ({ SpeedValue, GameValue, BuyInValue, TableSizeValue }: any) => {
    const [selectedRows, setSelectedRows]: any = useState()
     
    function saveInLocalStorage():any {
        var data = JSON.parse(localStorage.getItem("Hidden") || "[]")
        for (var i=0; i<selectedRows.length; i++){
            data.push(selectedRows[i])
        }
        localStorage.setItem("Hidden", JSON.stringify(data))

        if (filteredData !== undefined) {
            const updatedData = filteredData.filter((item: any) => !selectedRows.includes(item))
            setFilteredData(updatedData)
        } else {
            const updatedData = transformedData.filter((row: any) => !selectedRows.includes(row))
            setTransformedData(updatedData)
        }
    }

    function handleNotif() {
        if('Notification' in window){
                
            if (Notification.permission === 'granted') {
                // If it's okay let's create a notification
                createNotif();
            }else{
                //notification == denied
                Notification.requestPermission()
                    .then(function(result) {
                        console.log(result);  //granted || denied
                        if( Notification.permission == 'granted'){ 
                            createNotif();
                        }
                    })
                    .catch( (err) => {
                        console.log(err);
                    });
            }
        
        }
    }


    function createNotif()  {
        let title = "I am a notification";
        let t = Math.floor(Date.now()) + 20000;    //2 mins in future
        console.log(t)
        let options = {
            body: 'Hello from JavaScript!',
            data: {zab:"zebi"},
            lang: 'en-CA',
            timestamp: t,
            // vibrate: [100, 200, 100]
        }
        let n = new Notification(title, options);      
    }
    const actions = [
        {
            icon: 'delete',
            tooltip: 'Delete',
            onClick: () => saveInLocalStorage()
        }, 
        {
            icon: () => <NotificationsNoneIcon />,
            tooltip: 'Notification',
            onClick: (event: any, rowData: any) => handleNotif()
        },
    ]

    function unixTimeToHumanReadable(seconds: any): any
    {
        var date = new Date(seconds * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        // Will display time in 10:30:23 format
        // var formattedTime = hours + ':' + minutes.toString().substr(-2) + ':' + seconds.toString().substr(-2);
        return hours + ':' + minutes.substr(-2)
    }

    function getBuyIn(filterString: any): any
    {
        const StakePlusRake = filterString.split(";")[filterString.split(";").length - 1]
        const buyIn = StakePlusRake.split(":")[StakePlusRake.split(":").length - 1].replace("USD", "$") 
        //GBP
        return buyIn
    }

    function getType(filterString: any): any
    {
        const type = filterString.split(";")[1]
        const retrievedType = type.split(":")[1].split(",")[1]
        if (retrievedType == "NL") {
            return "No Limit"
        } else if (retrievedType == "L") {
            return "Limit"
        } else if (retrievedType == "O") {
            return "Omaha Hi"
        } else if (retrievedType == "OHL") {
            return "Omaha H/L"
        } else if (retrievedType == "O5") {
            return "Omaha 5"
        } else if (retrievedType == "OHL5") {
            return "Omaha 5 H/L"
        } else if (retrievedType == "CL") {
            return "Courchevel"
        } else if (retrievedType == "CLHL") {
            return "Courchevel H/L"
        } else if (retrievedType == "7CS") {
            return "7 Card Stud"
        } else if (retrievedType == "7CSHL") {
            return "7 Card Stud H/L"
        } else if (retrievedType == "5CS") {
            return "Card Stud"
        } else if (retrievedType == "RAZZ") {
            return "Razz"
        } else if (retrievedType == "A") {
            return "Americana"
        } else if (retrievedType == "S") {
            return "Soko"
        } else if (retrievedType == "5CD") {
            return "5 Card Draw"
        } else if (retrievedType == "BA") {
            return "Badugi"
        } else if (retrievedType == "TD27L") {
            return "2-7 Triple Draw"
        } else if (retrievedType == "SD27L") {
            return "2-7 Single Draw"
        } else if (retrievedType == "32D") {
            return "32 Draw"
        } else if (retrievedType == "HORSE") {
            return "HORSE"
        } else if (retrievedType == "HEROS") {
            return "HEROS"
        } else if (retrievedType == "HOSE") {
            return "HOSE"
        } else if (retrievedType == "RASH") {
            return "RASH"
        } else if (retrievedType == "HA") {
            return "HA"
        } else if (retrievedType == "HAR") {
            return "HAR"
        } else if (retrievedType == "SHOE") {
            return "SHOE"
        } else if (retrievedType == "TE") {
            return "Telesina"
        } else if (retrievedType == "8G") {
            return "8-Game"
        } else if (retrievedType == "7G") {
            return "7-Game"
        } else if (retrievedType == "HBJ") {
            return "Holdem BJ"
        }
        return retrievedType
    }

    function getGame(game: any): any
    {
        if (game == "H") {
            return "Hold'em"
        } else if (game == "OMAHA") {
            return "Omaha"
        } else if (game == "STUD") {
            return "Any Stud"
        } else if (game == "DRAW") {
            return "Any Draw"
        } else if (game == "MIXED") {
            return "Any MIXED"
        }
    }
        
         
    function getName(name: any): any
    {
        const pos = name.indexOf('$')
        return name.slice(0, pos-1)
    }
    
    function getSpeed(filterString: any): any
    {
        const type = filterString.split(";")[1]
        const speed = type.split(":")[1].split(",")[2]
        if (speed == "T") {
            return "Turbo"
        } else if (speed == "ST") {
            return "Super Turbo"
        } else if (speed == "D") {
            return "Deep stack"
        } else if (speed == "NBI") {
            return "Static"
        } else if (speed == "L") {
            return "Lottery"
        } else if (speed == "N") {
            return "Normal"
        }
    }
      
    function filterString(term: any, rowData: any): any {
        const name = rowData.name
        if (term.startsWith('+')) {
            return name.includes(term.slice(1, term.length - 1));
        } else if (term.startsWith('-')){
            return !name.includes(term.slice(1, term.length - 1));
        } else {
            return name.includes(term)
        }
    }
    const columns = [
        { title: "Network", field: "network" },
        { title: "Name", field: "name", 
          customFilterAndSearch: (term: any, rowData: any) => filterString(term, rowData) 
        },
        { title: "Game", field: "game" },
        { title: "Start", field: "scheduledStartDate" },
        { title: "End", field: "lateRegEndDate" },
        { title: "Buy In", field: "BuyIn" },
        { title: "Speed", field: "speed" },
    ]
    const [data, setData]: any = useState(); //testData
    const [transformedData, setTransformedData]: any = useState(); //testData
    const [filter, setFilter]: any = useState(true);
    const dataFetchedRef = useRef(false);
    const updateFilterRef = useRef(false);
    const fetchData = async() => {
        const result = await fetch("https://pokermoney.com.br/shark.php")
          .then((response) => response.text())
          .then((response) => response.substring(
                response.indexOf('"') + 1, 
                response.lastIndexOf('"')
            ))
           .then((response) => JSON.parse(response))
           .then((response) => (response["Response"]["RegisteringTournamentsResponse"]["RegisteringTournaments"]["RegisteringTournament"]))
           
          .catch((error) => {
            console.log(error);
            
          })
          return result
      };
      const newItem = (item: any): Item => {
        return {
            scheduledStartDate: unixTimeToHumanReadable(item["@scheduledStartDate"]),
            lateRegEndDate: unixTimeToHumanReadable(item["@lateRegEndDate"]),
            name: getName(item["@name"]),
            network: item["@network"],
            rake: item["@rake"],
            stake: item["@stake"],
            game: getGame(item["@game"]),
            structure: item["@structure"],
            playersPerTable: item["@playersPerTable"],
            filterString: item["@filterString"],
            BuyIn: getBuyIn(item["@filterString"]),
            speed: getSpeed(item["@filterString"]),
            type: getType(item["@filterString"])
        }
      }
    const TransformData = async() => {
        const result = await fetchData();
        const FinalResult = result.map((item: Item): Item => {
                    return {
                        ...newItem(item),
                    }
                })
        DeleteHiddenRows(FinalResult)
    }

    async function DeleteHiddenRows(actualData: any) {
        var data = JSON.parse(localStorage.getItem("Hidden") || "[]")
        data.forEach((element: any, index: any) => {
            delete data[index].tableData;
        });
        if (data.length !== 0) {           
            const updatedRows = actualData.filter((item: any) => {
                console.log("==========================")
                console.log(data)
                console.log(item)
                for (var i=0; i<(data.length - 1); i++) { 
                    var test =  item["BuyIn"] == data[i]["BuyIn"] && 
                                item["filterString"] == data[i]["filterString"] && 
                                item["game"] == data[i]["game"] && 
                                item["lateRegEndDate"] == data[i]["lateRegEndDate"] && 
                                item["name"] == data[i]["name"] &&
                                item["network"] == data[i]["network"] &&
                                item["playersPerTable"] == data[i]["playersPerTable"] &&
                                item["rake"] == data[i]["rake"] &&
                                item["scheduledStartDate"] == data[i]["scheduledStartDate"] &&
                                item["speed"] == data[i]["speed"] &&
                                item["stake"] == data[i]["stake"] &&
                                item["structure"] == data[i]["structure"] &&
                                item["type"] == data[i]["type"]
                    if (test == true) return false                  
                }
                return true}) //!data.includes(dataRest)
            return setTransformedData(updatedRows)    
        }
        return setTransformedData(actualData)
    }
    
    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        TransformData() 
    }, []);

    const filterBySlowSpeed = (item: any) => {
        console.log(item.speed === "Slow")
        return item.speed === "Slow";
    } 
    const filterByRegularSpeed = (item: any) => item.speed === "Regular";
    const filterByTurboSpeed = (item: any) => {
        return item.speed === "Turbo"};
    const filterByHyperTurboSpeed = (item: any) => item.speed === "Hyper-Turbo";
    const filterByTableSize1 = (item: any) => (parseInt(item.playersPerTable) >= 7 && parseInt(item.playersPerTable) <= 10);
    const filterByTableSize2 = (item: any) => (parseInt(item.playersPerTable) >= 3 && parseInt(item.playersPerTable) <= 6);
    const filterByTableSize3 = (item: any) => (parseInt(item.playersPerTable) === 2);
    const filterByBuyIn = (item: any) => {
        if (item.BuyIn.charAt(0) === "$"){       
            return parseFloat(item.BuyIn.slice(1, item.BuyIn.length)) <= parseFloat(BuyInValue[1]) && parseFloat(item.BuyIn.slice(1, item.BuyIn.length)) >= parseFloat(BuyInValue[0]);
        } else {
            return false
        }
    }
    const filterByGame11 = (item: any) => (item.type === "No Limit" && item.game === "Hold'em");
    const filterByGame12 = (item: any) => (item.type === "Limit" && item.game === "Hold'em");
    const filterByGame13 = (item: any) => (item.type === "6+" && item.game === "Hold'em");
    const filterByGame14 = (item: any) => (item.type === "Showtime" && item.game === "Hold'em");
    const filterByGame21 = (item: any) => (item.type === "Pot Limit" && item.game === "Omaha");
    const filterByGame22 = (item: any) => (item.type === "No Limit" && item.game === "Omaha");
    const filterByGame23 = (item: any) => (item.type === "Omaha Hi/Lo" && item.game === "Omaha");
    const filterByGame24 = (item: any) => (item.type === "6 Card" && item.game === "Omaha");
    const filterByGame25 = (item: any) => (item.type === "5 Card" && item.game === "Omaha");
    const filterByGame26 = (item: any) => (item.type === "Courcheval" && item.game === "Omaha");
    const filterByGame27 = (item: any) => (item.type === "Fusion" && item.game === "Omaha");
    const filterByGame31 = (item: any) => (item.type === "Stud" && item.game === "Stud");
    const filterByGame32 = (item: any) => (item.type === "Razz" && item.game === "Stud");
    const filterByGame41 = (item: any) => (item.type === "5 Card Draw" && item.game === "Draw Games");
    const filterByGame42 = (item: any) => (item.type === "2-7 Triple Draw" && item.game === "Draw Games");
    const filterByGame43 = (item: any) => (item.type === "2-7 Single Draw" && item.game === "Draw Games");
    const filterByGame44 = (item: any) => (item.type === "Badugi" && item.game === "Draw Games");
    const filterByGame51 = (item: any) => (item.type === "8-Game" && item.game === "Mixed Games");
    const filterByGame52 = (item: any) => (item.type === "HORSE" && item.game === "Mixed Games");
    const filterByGame53 = (item: any) => (item.type === "Hold'em/Omaha" && item.game === "Mixed Games");
    
    const filterByGame01 = (item: any) => (item.game === "Hold'em");
    const filterByGame02 = (item: any) => (item.game === "Omaha");
    const filterByGame03 = (item: any) => (item.game === "Stud");
    const filterByGame04 = (item: any) => (item.game === "Draw Games");
    const filterByGame05 = (item: any) => (item.game === "Mixed Games");

    const updateFilteredValue = (data: any) => {
        setFilteredData(data)
    }
    const [filteredData, setFilteredData]: any = useState(); 
    
    useEffect(() => {
        async function update1() {
            if (transformedData !== undefined){
                setFilteredData(transformedData)
            }
        }
        update1()

        console.log("TESTTEST")
        console.log(filteredData)
        console.log("TESTTEST")
        

        


        async function update2() {
            if (filteredData !== undefined){
                console.log(SpeedValue[0])
                // console.log(SpeedValue[0]===false?filteredData:filteredData.filter(filterBySlowSpeed))
                if (SpeedValue[0] == true) {
                    setFilteredData(filteredData.filter(filterBySlowSpeed))
                }
            }
        }
        update2()
        async function update3() {
            if (filteredData !== undefined){
                // console.log(SpeedValue[1]===false?filteredData:filteredData.filter(filterByRegularSpeed))
                // console.log(SpeedValue[0]===false?filteredData:filteredData.filter(filterBySlowSpeed))
                if (SpeedValue[1] == true) {
                    setFilteredData(filteredData.filter(filterByRegularSpeed))
                }
            }
        }
        update3()
        async function update4() {
            if (filteredData !== undefined){
                // console.log(SpeedValue[0]===false?filteredData:filteredData.filter(filterBySlowSpeed))
                if (SpeedValue[2] == true) {
                    setFilteredData(filteredData.filter(filterByTurboSpeed))
                }
                console.log("Brabi 3leh temchich")
                console.log(filteredData)
                console.log("Brabi 3leh temchich")
            }
        }
        update4()
        async function update5() {
            if (filteredData !== undefined){
                // console.log(SpeedValue[0]===false?filteredData:filteredData.filter(filterBySlowSpeed))
                if (SpeedValue[3] == true) {
                    setFilteredData(filteredData.filter(filterByHyperTurboSpeed))
                }
            }
        }
        update5()

        
        async function update6() {
            if (filteredData !== undefined){
                // console.log(SpeedValue[0]===false?filteredData:filteredData.filter(filterBySlowSpeed))
                if (TableSizeValue[0] == true) {
                    setFilteredData(filteredData.filter(filterByTableSize1))
                }
            }
        }
        update6()

        async function update7() {
            if (filteredData !== undefined){
                // console.log(SpeedValue[0]===false?filteredData:filteredData.filter(filterBySlowSpeed))
                if (TableSizeValue[1] == true) {
                    setFilteredData(filteredData.filter(filterByTableSize2))
                }
            }
        }
        update7()

        async function update8() {
            if (filteredData !== undefined){
                // console.log(SpeedValue[0]===false?filteredData:filteredData.filter(filterBySlowSpeed))
                if (TableSizeValue[2] == true) {
                    setFilteredData(filteredData.filter(filterByTableSize3))
                }
            }
        }
        update8()


        
        // Game filter
        async function update10() {
            if (filteredData !== undefined){
                // console.log(SpeedValue[0]===false?filteredData:filteredData.filter(filterBySlowSpeed))
                if (GameValue[0][0]){
                    setFilteredData(filteredData.filter(filterByGame11))
                }
                
            }
        }
        update10()

        async function update11() {
            if (filteredData !== undefined){
                // console.log(SpeedValue[0]===false?filteredData:filteredData.filter(filterBySlowSpeed))
                if (GameValue[0][1]){
                    setFilteredData(filteredData.filter(filterByGame12))
                }
                
            }
        }
        update11()

        async function update12() {
            if (filteredData !== undefined){
                // console.log(SpeedValue[0]===false?filteredData:filteredData.filter(filterBySlowSpeed))
                if (GameValue[0][2]){
                    setFilteredData(filteredData.filter(filterByGame13))
                }
                
            }
        }
        update12()

        async function update13() {
            if (filteredData !== undefined){
                // console.log(SpeedValue[0]===false?filteredData:filteredData.filter(filterBySlowSpeed))
                if (GameValue[0][3]){
                    setFilteredData(filteredData.filter(filterByGame14))
                }
                
            }
        }
        update13()
        
        async function update14() {
            if (filteredData !== undefined){
                // console.log(SpeedValue[0]===false?filteredData:filteredData.filter(filterBySlowSpeed))
                if (GameValue[1][0]){
                    setFilteredData(filteredData.filter(filterByGame21))
                }
                
            }
        }
        update14()
        
        async function update15() {
            if (filteredData !== undefined){
                // console.log(SpeedValue[0]===false?filteredData:filteredData.filter(filterBySlowSpeed))
                if (GameValue[1][1]){
                    setFilteredData(filteredData.filter(filterByGame22))
                }
                
            }
        }
        update15()

        async function update16() {
            if (filteredData !== undefined){
                // console.log(SpeedValue[0]===false?filteredData:filteredData.filter(filterBySlowSpeed))
                if (GameValue[1][2]){
                    setFilteredData(filteredData.filter(filterByGame23))
                }
                
            }
        }
        update16()

        async function update17() {
            if (filteredData !== undefined){
                // console.log(SpeedValue[0]===false?filteredData:filteredData.filter(filterBySlowSpeed))
                if (GameValue[1][3]){
                    setFilteredData(filteredData.filter(filterByGame24))
                }
                
            }
        }
        update17()

        async function update18() {
            if (filteredData !== undefined){
                // console.log(SpeedValue[0]===false?filteredData:filteredData.filter(filterBySlowSpeed))
                if (GameValue[1][4]){
                    setFilteredData(filteredData.filter(filterByGame25))
                }
                
            }
        }
        update18()

        async function update19() {
            if (filteredData !== undefined){
                // console.log(SpeedValue[0]===false?filteredData:filteredData.filter(filterBySlowSpeed))
                if (GameValue[1][5]){
                    setFilteredData(filteredData.filter(filterByGame26))
                }
                
            }
        }
        update19()

        async function update20() {
            if (filteredData !== undefined){
                // console.log(SpeedValue[0]===false?filteredData:filteredData.filter(filterBySlowSpeed))
                if (GameValue[1][6]){
                    setFilteredData(filteredData.filter(filterByGame27))
                }
                
            }
        }
        update20()

        async function update21() {
            if (filteredData !== undefined){
                // console.log(SpeedValue[0]===false?filteredData:filteredData.filter(filterBySlowSpeed))
                if (GameValue[2][0]){
                    setFilteredData(filteredData.filter(filterByGame31))
                }
                
            }
        }
        update21()

        async function update22() {
            if (filteredData !== undefined){
                // console.log(SpeedValue[0]===false?filteredData:filteredData.filter(filterBySlowSpeed))
                if (GameValue[2][1]){
                    setFilteredData(filteredData.filter(filterByGame32))
                }
                
            }
        }
        update22()

        async function update23() {
            if (filteredData !== undefined){
                // console.log(SpeedValue[0]===false?filteredData:filteredData.filter(filterBySlowSpeed))
                if (GameValue[3][0]){
                    setFilteredData(filteredData.filter(filterByGame41))
                }
                
            }
        }
        update23()

        async function update24() {
            if (filteredData !== undefined){
                // console.log(SpeedValue[0]===false?filteredData:filteredData.filter(filterBySlowSpeed))
                if (GameValue[3][1]){
                    setFilteredData(filteredData.filter(filterByGame42))
                }
                
            }
        }
        update24()

        async function update25() {
            if (filteredData !== undefined){
                // console.log(SpeedValue[0]===false?filteredData:filteredData.filter(filterBySlowSpeed))
                if (GameValue[3][2]){
                    setFilteredData(filteredData.filter(filterByGame43))
                }
                
            }
        }
        update25()

        async function update26() {
            if (filteredData !== undefined){
                // console.log(SpeedValue[0]===false?filteredData:filteredData.filter(filterBySlowSpeed))
                if (GameValue[3][3]){
                    setFilteredData(filteredData.filter(filterByGame44))
                }
                
            }
        }
        update26()

        async function update27() {
            if (filteredData !== undefined){
                // console.log(SpeedValue[0]===false?filteredData:filteredData.filter(filterBySlowSpeed))
                if (GameValue[4][0]){
                    setFilteredData(filteredData.filter(filterByGame51))
                }
                
            }
        }
        update27()

        async function update28() {
            if (filteredData !== undefined){
                // console.log(SpeedValue[0]===false?filteredData:filteredData.filter(filterBySlowSpeed))
                if (GameValue[4][1]){
                    setFilteredData(filteredData.filter(filterByGame52))
                }
                
            }
        }
        update28()

        async function update29() {
            if (filteredData !== undefined){
                // console.log(SpeedValue[0]===false?filteredData:filteredData.filter(filterBySlowSpeed))
                if (GameValue[4][2]){
                    setFilteredData(filteredData.filter(filterByGame53))
                }
                
            }
        }
        update29()

        async function update30() {
            if (filteredData !== undefined){
                // console.log(SpeedValue[0]===false?filteredData:filteredData.filter(filterBySlowSpeed))
                if (GameValue[0][0] && GameValue[0][1] && GameValue[0][2] && GameValue[0][3]){
                    setFilteredData(filteredData.filter(filterByGame01))
                }
                
            }
        }
        update30()

    }, [SpeedValue, TableSizeValue, GameValue]);

    useEffect(() => {
        async function update1() {
            if (transformedData !== undefined){
                setFilteredData(transformedData)
            }
        }
        update1()

        async function update9() {
            if (filteredData !== undefined){
                // console.log(SpeedValue[0]===false?filteredData:filteredData.filter(filterBySlowSpeed))
                setFilteredData(filteredData.filter(filterByBuyIn))                
                
            }
        }
        update9()
    }, [BuyInValue])



    const defaultMaterialTheme = createTheme();
    return(
        <div>
            <br />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
            {/* {
                data !== undefined
                ? 
                <MaterialTable 
                    title = "Table"
                    data = {data}
                    columns = {columns}
                />
                : null
                 
                

            } */}
            <ThemeProvider theme={defaultMaterialTheme}>                
        
                {
                    filteredData === undefined 
                    ?
                    <MaterialTable
                        title = "Table"
                        data = {transformedData}
                        onSelectionChange={(rows) => setSelectedRows(rows)}
                        columns = {columns}
                        options = {{
                            filtering: filter,
                            selection: true
                        }}
                        actions = {actions}
                    />
                    :
                    <MaterialTable
                        title = "Table"
                        data = {filteredData}
                        onSelectionChange={(rows) => setSelectedRows(rows)}
                        columns = {columns}
                        options = {{
                            filtering: filter,
                            selection: true
                        }}
                        actions = {actions}
                    />
                }
                    

            </ThemeProvider>
            

        </div>
    )

}