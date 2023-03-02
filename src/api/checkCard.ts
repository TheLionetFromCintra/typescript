// @ts-ignore
import { MD5 } from 'crypto-js'
import axios from './axios'

export default async (card: any) => await axios(`card/check/${MD5(card)}`, {})
