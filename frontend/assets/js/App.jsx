import React from 'react'
import { Button } from 'semantic-ui-react'
import TableExampleCompact from './components/table'
import { CookiesProvider } from 'react-cookie';
const Root = () => (
  <CookiesProvider>
      <TableExampleCompact />
      
    </CookiesProvider>
)

export default Root