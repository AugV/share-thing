import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
        "en": "Lietuvių",
        "signIn": "Sign-in",
        "signUp": "Sign-up",
        "signOut": "Sign-out",

        "username": "Username",
        "enterUsername": "Enter username",
        "emailAddress": "Email address",
        "password": "Password",
        "enterEmail": "Enter email",
        "enterPassword": "Enter Password",
        "repeatPassword": "Repeat password",
        "enterNewPassword": "Enter New Password",
        "repeatNewPassword": "Repeat New Password",
        "dontHaveAccount": "Don't have an account? ",
        "forgotPassword": "Forgot Password? ",
        "hello": "Hello",
        "youAreLoggedInAs": "You are logged in as",
        "resetPassword": "Reset password",
        "changePassword": "Change password",
        "reset": "Reset",
        "change": "Change",

        "owned": "Owned Items",
        "lent": "Lent Items",
        "borrowed": "Borrowed Items",
        "account": "Account",
        "addItem": "Add Item",
        "editItem": "Edit item",
        "noData": "No data",

        "borrow": "Borrow",
        "enterItemName": "Enter item name",
        "selectGroup": "Select group",

        "select": "Select",
        "createGroup": "Create group",
        "groupName": "Group name",
        "enterGroupName": "Enter group name",
        "groupDescription": "Group description",
        "enterGroupDescription": "Enter group description",
        "groupMembers": "Group members",
        "groups": "Groups",

        "itemDetails": "Item Details",
        "ownedBy": "Owned by",
        "requestItem": "Request item",

        "images": "Images",
        "itemName": "Item name",
        "enterItemName": "Enter item name",
        "itemDescription": "Item description",
        "enterItemDescription": "Enter item description",

        "sharegreements": "Sharegreement",
        "goToSharegreement": "Go to sharegreement",
        "asOwner": "As owner",
        "asBorrower": "As borrower",
        "sharegreementDetails": "Details",
        "chat": "Chat",
        "send": "Send",
        "typeMessage": "Type a message here...",
        "owner": "Owner",
        "borrower": "Borrower",
        "startDate": "Start date",
        "endDate": "End date",
        "decline": "Decline",
        "confirm": "Confirm",
        "anotherDate": "Another date",
        "abort": "Abort",

        "borroweWantsToBorrow": "Borrower wants to borrow your item.",
        "waitingForBorrowerToConfirm":"Waiting for a borrower to confirm the offered date.",
        "itemGiven": "Item given",
        "waitingBorrowerReceived": "Waiting for borrower to confirm that he received the item.",
        "waitingBorrowerReturn": "Waiting for borrower to return the item.",
        "confirmAndFinish": "Confirm Item Returned & Finish Sharegreement",
        "finished": "Sharegreement is finished.",
        "aborted": "Sharegreement was aborted.",
        "declined": "Sharegreement was declined.",

        "waitingForOwnerDateConfirm": "Waiting for owner to confirm the offered date.",
        "waitingToReceiveTheItem": "Waiting to receive the Item",
        "confirmItemReceived": "Confirm item received",
        "itemReturned": "Item returned",
        "waitingOwnerToConfirmItemReturned": "Waiting for the owner to confirm that item was returned.",
        "ownerConfirmedItemReturned": "Owner confirmed that item was returned and Sharegreement is finished.",

        "groupDescription": "Group description",
        "host": "Host",
        "addMembers": "Add members",
        "groupMemberList": "Group member list",
        "addGroupMembers": "Add group members",
    }
  },
  lt: {
    translation: {
        "lt": "English",
        "signIn": "Prisijungti",
        "signUp": "Užsiregistruoti",
        "signOut": "Atsijungti",
        "username": "Naudotojo vardas",
        "enterUsername": "Įveskite nuadotojo vardą",
        "emailAddress": "El.pašto adresas",
        "password": "Slaptažodis",
        "enterEmail": "Įveskite el.pašto adresą",
        "enterPassword": "Įveskite slaptąžodį",
        "repeatPassword": "Pakartokite slaptažodį",
        "enterNewPassword": "Įveskite naują slaptažodį",
        "repeatNewPassword": "Pakartokite naują slaptažodį",
        "dontHaveAccount": "Neturite paskyros? ",
        "forgotPassword": "Pamiršote slaptažodį? ",
        "hello": "Sveiki",
        "youAreLoggedInAs": "Jūs prisijungęs kaip",
        "resetPassword": "Atstatyti slaptažodį",
        "changePassword": "Pakeisti slaptažodį",
        "reset": "Atstatyti",
        "change": "Keisti",

        "owned": "Mano daiktai",
        "lent": "Paskolinti daiktai",
        "borrowed": "Pasiskolinti daiktai",
        "account": "Paskyra",
        "addItem": "Pridėti daiktą",
        "editItem": "Redaguoti daiktą",
        "noData": "Nėra duomenų",

        "borrow": "Skolintis",
        "enterItemName": "Įveskite daikto pavadinimą",
        "selectGroup": "Pasirinkite grupę",

        "select": "Pasirenkami",
        "groups": "Grupės",
        "createGroup": "Sukurti grupę",
        "groupName": "Grupės pavadinimas",
        "enterGroupName": "Įveskite grupės pavadinimą",
        "groupDescription": "Grupės aprašymas",
        "enterGroupDescription": "Įveskite grupės aprašymą",
        "groupMembers": "Grupės nariai",

        "itemDetails": "Daikto aprašas",
        "ownedBy": "Savininkas",
        "requestItem": "Pasiskolinti daiktą",

        "images": "Paveikslėliai",
        "itemName": "Daikto pavadinimas",
        "enterItemName": "Įveskite daikto pavadinimą",
        "itemDescription": "Daikto aprašymas",
        "enterItemDescription": "Įveskite daikto aprašymą",

        "sharegreements": "Dalinimasis",
        "goToSharegreement": "Eiti į dalinimąsi",
        "asOwner": "Aš skolinu",
        "asBorrower": "Aš skolinuosi",
        "sharegreementDetails": "Detalės",
        "chat": "Pokalbis",
        "send": "Siųsti",
        "typeMessage": "Rašykite žinutę čia...",
        "owner": "Sąvininkas",
        "borrower": "Užklausėjas",
        "startDate": "Pradžios data",
        "endDate": "Pabaigos data",
        "decline": "Atmesti",
        "confirm": "Patvirtinti",
        "anotherDate": "Kita data",
        "abort": "Atšaukti",

        "borroweWantsToBorrow": "Užklausėjas nori pasiskolinti jūsų daiktą.",
        "waitingForBorrowerToConfirm": "Laukiama užklausėjo datos patvirtinimo.",
        "itemGiven": "Daiktas duotas",
        "waitingBorrowerReceived": "Laukiama kol užklausėjas aptvirtins jog gavo daiktą.",
        "waitingBorrowerReturn": "Laukiama kol užklausėjas grąžins daiktą.",
        "confirmAndFinish": "Patvirtinti, jog daiktas grąžintas ir užbaigti dalinimąsi",
        "finished": "Dalinimasis baigtas.",
        "aborted": "Dalinimasis atšauktas.",
        "declined": "Dalinimasis atmestas.",

        "waitingForOwnerDateConfirm": "Laukiama kol savininkas patvirtins datą.",
        "waitingToReceiveTheItem": "Laukia kol bus gautas daiktas",
        "confirmItemReceived": "Patvirtinti, kad daiktas gautas",
        "itemReturned": "Daiktas grąžintas savininkui",
        "waitingOwnerToConfirmItemReturned": "Laukiama savininko patvirtinimo, kad daiktas grąžintas.",
        "ownerConfirmedItemReturned": "Savininkas patvirtino, kad daiktas grąžintas. Dalinimasis užbaigtas.",

        "groupDescription": "Grupės aprašymas",
        "host": "Šeimininkas",
        "addMembers": "Pridėti narius",
        "groupMemberList": "Grupės narių sąrašas",
        "addGroupMembers": "Pridėti grupės narius",
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "lt",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;