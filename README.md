# Background and Motivation
Gmail categories suck! They have potential but are not customisable.

Labels help to an extent, but they fade into the background and you will almost certainly miss messages in them (when you apply the "skip inbox" filter).

Github notificatons were clogging up my main inbox. I setup a label and filter to stop this, but then kept missing important emails because there is no 'attention grabbing' notification for labels (like there are for the built in categories).

This extension adds a bar on top of the inbox with custom categories. When you click the category, you are taken to a view of (label:\<name\> AND is:unread).
<img width="1214" height="214" alt="image" src="https://github.com/user-attachments/assets/39c8ec8a-9449-42ef-ac87-1f9016b07746" />

<img width="1222" height="391" alt="image" src="https://github.com/user-attachments/assets/516dfef4-e436-4370-a1cc-bd20c1f544b1" />

# Instructions:
1. In Gmail, create a label that you will use as a category
2. In Gmail, setup a filter for emails you wish to be marked with the new label and select 'skip inbox (archive)'
3. In `contents.js`, put the email addresses of the accounts this add-on must apply to.
4. In `contents.js`, put the label name(s) of the label(s) you want to turn into categories.
5. Install the add-on in Firefox (by selecting the local manifest file).
6. Refresh your Gmail tab

# Disclaimer:
This add-on is written and tested for Firefox. 
You must tweak the necessary parameters in the `content.js` file to make it work for you

