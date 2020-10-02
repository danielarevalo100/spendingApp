import React from 'react'

import View from '../../../components/View'
import Label from '../../../components/Label'

const Send = (props)=>{
    const {handleSubmit}=props

 return(<View style={{width:'100%',padding:'15px'}}>
 <form style={{width:'100%'}} onSubmit={(e)=>{e.preventDefault();handleSubmit()}}>
     <View>
     <Label fontSize={1.5}>Amount</Label>
         <input name='amount' onChange={(e)=>props.handleForm(e)} style={{textAlign:'center'}} type='number' placeholder='Amount'/>
     </View>
     <Label fontSize={1.5}>Who do you want to send?</Label>
     <View style={{width:'100%'}}>
         <input onChange={(e)=>props.handleForm(e)} name='email' type='email' placeholder='Enter email'/>
         <input onChange={(e)=>props.handleForm(e)} name='emailConfirmation' type='email' placeholder='Confirm email '/>
     </View>
     <button className='btn primary' type='submit'><Label fontSize={1.2} color='white'>SEND</Label></button>
 </form>
</View>)
}
export default Send