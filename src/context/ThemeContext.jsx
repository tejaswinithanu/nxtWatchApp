import React from 'react'

const ThemeContext = React.createContext({
  isDark: false,
  changeTheme: () => {},
})

export default ThemeContext
