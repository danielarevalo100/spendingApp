import React from 'react'
import {Link} from 'react-router-dom'

import View from '../View'
import Label from '../Label'

import CloseMenuIcon from '@material-ui/icons/MenuOpenRounded';
import HomeIcon from '@material-ui/icons/HomeRounded';
import ReceiptIcon from '@material-ui/icons/ReceiptRounded';
import BookIcon from '@material-ui/icons/BookRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToAppRounded';

import './styles.css'

const Menu = (props)=>{
    
    const {userName, show:menu,onClose}= props
    const logout = ()=>{
        localStorage.clear()
        props.history.push('/')
    }
 return(
     <React.Fragment>
        {menu?<View className='menu-background' style={{position:'absolute',width:'100%',height:'100%',top:'0',backgroundColor:'rgba(0,0,0,0.6)'}}></View>:null}
        <View className='menu' style={{left:menu?'0':'-100%'}}>
            <View className='menu-header' style={{flexDirection:'row'}}>
                <Label color='white' fontSize={2}>{userName}</Label>
                <CloseMenuIcon onClick={()=>onClose()} style={{fill:'#ffffff',fontSize:35,marginLeft:'30px'}} />
            </View>

            <View className='menu-navigation' style={{width:'100%'}}>
                <Link to='/dashboard' style={{width:'100%'}}>
                    <View className='menu-navigation-item' style={{flexDirection:'row',justifyContent:'flex-start',width:'100%'}}>
                        <HomeIcon style={{fill:'#1e1e1e',fontSize:30}}/>
                        <Label fontSize={2}>Home</Label>
                    </View>
                </Link>
                <Link to='/activity' style={{width:'100%'}}>
                    <View className='menu-navigation-item' style={{flexDirection:'row',justifyContent:'flex-start',width:'100%'}}>
                        <BookIcon style={{fill:'#1e1e1e',fontSize:30}}/>
                        <Label fontSize={2}>Activity</Label>
                    </View>
                </Link>
                <View className='menu-navigation-item' style={{flexDirection:'row',justifyContent:'flex-start',width:'100%'}}>
                    <ReceiptIcon style={{fill:'#1e1e1e',fontSize:30}}/>
                    <Label fontSize={2}>Receipt</Label>
                </View>
                <View onClick={logout} className='menu-navigation-item' style={{flexDirection:'row',justifyContent:'flex-start',width:'100%'}}>
                    <ExitToAppIcon style={{fill:'#1e1e1e',fontSize:30}}/>
                    <Label fontSize={2}>Logout</Label>
                </View>
                
            </View>
        </View>
    </React.Fragment>
)
}
export default Menu