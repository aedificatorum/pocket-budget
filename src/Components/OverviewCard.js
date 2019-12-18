import React from 'react';
import styled from 'styled-components'

const OverviewCardLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin: .5rem;
  padding: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
`

export const OverviewCard = ({items, currency}) => {
  return (
    <OverviewCardLayout>
      {`${items.length} items in ${currency}`}
    </OverviewCardLayout>
  )
}