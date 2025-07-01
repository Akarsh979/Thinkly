'use client'

import { useThemeStore } from "@/store/theme-store";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { Sun, Moon } from "lucide-react";

function ThemeToggle(){
   const {isDarkMode,toggletheme} = useThemeStore();
   const {theme,setTheme} = useTheme();

   useEffect(()=>{
   //   console.log('next-themes detected theme:', theme);
   //   console.log('current isDarkMode:', isDarkMode)

     if(theme==="dark" && !isDarkMode){
      // console.log('Updating isDarkMode to true');
      useThemeStore.setState({isDarkMode: true});
     } 
     else if(theme==="light" && isDarkMode){
      useThemeStore.setState({isDarkMode: false})
     }
   },[theme,isDarkMode])

   const handleToggleTheme = () => {
      toggletheme();
      console.log("Old isDarkMode: ",isDarkMode) // This will log old value since component isn't re-rendered

      const state = useThemeStore.getState();
      console.log("New isDarkMode: ",state.isDarkMode)

      setTheme(state.isDarkMode ? 'dark' : 'light')
   }

  return (
    <Button variant={'ghost'} size={'icon'} onClick={handleToggleTheme}>
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </Button>
  )
}

export default ThemeToggle;