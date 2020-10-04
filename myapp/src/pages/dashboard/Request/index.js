import React from 'react'

import View from '../../../components/View'
import Label from '../../../components/Label'

const Send = (props)=>{
    const {handleSubmit,handleForm,data}=props

 return(<View style={{width:'100%',padding:'15px'}}>
 <form style={{width:'100%'}} onSubmit={(e)=>{e.preventDefault();handleSubmit()}}>
     <View>
     <Label fontSize={1.5}>Amount</Label>
         <input value={data.amount} onChange={(e)=>handleForm(e,'request')} name='amount' style={{textAlign:'center'}} type='number' placeholder='Amount'/>
     </View>
     <Label fontSize={1.5}>Who sent you?</Label>
     <View style={{width:'100%'}}>

        <input value={data.name} onChange={(e)=>handleForm(e,'request')} name='name' type='text' placeholder='Name'/>
        <input value={data.email} onChange={(e)=>handleForm(e,'request')} name='email' type='email' placeholder='Enter email'/>
     </View>
     <button className='btn primary' type='submit'><Label fontSize={1.2} color='white'>SEND</Label></button>
 </form>
</View>)
}
export default Send