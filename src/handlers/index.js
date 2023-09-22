import { ipcMain } from 'electron'
import { getUsers, login } from '../data-queries/users.data'


ipcMain.handle('getUsers', () => getUsers())
ipcMain.handle('login', (_, data) => login(data))
