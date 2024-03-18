import { useState } from 'react'

export const Filter = ({ filteredWord, setFilteredWord }) => {
  return (
    <>
      Filter shown with{' '}
      <input
        value={filteredWord}
        onChange={(event) => {
          setFilteredWord(event.target.value)
        }}
      />
    </>
  )
}
