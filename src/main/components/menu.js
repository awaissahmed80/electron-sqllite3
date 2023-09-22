import { app, ipcMain, Menu } from 'electron';

ipcMain.handle('toggle-theme', (_, val) => {    
    menuTemplate[1].submenu[2].label = val === 'dark' ? 'Light Theme' : 'Dark Theme';
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);

    // console.log("Storage", ipcMain.)
    // const NOTIFICATION_TITLE = 'Basic Notification 2'
    // const NOTIFICATION_BODY = 'Notification from the Main process'

    // new Notification({
    //     title: NOTIFICATION_TITLE,
    //     body: NOTIFICATION_BODY
    // })
    // .show()

    // dialog.showErrorBox('Welcome Back', `You arrived from: Hell`)
    // dialog.showMessageBox("Welcome Here")
    // dialog.showSaveDialog("Hello")    
})


export const menuTemplate = [
    {
        // This item specifies the application name on macOS
        label: "Tester",
        role: 'appMenu',
    },
    {
      label: 'File',
      submenu: [
        {
          label: 'Open',
          click: () => {
            // Add your file opening logic here
          },
        },
        {
          label: 'Save',
          click: () => {
            // Add your file saving logic here
          },
        },
        {
            label: 'Light Theme',
            click: () => {
                // ipcMain.emit('toggleTheme', 'light')
                // mainWindow.webContents.send('theme-changed', 'light');
                ipcMain.emit('theme-changed', 'dark')

            },
          },
          
        { type: 'separator' },
        {
          label: 'Exit',
          click: () => {
            app.quit();
          },
        },
      ],
    },    
];


