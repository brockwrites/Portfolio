"""
Author: Brock Price
Date: 20231001
Purpose: For reporting, populate a Monday.com board with a project rollup (in CSV) with resource names, resource allocation, time worked, etc.
"""
import requests
import json

apiKey = "---" #Add Monday API Key Here
apiUrl = "https://api.monday.com/v2"
headers = {"Authorization" : apiKey}

## NOTES ##
#Board should have only 1 group. This group will be deleted.
#Remember that the Board ID (if changed) needs to be changed for each query below.
#####

#TO-DO: Make a Board ID variable?
#TO-DO: Could you run this all in the cloud? What options does Power Automate provide for Python?

#Get the current group ID
query1 = '{boards(ids:---){groups{id title}}}' #Add Board ID Here
data = {'query' : query1}
r = requests.post(url=apiUrl, json=data, headers=headers)# make request
requestToParse = r.json()
oldGroupID = requestToParse['data']['boards'][0]['groups'][0]['id']

#Create a new group
query2 = 'mutation ($myGroupName:String!){create_group(board_id:---,group_name:$myGroupName){id}}' #Add Board ID Here
vars = {'myGroupName':'Current Projects'} #change the group name here, if you'd like
data = {'query':query2,'variables':vars}
r = requests.post(url=apiUrl, json=data, headers=headers) #making request
print(r.json())

#Delete the old group
query3 = 'mutation ($myGroupName:String!){delete_group(board_id:---,group_id:$myGroupName){id}}' #Add Board ID Here
vars = {'myGroupName':oldGroupID}
data = {'query':query3,'variables':vars}
r = requests.post(url=apiUrl, json=data, headers=headers) #making request
print(r.json())

#Read the Excel file, specific sheet
#Needed to run (from CMD) py -m pip install openpyxl
import pandas as pd
import datetime #needed to convert date format: https://stackoverflow.com/questions/502726/converting-date-between-dd-mm-yyyy-and-yyyy-mm-dd
import numpy as np #to deal with NaN and blank string errors

df = pd.read_csv(r"C:\Users\---\OneDrive\Documents\Project Reports\Projects\searchresults.csv") #Add CSV OneDrive Location Here
dfCell = df.iloc[3,2]  #use this, if needed, for testing
dfRowCount = len(df.index) - 1 #get the row count, so we know how many to add. Minus 1 since we don't need the last 'Total' row.
df['Start Date'] = pd.to_datetime(df['Start Date'], errors='coerce').dt.strftime('%Y-%m-%d') #truncate timestamp in the spreadsheet, https://stackoverflow.com/questions/58948809/why-do-i-get-valueerror-nattype-does-not-support-strftime-even-though-its-no

#df['Start Date'] = df['Start Date'].apply(lambda x: pd.Timestamp(x).strftime('%Y-%m-%d'))  #https://towardsdatascience.com/mastering-dates-and-timestamps-in-pandas-and-python-in-general-5b8c6edcc50c
df = df.replace(r'^\s+$', np.nan, regex=True) #turn blank strings to NaN, https://stackoverflow.com/questions/13445241/replacing-blank-values-white-space-with-nan-in-pandas
df = df.fillna(".") #avoid NaN errors, https://www.geeksforgeeks.org/replace-nan-values-with-zeros-in-pandas-dataframe/


for x in range(dfRowCount):

    #put all the column values for the item into variables
    opportunityName = df.iloc[x,1]
    projectTeam = df.iloc[x,2]
    projMgr = df.iloc[x,5]
    estimatedWork = df.iloc[x,7]
    allocatedWork = df.iloc[x,8]
    actualWork = df.iloc[x,9]
    remainingWork = df.iloc[x,10]
    startDate = df.iloc[x,12]
    
    #fix derived from https://stackoverflow.com/questions/50916422/python-typeerror-object-of-type-int64-is-not-json-serializable
    #fte = int(fte) #eliminates error for FTE column "Object of type int64 is not JSON serializable"

    #loop through each row & add it to the board
    query2 = 'mutation ($myItemName:String!, $columnVals:JSON!) {create_item (board_id:---, item_name:$myItemName, column_values:$columnVals) {id}}' #Add Board ID Here
    vars = {
        'myItemName':df.iloc[x,0], #this is [row,column]
        'columnVals':json.dumps({
            'text': opportunityName, #in api playground, see all content types using: mutation{ create_column(column_type:  )}
            'text0': projectTeam,
            'text8': projMgr,
            'numbers': estimatedWork,
            'numbers3': allocatedWork,
            'numbers4': actualWork,
            'numbers7': remainingWork,
            'date_1': {'date':startDate}
        })
    }

    data = {'query' : query2, 'variables' : vars}
    r = requests.post(url=apiUrl, json=data, headers=headers) #making request

    print(r.json())
    #print(targetRelease)
