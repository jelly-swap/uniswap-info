import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PlaceHolder from '../../assets/placeholder.png'

const BAD_IMAGES = {}

const Inline = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
`

const Image = styled.img`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`

const logos = {
  CAPT: require('../../assets/tokens/CAPT.png')
}

export default function TokenLogo({ token, header = false, size = '24px', ...rest }) {
  const [error, setError] = useState(false)

  let path = require(`../../assets/placeholder.png`)

  if (token) {
    path = logos[token] || require(`../../assets/tokens/${token}.svg`)
  }

  useEffect(() => {
    setError(false)
  }, [token])

  if (error || BAD_IMAGES[token]) {
    return (
      <Inline>
        <Image {...rest} alt={''} src={PlaceHolder} size={size} />
      </Inline>
    )
  }

  return (
    <Inline>
      <Image
        {...rest}
        alt={''}
        src={path}
        size={size}
        onError={event => {
          BAD_IMAGES[token] = true
          setError(true)
          event.preventDefault()
        }}
      />
    </Inline>
  )
}
