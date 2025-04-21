import { TextEncoder, TextDecoder } from 'util'
import '@testing-library/jest-dom'

global.TextEncoder = require('util').TextEncoder
global.TextDecoder = require('util').TextDecoder
