"use strict";
const defaultSettings = {
    theme: "light",
    notifications: {
        email: true,
        sms: false
    }
};
const userPreferences = {
    theme: "dark",
    notifications: {
        sms: true
    }
};
//const finalSettings = Object.assign({}, defaultSettings, userPreferences);
const fixedSettings = Object.assign({}, defaultSettings, userPreferences, { notifications: {
    ...defaultSettings.notifications, 
    ...userPreferences.notifications} });
//console.log(finalSettings);
// Object.assign() performs a shallow copy
// The nested 'notifications' object from userPreferences.completely replaces the 'notifications' object from defaultSettings.Therefore, 'email: true' is lost.
console.log(fixedSettings);
Object.freeze(fixedSettings);
try {
    fixedSettings.theme = "blue";
}
catch (error) {
    console.log(error.message);
}
// Object.freeze() is shallow.
// It freezes only the top-level object not Nested objects.
fixedSettings.notifications.sms = false;
console.log(fixedSettings.notifications);
