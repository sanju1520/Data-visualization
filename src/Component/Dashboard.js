import React from"react";
import {useEffect,useState} from 'react';
import {Chart as ChartJS, CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend}from 'chart.js';
import { Bar } from "react-chartjs-2";
ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);

const options={
    indexAxis:'x',
    elements:{
        bar:{
            borderWidth:2,
        },
    },
    responsive:true,
    plugins:{
        legend:{
            position:'left',
        },
        title:{
            display:true,
            text:'Chart.js Horizontal Bar Chart',
        },
    },
};
const Dashboard= () => {
    const [data,setData]=useState({
            labels : ["gas", "Oil","market", "gdp", "war","battery"],
            datasets: [
              {
                label: "Intensity",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: [6, 16, 60, 16, 6, 4, 9],
              },
              {
                  label: "relevance",
                  backgroundColor: "rgb(53,162,253)",
                  borderColor: "rgb(53,162,253,0.5)",
                  data: [2, 4, 5, 4, 2, 2, 3],
                },
            ],
      });
    useEffect(()=>{
        const fetchData=async()=>{
            const url='mongodb://localhost:27017/myDB.graphs'
            const labelSet=[];
            const dataSet1=[];
            const dataSet2=[];
            await fetch(url).then((data)=>{
                console.log("api data",data)
                const res=data.json();
                return res
            }).then((res)=>{
                console.log("ress",res)
                for(const val of res){
                    dataSet1.push(val.intensity);
                    dataSet2.push(val.relevance)
                    labelSet.push(val.topic)
                }
                setData({
                    labels :labelSet,
            datasets: [
              {
                label: "Intensity",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: dataSet1,
              },
              {
                  label: "Region",
                  backgroundColor: "rgb(53,162,253)",
                  borderColor: "rgb(53,162,253,0.5)",
                  data:dataSet2,
                },
            ],
                })
                console.log("arrdata",dataSet1,dataSet2)
            }).catch(e=>{
                console.log("error",e)
            })
        }
        fetchData();
    },[])
    return (
      <div style={{width:'90%',height:'50%'}}>
        <Bar data={data} options={options} />
      </div>
    );
  };
  
  export default Dashboard;