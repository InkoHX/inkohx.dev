import * as React from 'react'
import { NextPage } from 'next'
import { Container, MainContent } from '@Components'

const MainPage: NextPage = () => {
  return (
    <React.Fragment>
      <Container>
        <MainContent />
      </Container>

      <style jsx global>{`
        body {
          background: linear-gradient(200deg, #67daff, #03a9f4, #039be5, #007ac1, #006db3);
          background-size: 500% 500%;
          animation-name: Rainbow;
          animation-duration: 5s;
          animation-timing-function: ease-out;
          animation-iteration-count: infinite;
        }

        @keyframes Rainbow {
          0% { background-position:0% 50% }
          50% { background-position:100% 50% }
          100% { background-position:0% 50% }
        }
      `}</style>
    </React.Fragment>
  )
}

export default MainPage
