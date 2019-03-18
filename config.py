from datetime import *

DEV = "DEV"
DEBUG = "DEBUG"
REFACTOR = "REFACTOR"
TEST = "TEST"
OTHER = "OTHER"
NONE = "NONE"


config = {
    # The codes used in the commits to indicate the task
    'task_code':{
        'dev': ["[D]","(D)","D"],
        'debug': ["[B]","(B)","B"],
        'test': ["[T]","(T)","T"],
        'refactor': ["[R]","(R)","R"],
        'other': ["[A]","(A)","A"]
    },

    # Only commits within this period of time will be displayed
    # If 'begin' key is absent, no inferior time limit will be taken
    # If 'end' key is absent, no superior time limit will be taken
    'period':{
        'begin': date(2019,2,4),
        'end': date.today()
    },

    # Only commits from these authors (emails) will be displayed
    # If this key is removed, all authors will be displayed
    #'authors':[
    #],

    # Authors id used in commit messages
    'authors_id':["VM","VG","PDB","MC","DP"],

    # Only commits for these tasks will be displayed
    # If this key is removed, alls tasks will be displayed
    #'tasks': [DEV,DEBUG],

    # Put 'true' if you want to display merge commits
    'merge': False,

    # Commits that must not be considered in stats:
    'forget': [
    ]
    

}
