import { ReactNode } from 'react'
import {FaTwitter , FaInstagram , FaFacebookF} from 'react-icons/fa'
import { FooterType } from '../types/Types'




export const footerData : Array<FooterType> = [
    {
        icon:<FaTwitter/>,
        title:'Twitter',
        href:'#'
    },
    {
        icon:<FaInstagram/>,
        title:'Instagram',
        href:'#'
    },
    {
        icon:<FaFacebookF/>,
        title:'Facebook',
        href:'#'
    },
]