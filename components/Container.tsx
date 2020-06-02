import * as React from 'react'

export const Container: React.FC = ({ children }) => <div id='container'>
  {children}

  <style jsx>{`
      #container {
        min-height: 100vh;
      }
    `}</style>
</div>
