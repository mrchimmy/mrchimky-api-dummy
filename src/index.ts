import functions from 'firebase-functions'
import { app } from './server'

exports.app = functions.https.onRequest(app)