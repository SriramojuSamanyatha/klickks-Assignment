import React from 'react'
import'./index.css'

const  ExpensesTable =(props) => {
    const {details,deleteData} = props
    const {id,title,amount, category,date,type} = details
    return (
        <div>
          
            <div className='expense-item'>
                <div className='expense-amount' style = {{color : type === 'income'? '#27ae60':'#e74c3c'}}>{amount} </div> 
                <div className='expense-description'>{type}</div>
                <div className='expense-description'>{category}</div>
                <div className='expense-description'>{title}</div> 
                <div className='expense-description'>{date}</div> 
                <button className='delete-button' onClick={() => deleteData(id)}>X</button>
                
                
            </div>
        </div>
    )


}


export default ExpensesTable