import React, {useState, useEffect} from "react";
//import MaterialTable from 'material-table';
import MaterialTable from 'material-table'
import  {Grid}  from '@material-ui/core';
import { Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const User = () => {

const url = "https://jsonplaceholder.typicode.com/posts/1/comments"
  const [data, setData] = useState([])
  useEffect(() => {
    getUser()
  }, [])

  const getUser = () => {
    fetch(url).then(resp => resp.json())
      .then(resp => setData(resp))
  }

const columns = [
    { title: " PostId", field: "postId"},
    {
      title: "Id", field: "id",
         },
    {
      title: "Name", field: "name",
          },
          { title: "Email", field:"email"},
    {
      title: "Body", field: 'body',
      
    }]




    return(
        <div className="Table">
        <h1 align="center">User Details</h1>

        <Grid container direction="row" spacing={1} width="100%" height={500}>
                <Grid item xs={12}>
        
        
        <MaterialTable
            title="reactTable"
                columns={columns}
        data={data}
        options={{actionsColumnIndex: -1, addRowPosition: "first"}}

       editable={{
         onRowAdd:(newData) => new Promise((resolve, reject) =>{

          fetch(url, {
            method: "POST",
            headers: {
              'Content-type': "application/json"
            },
            body:JSON.stringify(newData)
          }).then(resp => resp.json())
          .then(resp =>{
            getUser()
            resolve()
          })
         }),

         onRowUpdate: (newData, oldData) => new Promise ((resolve, reject) =>{
          fetch(url + "/" + oldData.id, {
  method: "PUT",
  headers: {
    "content-type":"application/json"
  },
  body:JSON.stringify(newData)
}).then (resp => resp.json())
.then(resp =>{
  getUser()
  resolve()
})
         }),

         onRowDelete: (oldData) => new Promise((resolve, reject)=>{
          fetch(url + "/" + oldData.id,{
             method: "DELETE",
             headers:{
               "contain-type": "application/json"
             },
                       
            }).then(resp => resp.json())
            .then(resp => {
              getUser()
              resolve()
            })
         })

       }}
      
      />
      
      
     </Grid>
     </Grid>
            
            
            </div>
          
          
      );
    }

export default User;