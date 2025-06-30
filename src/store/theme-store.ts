'use client'

import {create} from 'zustand'
import {persist} from 'zustand/middleware'

interface ThemeState{
   isDarkMode: boolean,
   toggletheme: ()=>void,
}

export const useThemeStore = create<ThemeState>()(
   persist((set)=>(
      {
         isDarkMode: false,
         toggletheme: () => {
            return set((state)=>({isDarkMode: !state.isDarkMode}))
         }  
      }
   ),
   {
     name: 'theme-storage', 
   })
);