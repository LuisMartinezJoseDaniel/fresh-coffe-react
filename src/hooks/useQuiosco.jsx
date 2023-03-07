import React, { useContext } from 'react'
import QuioscoContext from '../context/QuioscoProvider'

export const useQuiosco = () => useContext(QuioscoContext)

