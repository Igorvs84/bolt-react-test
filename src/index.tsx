import React from 'react'
      import { StrictMode } from 'react'
      import createRoot from 'react-dom/client'
      import PollForm from './components/PollForm'

      const root = createRoot(document.getElementById('root'))
      root.render(
        <StrictMode>
          <PollForm />
        </StrictMode>
      )
