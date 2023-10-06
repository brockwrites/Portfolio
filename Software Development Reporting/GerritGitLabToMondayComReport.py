import gitlab
from datetime import date
from datetime import timedelta
import requests #To connect to Monday & Gerritt
import json #Also for Monday
from pygerrit2 import GerritRestAPI, HTTPDigestAuth #Our Gerritt uses only Digest Auth
import os #For Gerrit, to check for VPN connection

## USAGE NOTES ##
# You only need to comment out the functions at the very bottom to run / not run for Gerrit/GitLab
# The 'Yesterday' variable below controls the day to grab change data for

#Declare Variables
mergeIDs=[]
mergeDates=[]
mergedBy=[]
gerritChanges=[]
gerritInsertions = 0
gerritDeletions = 0
should_return = False

#Define Dates **CHANGE THE YESTERDAY VARIABLE BELOW TO GET CHANGES FOR A DIFFERENT DAY
today = date.today()
yesterday = today - timedelta(days = 1)  #change to get any particular days changes, ex. "2022-08-31"  #was/is days = 1
yesterdayMinusOne = today - timedelta(days = 30) #Only get recent changes
yesterdayMinusOne = yesterdayMinusOne.isoformat()


##===== MONDAY CONNECTION =====##
apiKey = "---" #Add Monday API Key Here
apiUrl = "https://api.monday.com/v2"
headers = {"Authorization" : apiKey}


##===== GITLAB SECTION: 2 Functions =====##
#Function to get GitLab Merges
def get_gitlab_mergerequests():

    #Access GitLab via Access Token
    ACCESS_TOKEN = '---' #Add GitLab Access Token Here
    gl = gitlab.Gitlab('https://gitlab.powercosts.io/', ACCESS_TOKEN)

    #Create a list and loop through it
    mrs = gl.mergerequests.list(scope="all", get_all=True, target_branch="master", state="merged", updated_after=yesterdayMinusOne)
    for mr in mrs:
        if str(mr.merged_at[:10]) == str(yesterday): #only get yesterdays changes
            if mr.source_project_id not in (921,907,502,501,911,503,500,926,959,928,927,1011,929): #Omit Specific Projects Here
                print(mr)
                mergeIDs.append(mr.id) #Won't be imported into Monday
                mergeDates.append(mr.merged_at[:10])
                mergedBy.append(mr.merged_by["name"])

#Function to publish GitLab Merges
def publish_gitlab_merges_to_monday():
    query = 'mutation ($myItemName:String!, $columnVals:JSON!) {create_item (board_id:---, item_name:$myItemName, column_values:$columnVals) {id}}' #Provide the Board ID
    vars = {
        'myItemName':str(yesterday),
        'columnVals':json.dumps({
            "numbers": len(mergeIDs), #Number of merges
            "text": str(mergedBy) #Contributor names
        })
    }
    data = {'query' : query, 'variables' : vars}
    r = requests.post(url=apiUrl, json=data, headers=headers) #making request
    print(data)


##===== GERRIT SECTION: 2 Functions =====##
#Establish Gerrit connection
#Using pygerritt2: https://github.com/dpursehouse/pygerrit2
auth = HTTPDigestAuth('---', '---') #This pass isn't LDAP: Provide Gerrit username and token

def gerrit_connection_check():
    #If not connected to VPN, exit this function
    '''PREVIOUS WAY'''
    #if os.system("ping -n 2 " + pciVPNip) != 0: #Ping 2 times. Response "0" means server is up.
    #    return
    '''CURRENT WAY'''
    global should_return
    response = requests.get("https://gerrit.powercosts.com:8443/")
    if response.status_code == 200:
        print("VPN connection is working")
    else:
        print("There was a problem with the VPN connection.")
        should_return = True
        return("Oh no! Exiting.")

#Function to get Gerrit Merges
def get_gerrit_merges():
    gerrit_connection_check()
    if should_return:
        return
    global gerritInsertions #Ref needed to use this variable inside this function
    global gerritDeletions #Ref needed to use this variable inside this function
    rest = GerritRestAPI(url='https://gerrit.powercosts.com:8443', auth=auth)
    changes = rest.get("/changes/?q=status:merged+branch:master+after:"+yesterdayMinusOne)

    for change in changes:
        if str(change['submitted'][:-19]) == str(yesterday):
            gerritChanges.append(change)
            gerritInsertions += change['insertions']
            gerritDeletions += change['deletions']
    
#Function to publish Gerrit Merges
def publish_gerrit_merges_to_monday():
    #If not connected to VPN, exit this function
    gerrit_connection_check()
    if should_return:
        return
    query = 'mutation ($myItemName:String!, $columnVals:JSON!) {create_item (board_id:---, item_name:$myItemName, column_values:$columnVals) {id}}' #Provide Board ID
    vars = {
        'myItemName':str(yesterday),
        'columnVals':json.dumps({
            "14": len(gerritChanges), #Number of merges
            "numbers": gerritInsertions, #Number of insertions
            "numbers8": gerritDeletions #Number of deletions
        })
    }
    data = {'query' : query, 'variables' : vars}
    r = requests.post(url=apiUrl, json=data, headers=headers) #making request
    print(data)


##===== RUN FUNCTIONS =====##
## COMMENT OUT BELOW TO RUN FUNCTIONS INDEPENDENTLY
    
#Run the GitLab functions
get_gitlab_mergerequests()
publish_gitlab_merges_to_monday()

#Run the Gerrit functions
get_gerrit_merges()
publish_gerrit_merges_to_monday()
