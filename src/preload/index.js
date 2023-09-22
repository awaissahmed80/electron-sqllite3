import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { join } from 'path'
  
// Custom APIs for renderer
const api = {
    appPath: join( __dirname, '../../resources' ),
    test: () => ipcRenderer.invoke('ping', 'pong'),   
    login: (data) => ipcRenderer.invoke('login', data),
    getUsers: () => ipcRenderer.invoke('getUsers'),    
    toggleTheme: (theme) =>  ipcRenderer.invoke('toggle-theme', theme ),   
    
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
    
  try {
    contextBridge.exposeInMainWorld('electronApi', electronAPI)
    contextBridge.exposeInMainWorld('api', api)    
  } catch (error) {
    console.error(error)
  }
} else {
  window.electronApi = electronAPI
  window.api = api
}
